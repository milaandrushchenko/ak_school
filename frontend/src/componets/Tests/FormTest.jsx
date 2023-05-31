import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField
} from "@mui/material";
import {ExpandMore} from '@mui/icons-material';
import IconButton from "@mui/material/IconButton";
import {useDispatch, useSelector} from "react-redux";
import {FormikProvider, useFormik, useFormikContext} from 'formik';
import 'react-quill/dist/quill.snow.css';
import * as Yup from 'yup';
import {DateTimePicker} from '@mui/x-date-pickers/DateTimePicker';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import ClearIcon from '@mui/icons-material/Clear';
import 'dayjs/locale/uk';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {clearErrors, createTest, updateTest} from "../../store/test/testsSlice.js";

const currentDate = dayjs();

const createValidationSchema = (minStartTime, minEndTime) => {
    let minStartDate = minStartTime ? minStartTime : currentDate;
    let minEndDate = minEndTime ? minEndTime : currentDate;
    return Yup.lazy(values => {
        return Yup.object().shape({
            title: Yup.string().required('Обов\'язкове поле'),
            start_time: Yup.date()
                .nullable()
                .test('less-than-end_time', 'Дата початку повинна бути меншою за дату завершення.', function (value) {
                    const end_time = values.end_time;
                    return value === null || end_time === null || value < end_time;
                })
                .min(minStartDate, 'Дата початку має бути обрана починаючи від поточної.'),
            end_time: Yup.date()
                .nullable()
                .test('more-than-start_time', 'Дата завершення повинна бути більшою за дату початку.', function (value) {
                    const start_time = values.start_time;
                    return value === null || start_time === null || value > start_time;
                })
                .min(minEndDate, 'Дата завершення має бути обрана починаючи від поточної.'),
            max_attempts: Yup.number().nullable().max(10, 'Максимальна кількість спроб становить 10'),
            time_limit: Yup.number()
                .nullable()
                .min(5, 'Мінімальна тривалість тесту 5 хвилин')
                .max(180, 'Максимальна тривалість тесту 180 хвилин'),
        });
    });
};


const initialValues = {
    title: '',
    start_time: null,
    end_time: null,
    max_attempts: 0,
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
        validationSchema: createValidationSchema(test ? test.start_time : currentDate, test ? test.end_time : currentDate),
        enableReinitialize: true, // Увімкнути оновлення значень initialValues
        onSubmit: async (values, {setErrors, setSubmitting}) => {
            const {start_time, end_time, ...otherValues} = values;
            const formData = {
                ...otherValues,
                start_time: start_time ? start_time.format('YYYY-MM-DD HH:mm:ss') : null,
                end_time: end_time ? end_time.format('YYYY-MM-DD HH:mm:ss') : null
            };

            if (!test) {
                const resultAction = await dispatch(createTest(formData));
                if (createTest.fulfilled.match(resultAction)) {
                    close(true);
                }
            } else {
                let id = test.id;
                const resultAction = await dispatch(updateTest({id, formData}));
                if (updateTest.fulfilled.match(resultAction)) {
                    close(true);
                }
            }
        }
    });

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
                                                    minDate={test ? test.start_time : currentDate}
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
                                                    minDate={test ? test.end_time : currentDate}
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
                                        id="max_attempts"
                                        name="max_attempts"
                                        label="Кількість дозволених спроб"
                                        type="number"
                                        fullWidth
                                        sx={{mb: 2}}
                                        inputProps={{
                                            min: 1,
                                            max: 10,
                                        }}
                                        value={formik.values.max_attempts || ''}
                                        onChange={formik.handleChange}
                                        error={formik.touched.max_attempts && Boolean(formik.errors?.max_attempts)}
                                        helperText={formik.touched.max_attempts && formik.errors && formik.errors.max_attempts}
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