import dayjs from "dayjs";
import * as Yup from 'yup';
import {useDispatch, useSelector} from "react-redux";
import {clearErrors, getTasks} from "../../store/task/tasksSlice.js";
import {FormikProvider, useFormik} from "formik";
import {compareDate} from "../../utils/common.js";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {DateTimePicker} from "@mui/x-date-pickers/DateTimePicker";
import ClearIcon from "@mui/icons-material/Clear.js";
import TextEditor from "../core/TextEditor.jsx";
import React, {useEffect} from "react";
import {createTask, getSubjectById, getSubjects} from "../../store/subject/subjectsSlice.js";
import {getTestById, getTests} from "../../store/test/testsSlice.js";
import {useParams} from "react-router-dom";


const currentDate = dayjs();

const createValidationSchema = (minEndTime) => {
    return Yup.lazy(values => {
        return Yup.object().shape({
            name: Yup.string().required('Обов\'язково для заповнення!'),
            done_to: Yup.date().nullable()
                .min(minEndTime, 'Дата завершення менша за поточну!'),
            content: Yup.string().required('Обов\'язково для заповнення!'),
        })
    })
}

const initialValues = {
    name: '',
    done_to: null,
    content: ''
};

export default function FormTask({open, onClose, task}){
    // console.log(task)
    const dispatch = useDispatch();
    let subject = useSelector((state) => state.subjects.subject)
    // console.log(subject)
    const initialValues = {
        name: "",
        content: "",
        done_to: null,
    }
    const close = (value) => {
        onClose(value);
        dispatch(clearErrors());
        formik.resetForm(initialValues);
        formik.setErrors({});
    }



    const formik = useFormik({
        initialValues: task ? {...task} : {...initialValues},
        validationSchema: createValidationSchema(compareDate(task?.done_to, currentDate)),
        enableReinitialize: true,
        onSubmit: async (values, {setErrors, setSubmitting}) => {
            if (!task) {
                values.done_to = values.done_to.format('YYYY-MM-DD HH:mm:ss')
                const subject_id = subject.id;
                const resultAction = await dispatch((createTask({subject_id, values})));
                if (createTask.fulfilled.match(resultAction))
                    close(true);
            } else {
                let id = task.id;
                // const resultAction = await dispatch()
            }
        }
    });



    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
        setErrors
    } = formik;




    return (
        <Dialog open={open}
                onClose={() => close(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
            <FormikProvider value={formik}>
                <form onSubmit={formik.handleSubmit}>
                    <DialogTitle id="alert-dialog-title">
                        {task ? "Редагування завдання" : "Додавання завдання"}
                    </DialogTitle>
                    <DialogContent sx={{ minWidth: '400px', width: '100%' }}>
                        <TextField autoFocus margin="dense" id="name" name="name" label="Назва" type="text" fullWidth
                                   value={formik.values.name} onChange={formik.handleChange} sx={{mb: 2}}
                                   error={formik.touched.name && Boolean(formik.errors?.name)}
                                   helperText={formik.touched.name && formik.errors && formik.errors.name}
                        />
                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="uk">
                            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', mb: 2 }}>
                                <DateTimePicker sx={{ flex: 1, maxWidth: '100%', position: 'relative' }}
                                    label="Здати до" name="done_to" ampm={false} value={formik.values.done_to}
                                    onChange={ (newValue) => { formik.setFieldValue('done_to', newValue) }}
                                    onError={ (error) => { formik.setFieldError('done_to', error) }}
                                    slotProps={{
                                        textField: {
                                            variant: 'outlined',
                                            error: !!formik.errors?.done_to,
                                            helperText: formik.errors?.done_to,
                                        },
                                    }}
                                    minDate={compareDate(task?.done_to, currentDate)}
                                />
                                {formik.values.done_to !== null && (
                                    <IconButton onClick={() => { formik.setFieldValue('done_to', null) }}>
                                        <ClearIcon/>
                                    </IconButton>
                                )}
                            </Box>
                        </LocalizationProvider>
                        <TextEditor label='Текст завдання' name='content' value={ formik.values.content }
                            onChange={ (newValue) => formik.setFieldValue('content', newValue)}
                            onError={ (error) => { formik.setFieldError('content', error) } }
                            helperText={formik.touched.content && formik.errors && formik.errors.content}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button variant="outlined" color="error" onClick={() => close(false)}>
                            Відмінити
                        </Button>
                        <Button type="submit" variant="contained" color="success" autoFocus>
                            {task ? 'Зберегти' : 'Додати'}
                        </Button>
                    </DialogActions>
                </form>
            </FormikProvider>
        </Dialog>
    );
}