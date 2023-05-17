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
    name: Yup.string().required('Обов\'язкове поле'),
    startDate: Yup.date()
        .nullable()
        .test('less-than-finishDate', 'Дата початку повинна бути меншою за дату завершення.', function (value) {
            const finishDate = this.parent.finishDate;
            return value === null || finishDate === null || value < finishDate;
        }).min(currentDate, 'Дата початку має бути обрана починаючи від поточної.'),
    finishDate: Yup.date()
        .nullable()
        .test('more-than-startDate', 'Дата завершення повинна бути більшою за дату початку.', function (value) {
            const startDate = this.parent.startDate;
            return value === null || startDate === null || value > startDate;
        }).min(currentDate, 'Дата завершення має бути обрана починаючи від поточної.'),
    attempts: Yup.number().nullable().max(10, 'Максимальна кількість спроб становить 10'),
    duration: Yup.number()
        .nullable()
        .min(5, 'Мінімальна тривалість тесту 5 хвилин')
        .max(180, 'Максимальна тривалість тесту 180 хвилин'),
});

const initialValues = {
    name: '',
    startDate: null,
    finishDate: null,
    attempts: '',
    duration: '',
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
            const {startDate, finishDate, ...otherValues} = values;

            const formData = {
                ...otherValues,
                startDate: startDate ? startDate.toISOString() : null,
                finishDate: finishDate ? finishDate.toISOString() : null
            };
            console.log(formData);
            close(true);
            if (!test) {
                const resultAction = await dispatch(createTest(values));
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
                                id="name"
                                name="name"
                                label="Назва"
                                type="text"
                                fullWidth
                                sx={{mb: 2}}
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                error={formik.touched.name && Boolean(formik.errors?.name)}
                                helperText={formik.touched.name && formik.errors && formik.errors.name}
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
                                                    name="startDate"
                                                    ampm={false}
                                                    value={formik.values.startDate}
                                                    onChange={(newValue) => {
                                                        formik.setFieldValue('startDate', newValue);
                                                    }}
                                                    onError={(error) => {
                                                        formik.setFieldError('startDate', error);
                                                    }}
                                                    slotProps={{
                                                        textField: {
                                                            variant: 'outlined',
                                                            error: !!formik.errors?.startDate,
                                                            helperText: formik.errors?.startDate,
                                                        },
                                                    }}
                                                    minDate={currentDate}
                                                />

                                                {formik.values.startDate !== null && (
                                                    <IconButton
                                                        onClick={() => {
                                                            formik.setFieldValue('startDate', null);
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
                                                    name="finishDate"
                                                    ampm={false}
                                                    value={formik.values.finishDate}
                                                    onChange={(newValue) => {
                                                        formik.setFieldValue('finishDate', newValue);
                                                    }}
                                                    minDate={currentDate}
                                                />
                                                {formik.values.finishDate !== null && (
                                                    <IconButton
                                                        onClick={() => {
                                                            formik.setFieldValue('finishDate', null);
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
                                        id="duration"
                                        name="duration"
                                        label="Тривалість тесту (хвилини)"
                                        type="number"
                                        fullWidth
                                        sx={{mb: 2}}
                                        inputProps={{
                                            min: 5,
                                            max: 180,
                                        }}
                                        value={formik.values.duration || ''}
                                        onChange={formik.handleChange}
                                        error={formik.touched.duration && Boolean(formik.errors?.duration)}
                                        helperText={formik.touched.duration && formik.errors && formik.errors.duration}
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