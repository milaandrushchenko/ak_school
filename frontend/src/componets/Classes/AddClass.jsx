import {
    Button, Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    FormHelperText,
    InputAdornment,
    InputLabel,
    MenuItem, OutlinedInput,
    Select,
    Snackbar,
    TextField
} from "@mui/material";
import Grid from "@mui/material/Grid";
import {Visibility, VisibilityOff} from '@mui/icons-material';
import IconButton from "@mui/material/IconButton";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import MuiAlert from '@mui/material/Alert';
import {generatePassword} from '../../utils/common'
import {useDispatch, useSelector} from "react-redux";
import {clearErrors, createClass} from "../../store/class/classesSlice.js";
import {FormikProvider, useFormik, useFormikContext} from 'formik';
import CloseIcon from '@mui/icons-material/Close';
import * as Yup from 'yup';

const ITEM_HEIGHT = 40;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Обов\'язкове поле'),
    monitor_id: Yup.number().required('Обов\'язкове поле'),
    teacher_id: Yup.number().required('Обов\'язкове поле'),
    student_ids: Yup.array().of(Yup.number()).min(1, 'Оберіть хоча б одного учня'),
});
const initialValues = {
    name: '',
    monitor_id: '',
    teacher_id: '',
    student_ids: [],
};

export default function AddClass({open, onClose}) {
    const dispatch = useDispatch();

    const [openSelect, setOpenSelect] = useState(false);
    const handleOpen = () => {
        setOpenSelect(true);
    };

    const handleClose = () => {
        setOpenSelect(false);
    };

    const {users, visibleData, meta, isLoading} = useSelector((state) => state.users)
    const students = users.filter(user => user.role === 'student');
    const teachers = users.filter(user => user.role === 'teacher');

    let errorsServer = useSelector((state) => state.classes.errors)
    const close = () => {
        onClose();
        dispatch(clearErrors());
        formik.resetForm(initialValues);
        formik.setErrors({});
    }


    const formik = useFormik({
        initialValues: initialValues,
        validationSchema,
        onSubmit: async (values, {setErrors, setSubmitting}) => {
            console.log(values);

            const resultAction = await dispatch(createClass(values));
            if (createClass.fulfilled.match(resultAction)) {
                console.log('classes added');
                close();
            }
        }
    });

    useEffect(() => {
        formik.setErrors({...formik.errors, ...errorsServer});
    }, [errorsServer]);

    return (
        <>
            <Dialog
                open={open}
                onClose={close}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <FormikProvider value={formik}>
                    <form onSubmit={formik.handleSubmit}>
                        <DialogTitle id="alert-dialog-title">
                            {"Створення групи"}
                        </DialogTitle>
                        <DialogContent sx={{
                            maxWidth: '500px',
                            width: '100%'
                        }}>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                name="name"
                                label="Назва"
                                type="text"
                                fullWidth
                                value={formik.values.login}
                                onChange={formik.handleChange}
                                error={formik.touched.name && Boolean(formik.errors?.name)}
                                helperText={formik.touched.name && formik.errors && formik.errors.name}
                            />
                            <FormControl fullWidth sx={{marginTop: 2}}
                                         error={formik.touched.student_ids && Boolean(formik.errors.student_ids)}>
                                <InputLabel id="students-label">Учні</InputLabel>
                                <Select
                                    // style={{ maxHeight: '100px', overflow: 'auto' }}
                                    labelId="students-label"
                                    id="students"
                                    name="student_ids"
                                    label="Учні"
                                    value={formik.values.student_ids}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    multiple // Додайте цей атрибут
                                    onMouseDown={(event) => {
                                        if (event.target.tagName === 'svg') {
                                            event.preventDefault();
                                        }
                                    }}
                                    renderValue={(selected) => {
                                        return (
                                            <div style={{
                                                display: 'flex',
                                                flexWrap: 'wrap',
                                                maxHeight: '100px',
                                                overflow: 'auto'
                                            }}>
                                                {selected.map((id) => {
                                                    const students = users.find((u) => u.id === id);
                                                    return (
                                                        <Chip
                                                            key={id}
                                                            label={students ? students.first_name + ' ' + students.second_name : ''}
                                                            style={{margin: '2px'}}
                                                            onMouseDown={(event) => {
                                                                event.stopPropagation();
                                                            }}
                                                            onDelete={() => {
                                                                const newSelected = formik.values.student_ids.filter((s) => s !== id);
                                                                formik.setFieldValue('student_ids', newSelected);
                                                            }}

                                                        />
                                                    );
                                                })}
                                            </div>
                                        );
                                    }}
                                    MenuProps={MenuProps}
                                >
                                    {students.map(student => (
                                        <MenuItem key={student.id}
                                                  value={student.id}>{student.first_name + ' ' + student.second_name}</MenuItem>
                                    ))}

                                </Select>
                                {formik.touched.student_ids && formik.errors.student_ids && (
                                    <FormHelperText>{formik.touched.student_ids && formik.errors && formik.errors.student_ids}</FormHelperText>
                                )}
                            </FormControl>
                            <FormControl fullWidth sx={{marginTop: 2}}
                                         error={formik.touched.monitor_id && Boolean(formik.errors.monitor_id)}>
                                <InputLabel id="monitor_id-label">Староста</InputLabel>
                                <Select
                                    labelId="monitor_id-label"
                                    id="monitor_id"
                                    name="monitor_id"
                                    label="Староста"
                                    value={formik.values.monitor_id}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                >
                                    {students
                                        .filter((student) => formik.values.student_ids.includes(student.id))
                                        .map((student) => (
                                            <MenuItem key={student.id} value={student.id}>
                                                {`${student.first_name} ${student.second_name}`}
                                            </MenuItem>
                                        ))
                                    }
                                </Select>
                                {formik.touched.monitor_id && formik.errors.monitor_id &&
                                    <FormHelperText>{formik.touched.monitor_id && formik.errors && formik.errors.monitor_id}</FormHelperText>}
                            </FormControl>
                            <FormControl fullWidth sx={{marginTop: 2}}
                                         error={formik.touched.teacher_id && Boolean(formik.errors.teacher_id)}>
                                <InputLabel id="teacher_id-label">Класний керівник</InputLabel>
                                <Select
                                    labelId="teacher_id-label"
                                    id="teacher_id"
                                    name="teacher_id"
                                    label="Класний керівник"
                                    value={formik.values.teacher_id}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    MenuProps={MenuProps}
                                >
                                    {teachers.map(teacher => (
                                        <MenuItem key={teacher.id}
                                                  value={teacher.id}>{teacher.first_name + ' ' + teacher.second_name}</MenuItem>
                                    ))}
                                </Select>
                                {formik.touched.teacher_id && formik.errors.teacher_id &&
                                    <FormHelperText>{formik.touched.teacher_id && formik.errors && formik.errors.teacher_id}</FormHelperText>}
                            </FormControl>
                        </DialogContent>
                        <DialogActions>
                            <Button variant="outlined" color="error"
                                    onClick={close}>Відмінити</Button>
                            <Button type="submit" variant="contained" color="success"
                                    autoFocus>
                                {'Додати'}
                            </Button>
                        </DialogActions>
                    </form>
                </FormikProvider>
            </Dialog>
        </>
    )
}