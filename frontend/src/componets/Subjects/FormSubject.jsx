import { Button, Chip, Dialog, DialogActions, DialogContent,  DialogTitle, FormControl, FormHelperText,  InputLabel,
    MenuItem, Select, TextField} from "@mui/material";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {clearErrors, createSubject, updateSubject} from "../../store/subject/subjectsSlice.js";
import {FormikProvider, useFormik} from 'formik';
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
    teacher_id: Yup.number().required('Обов\'язкове поле'),
    // classes_ids: Yup.array().of(Yup.number()).min(1, 'Оберіть хоча б один клас'),
});

const initialValues = {
    name: '',
    teacher_id: '',
    classes_ids: [],
};

export default function FormSubject({open, onClose, subjectItem}) {
    // console.log(subjectItem)
    const dispatch = useDispatch();

    const {user, userToken} = useSelector((state) => state.currentUser)

    const {classes} = useSelector((state) => state.classes);
    // console.log(classes)

    const {users} = useSelector((state) => state.users)
    const teachers = users.filter(user => user.role === 'teacher');
    // console.log(teachers)

    let errorsServer = useSelector((state) => state.subjects.errors)
    const close = (value) => {
        onClose(value);
        dispatch(clearErrors());
        formik.resetForm(initialValues);
        formik.setErrors({});
    }

    const formik = useFormik({
        initialValues: subjectItem ? {...subjectItem} : {...initialValues},
        validationSchema,
        onSubmit: async (values, {setErrors, setSubmitting}) => {
            if (!subjectItem) {
                const resultAction = await dispatch(createSubject(values));
                if (createSubject.fulfilled.match(resultAction)) {
                    console.log('subject added');
                    close(true);
                }
            } else {
                let id = subjectItem.id;
                console.log(id);
                const resultAction = await dispatch(updateSubject({id, values}));
                if (updateSubject.fulfilled.match(resultAction)) {
                    console.log('subject updated');
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
                const match = key.match(/classes\.\d+/);
                if (match) {
                    const fieldName = match[0].replace(/\.\d+/, '');
                    errors[fieldName] = errors[key];
                    delete errors[key];
                }
            });

            formik.setErrors({...formik.errors, ...errors});
        }

    }, [errorsServer]);
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
                            {subjectItem ? "Редагування предмету" : "Створення предмету"}
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
                            />
                            {subjectItem ? subjectItem['classes_ids'] = subjectItem.classes.map(c => c.id) : ""}
                            <FormControl fullWidth sx={{marginTop: 2}}
                                         error={formik.touched.classes_ids && Boolean(formik.errors.classes_ids)}>
                                <InputLabel id="classes-label">Класи</InputLabel>
                                <Select
                                    // style={{ maxHeight: '100px', overflow: 'auto' }}
                                    labelId="classes-label"
                                    id="classes"
                                    name="classes_ids"
                                    label="Класи"
                                    value={formik.values.classes_ids}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    multiple
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
                                                    const cls = classes.find((u) => u.id === id);
                                                    return (
                                                        <Chip
                                                            key={id}
                                                            label={cls ? cls.name : ''}
                                                            style={{margin: '2px'}}
                                                            onMouseDown={(event) => {
                                                                event.stopPropagation();
                                                            }}
                                                            onDelete={() => {
                                                                const newSelected = formik.values.classes_ids.filter((s) => s !== id);
                                                                formik.setFieldValue('classes_ids', newSelected);
                                                            }}

                                                        />
                                                    );
                                                })}
                                            </div>
                                        );
                                    }}
                                    MenuProps={MenuProps}
                                >
                                    {classes.length === 0 && (
                                        <MenuItem disabled>Немає класів для вибору</MenuItem>
                                    )}
                                    {classes.map(cls => (
                                        <MenuItem key={cls.id}
                                                  value={cls.id}>{cls.name}</MenuItem>
                                    ))}

                                </Select>
                                {formik.touched.classes_ids && formik.errors.classes_ids && (
                                    <FormHelperText>{formik.touched.classes_ids && formik.errors && formik.errors.classes_ids}</FormHelperText>
                                )}
                            </FormControl>


                            <FormControl fullWidth sx={{marginTop: 2}}
                                         error={formik.touched.teacher_id && Boolean(formik.errors.teacher_id)}>
                                <InputLabel id="teacher_id-label">Вчитель</InputLabel>
                                <Select
                                    labelId="teacher_id-label"
                                    id="teacher_id"
                                    name="teacher_id"
                                    label="Вчитель"
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
                                    onClick={() => close(false)}>Відмінити</Button>
                            <Button type="submit" variant="contained" color="success"
                                    autoFocus>
                                {subjectItem ? 'Зберегти' : 'Додати'}
                            </Button>
                        </DialogActions>
                    </form>
                </FormikProvider>
            </Dialog>
        </>
    )
}

