import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
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
import {ExpandMore, Visibility, VisibilityOff} from '@mui/icons-material';
import IconButton from "@mui/material/IconButton";
import React, {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import MuiAlert from '@mui/material/Alert';
import {generatePassword} from '../../utils/common'
import {useDispatch, useSelector} from "react-redux";
import {clearErrors, createClass, getClasses, updateClass} from "../../store/class/classesSlice.js";
import {FormikProvider, useFormik, useFormikContext} from 'formik';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import * as Yup from 'yup';
import Notification from "../core/Notification.jsx";
import {fetchStudentsWithoutClass, getUsers, updateUser} from "../../store/user/usersSlice.js";
import {DateTimePicker} from '@mui/x-date-pickers/DateTimePicker';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import ClearIcon from '@mui/icons-material/Clear';

import 'dayjs/locale/uk';
import {me} from "../../store/user/currentUserSlice.js";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {createTest} from "../../store/test/testsSlice.js";

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
const currentDate = dayjs();

const validationSchema = Yup.object().shape({
    title: Yup.string().required('Обов\'язкове поле'),
    start_time: Yup.date()
        .nullable()
        .test('less-than-end_time', 'Дата початку повинна бути меншою за дату завершення.', function (value) {
            const end_time = this.parent.end_time;
            return value === null || end_time === null || value < end_time;
        }).min(currentDate, 'Дата початку має бути обрана починаючи від поточної.'),
    end_time: Yup.date()
        .nullable()
        .test('more-than-start_time', 'Дата завершення повинна бути більшою за дату початку.', function (value) {
            const start_time = this.parent.start_time;
            return value === null || start_time === null || value > start_time;
        }).min(currentDate, 'Дата завершення має бути обрана починаючи від поточної.'),
    attempts: Yup.number().nullable().max(10, 'Максимальна кількість спроб становить 10'),
    time_limit: Yup.number()
        .nullable()
        .min(5, 'Мінімальна тривалість тесту 5 хвилин')
        .max(180, 'Максимальна тривалість тесту 180 хвилин'),
});

const initialValues = {
    title: '',
    start_time: null,
    end_time: null,
    attempts: '',
    access_type: 'public',
    is_active: 0,
    time_limit: '',
};

export default function FormTest({open, onClose, test}) {
    const dispatch = useDispatch();
    let errorsServer = useSelector((state) => state.tests.errors)
    const close = (value) => {
        onClose(value);
        dispatch(clearErrors());
        formik.resetForm(initialValues);
        formik.setErrors({});
    }

    const formik = useFormik({
        initialValues: test ? {...test} : {...initialValues},
        validationSchema,
        onSubmit: async (values, {setErrors, setSubmitting}) => {
            const {start_time, end_time, ...otherValues} = values;

            const formData = {
                ...otherValues,
                start_time: start_time ? start_time.format('YYYY-MM-DD HH:mm:ss') : null,
                end_time: end_time ? end_time.format('YYYY-MM-DD HH:mm:ss') : null
            };

            console.log(formData);
            close(true);
            if (!test) {
                const resultAction = await dispatch(createTest(formData));
                if (createClass.fulfilled.match(resultAction)) {
                    console.log('test added');
                    close(true);
                }
            }
            // else {
            //     let id = test.id;
            //     console.log(id);
            //     const resultAction = await dispatch(updateClass({id, values}));
            //     if (updateClass.fulfilled.match(resultAction)) {
            //         console.log('class updated');
            //         console.log(values);
            //         close(true);
            //     }
            // }
        }
    });


    const [text, setText] = useState('');

    const handleEditorChange = (value) => {
        setText(value);
    };

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
                            {test ? "Редагування тесту" : "Створення тесту"}
                        </DialogTitle>
                        <DialogContent sx={{
                            minWidth: '400px',
                            width: '100%'
                        }}>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="title"
                                name="title"
                                label="Назва"
                                type="text"
                                fullWidth
                                sx={{mb: 2}}
                                value={formik.values.title}
                                onChange={formik.handleChange}
                                error={formik.touched.title && Boolean(formik.errors?.title)}
                                helperText={formik.touched.title && formik.errors && formik.errors.title}
                            />
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMore/>}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography>Додаткові налаштування</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}
                                                          adapterLocale="uk">
                                        <Box sx={{width: '100%', mb: 2}}>
                                            <Box sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                width: '100%',
                                                mb: 2
                                            }}>
                                                <DateTimePicker
                                                    sx={{
                                                        flex: 1,
                                                        maxWidth: '100%',
                                                        position: 'relative',
                                                    }}
                                                    label="Дата початку"
                                                    name="start_time"
                                                    ampm={false}
                                                    value={formik.values.start_time}
                                                    onChange={(newValue) => {
                                                        formik.setFieldValue('start_time', newValue);
                                                    }}
                                                    onError={(error) => {
                                                        formik.setFieldError('start_time', error);
                                                    }}
                                                    slotProps={{
                                                        textField: {
                                                            variant: 'outlined',
                                                            error: !!formik.errors?.start_time,
                                                            helperText: formik.errors?.start_time,
                                                        },
                                                    }}
                                                    minDate={currentDate}
                                                />

                                                {formik.values.start_time !== null && (
                                                    <IconButton
                                                        onClick={() => {
                                                            formik.setFieldValue('start_time', null);
                                                        }}
                                                    >
                                                        <ClearIcon/>
                                                    </IconButton>
                                                )}
                                            </Box>
                                            <Box sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                width: '100%',
                                                mb: 2
                                            }}>
                                                <DateTimePicker
                                                    sx={{
                                                        flex: 1,
                                                        maxWidth: '100%',
                                                        position: 'relative',
                                                    }}
                                                    label="Дата завершення"
                                                    name="end_time"
                                                    ampm={false}
                                                    value={formik.values.end_time}
                                                    onChange={(newValue) => {
                                                        formik.setFieldValue('end_time', newValue);
                                                    }}
                                                    minDate={currentDate}
                                                />
                                                {formik.values.end_time !== null && (
                                                    <IconButton
                                                        onClick={() => {
                                                            formik.setFieldValue('end_time', null);
                                                        }}
                                                    >
                                                        <ClearIcon/>
                                                    </IconButton>
                                                )}
                                            </Box>
                                        </Box>

                                    </LocalizationProvider>
                                    <TextField
                                        margin="dense"
                                        id="attempts"
                                        name="attempts"
                                        label="Кількість дозволених спроб"
                                        type="number"
                                        fullWidth
                                        sx={{mb: 2}}
                                        inputProps={{
                                            min: 1,
                                            max: 10,
                                        }}
                                        value={formik.values.attempts || ''}
                                        onChange={formik.handleChange}
                                        error={formik.touched.attempts && Boolean(formik.errors?.attempts)}
                                        helperText={formik.touched.attempts && formik.errors && formik.errors.attempts}
                                    />
                                    <TextField
                                        margin="dense"
                                        id="time_limit"
                                        name="time_limit"
                                        label="Тривалість тесту (хвилини)"
                                        type="number"
                                        fullWidth
                                        sx={{mb: 2}}
                                        inputProps={{
                                            min: 5,
                                            max: 180,
                                        }}
                                        value={formik.values.time_limit || ''}
                                        onChange={formik.handleChange}
                                        error={formik.touched.time_limit && Boolean(formik.errors?.time_limit)}
                                        helperText={formik.touched.time_limit && formik.errors && formik.errors.time_limit}
                                    />
                                </AccordionDetails>
                            </Accordion>

                        </DialogContent>
                        <DialogActions>
                            <Button variant="outlined" color="error"
                                    onClick={() => close(false)}>Відмінити</Button>
                            <Button type="submit" variant="contained" color="success"
                                    autoFocus>
                                {test ? 'Зберегти' : 'Додати'}
                            </Button>
                        </DialogActions>
                    </form>
                </FormikProvider>
            </Dialog>
        </>
    )
}