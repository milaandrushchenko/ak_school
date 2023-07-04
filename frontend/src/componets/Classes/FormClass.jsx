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
import {clearErrors, createClass, getClasses, updateClass} from "../../store/class/classesSlice.js";
import {FormikProvider, useFormik, useFormikContext} from 'formik';
import CloseIcon from '@mui/icons-material/Close';
import * as Yup from 'yup';
import Notification from "../core/Notification.jsx";
import {fetchStudentsWithoutClass, getUsers, updateUser} from "../../store/user/usersSlice.js";
import {me} from "../../store/user/currentUserSlice.js";

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
    monitor_id: Yup.number().required('Обов\'язкове поле')
        .test('included-in-student-ids', 'Староста повинен бути обраний серед учнів.', function (value) {
            const studentIds = this.parent.student_ids || [];
            return !value || studentIds.includes(value);
        }),
    teacher_id: Yup.number().required('Обов\'язкове поле'),
    student_ids: Yup.array().of(Yup.number()).min(1, 'Оберіть хоча б одного учня'),
});
const initialValues = {
    name: '',
    monitor_id: '',
    teacher_id: '',
    student_ids: [],
};

export default function FormClass({open, onClose, classItem}) {
    const dispatch = useDispatch();

    const {user, userToken} = useSelector((state) => state.currentUser)
    const {
        users,
        studentsWithoutClass,
        visibleData,
        meta,
        isLoading
    } = useSelector((state) => state.users)
    // const students = users.filter(user => user.role === 'student');
    const students = studentsWithoutClass;
    const teachers = users.filter(user => user.role === 'teacher');

    let errorsServer = useSelector((state) => state.classes.errors)
    const close = (value) => {
        onClose(value);
        dispatch(clearErrors());
        formik.resetForm(initialValues);
        formik.setErrors({});
    }

    const formik = useFormik({
        initialValues: classItem ? {...classItem} : {...initialValues},
        validationSchema,
        onSubmit: async (values, {setErrors, setSubmitting}) => {

            if (!classItem) {
                const resultAction = await dispatch(createClass(values));
                if (createClass.fulfilled.match(resultAction)) {
                    console.log('classes added');
                    close(true);
                }
            } else {
                let id = classItem.id;
                console.log(id);
                const resultAction = await dispatch(updateClass({id, values}));
                if (updateClass.fulfilled.match(resultAction)) {
                    console.log('class updated');
                    console.log(values);
                    close(true);
                }
            }
        }
    });


    useEffect(() => {

        if (errorsServer) {
            let errors = {...errorsServer};
            Object.keys(errors).forEach((key) => {
                const match = key.match(/student_ids\.\d+/);
                if (match) {
                    const fieldName = match[0].replace(/\.\d+/, '');
                    errors[fieldName] = errors[key];
                    delete errors[key];
                }
            });

            formik.setErrors({...formik.errors, ...errors});
        }

    }, [errorsServer]);

    useEffect(() => {
        let classId = classItem?.id;
        dispatch(fetchStudentsWithoutClass(classId));

    }, [open])

    return (
        <>
            <Dialog
                open={open}
                onClose={() => close(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <FormikProvider value={formik}>
                    <form onSubmit={formik.handleSubmit}>
                        <DialogTitle id="alert-dialog-title">
                            {classItem ? "Редагування класу" : "Створення класу"}
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
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                error={formik.touched.name && Boolean(formik.errors?.name)}
                                helperText={formik.touched.name && formik.errors && formik.errors.name}
                                autoComplete="off"
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
                                    {students.length === 0 && (
                                        <MenuItem disabled>Немає учнів для вибору</MenuItem>
                                    )}
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
                                    {(students.length === 0 || formik.values.student_ids.length == 0) && (
                                        <MenuItem disabled>Немає учнів для вибору</MenuItem>
                                    )}
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
                            {user.role === 'admin' &&
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
                            }
                        </DialogContent>
                        <DialogActions>
                            <Button variant="outlined" color="error"
                                    onClick={() => close(false)}>Відмінити</Button>
                            <Button type="submit" variant="contained" color="success"
                                    autoFocus>
                                {classItem ? 'Зберегти' : 'Додати'}
                            </Button>
                        </DialogActions>
                    </form>
                </FormikProvider>
            </Dialog>
        </>
    )
}