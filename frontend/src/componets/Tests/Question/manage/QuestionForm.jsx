import {
    Button, Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, TextField,
} from "@mui/material";
import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    clearErrors,
    createClass,
    getClasses,
    updateClass
} from "../../../../store/class/classesSlice.js";
import {FormikProvider, useFormik, useFormikContext} from 'formik';
import 'react-quill/dist/quill.snow.css';
import * as Yup from 'yup';
import 'dayjs/locale/uk';
import SingleChoiceQuestionForm from "./questionTypes/SingleChoiceQuestionForm.jsx";
import MultiChoiceQuestionForm from "./questionTypes/MultiChoiceQuestionForm.jsx";
import MatchingQuestionForm from "./questionTypes/MatchingQuestionForm.jsx";
import ShortAnswerQuestionForm from "./questionTypes/ShortAnswerQuestionForm.jsx";
import TextEditor from "../../../core/TextEditor.jsx";
import {
    initialValuesMatching,
    initialValuesMultipleAnswers, initialValuesShortAnswer,
    initialValuesSingleChoice, validationSchemaMatching,
    validationSchemaMultipleAnswers, validationSchemaShortAnswer,
    validationSchemaSingleChoice
} from "../../../../utils/validate.js";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import {createUser, updateUser} from "../../../../store/user/usersSlice.js";
import {addQuestion, updateQuestion} from "../../../../store/test/testsSlice.js";
import {QUESTION} from "../../../../utils/constans.js";

export default function QuestionForm({open, onClose, type, question}) {
    const dispatch = useDispatch();
    let test = useSelector((state) => state.tests.test)
    const close = (value) => {
        console.log('close');
        onClose(value);
        dispatch(clearErrors());
        formik.resetForm(initialValues);
        formik.setErrors({});
    }

    let validationSchema;
    let initialValues;

    switch (type) {
        case QUESTION.SINGLE_CHOICE:
            validationSchema = validationSchemaSingleChoice;
            initialValues = question ? question : initialValuesSingleChoice;
            break;
        case QUESTION.MULTIPLE_CHOICE:
            validationSchema = validationSchemaMultipleAnswers;
            initialValues = question ? question : initialValuesMultipleAnswers;
            break;
        case QUESTION.MATCHING:
            validationSchema = validationSchemaMatching;
            initialValues = question ? question : initialValuesMatching;
            break;
        case QUESTION.SHORT_ANSWER:
            validationSchema = validationSchemaShortAnswer;
            initialValues = question ? question : initialValuesShortAnswer;
            break;
        default:
            validationSchema = Yup.object({});
            initialValues = {};
            break;
    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        enableReinitialize: true, // Увімкнути оновлення значень initialValues
        onSubmit: async (values, {setErrors, setSubmitting}) => {
            if (!question) {
                console.log(values)

                const test_id = test.id;
                const resultAction = await dispatch(addQuestion({test_id, values}));
                if (addQuestion.fulfilled.match(resultAction)) {
                    close(true);
                }
            } else {
                // let data = Object.assign({}, values);
                // delete data.password;
                let question_id = question.id;
                const resultAction = await dispatch(updateQuestion({question_id, values}));
                if (updateQuestion.fulfilled.match(resultAction)) {
                    console.log('question updated');
                    close(true);
                }
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
        <>
            <Dialog
                open={open}
                onClose={() => close(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                sx={{
                    // maxWidth: '1200px',
                    // width:'1000px',
                    // margin: '0 auto', // Доданий стиль для розміщення по центру
                }}
            >
                <FormikProvider value={formik}>
                    <form onSubmit={handleSubmit}>
                        <DialogTitle id="alert-dialog-title">
                            {question ? "Редагувати запитання" : "Додати запитання"}
                        </DialogTitle>
                        <DialogContent sx={{maxWidth: '900px', width: '100%'}}>
                            <TextEditor
                                label="Запитання"
                                name="question"
                                value={values.question}
                                onChange={(content) => setFieldValue('question', content)}
                                error={touched.question && !!errors.question}
                                helperText={touched.question && errors.question}
                            />
                            <Grid container spacing={2} alignItems="center">
                                <Grid item xs={6}>
                                    <Typography variant="subtitle1" component="label"
                                                sx={{
                                                    fontWeight: 'bold',
                                                    color: 'grey.500',
                                                    display: 'block',
                                                    textAlign: 'right'
                                                }}>Кількість балів:</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        type="number"
                                        fullWidth
                                        style={{width: '100px'}}
                                        margin="normal"
                                        value={values.score !== undefined ? values.score : ''}
                                        id="score"
                                        name="score"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.score && !!errors.score}
                                        helperText={touched.score && errors.score}
                                        inputProps={{
                                            min: 0,
                                            max: 100,
                                        }}
                                    />
                                </Grid>
                            </Grid>

                            {type === QUESTION.SHORT_ANSWER &&
                                <ShortAnswerQuestionForm formik={formik}/>}
                            {type === QUESTION.MULTIPLE_CHOICE && (
                                <MultiChoiceQuestionForm formik={formik}/>
                            )}
                            {type === QUESTION.SINGLE_CHOICE &&
                                <SingleChoiceQuestionForm formik={formik}/>}
                            {type === QUESTION.MATCHING && (
                                <MatchingQuestionForm formik={formik}/>
                            )}
                        </DialogContent>
                        <DialogActions>
                            <Button variant="outlined" color="error" onClick={() => close(false)}>
                                Відмінити
                            </Button>
                            <Button type="submit" variant="contained" color="success" autoFocus>
                                {question ? 'Зберегти' : 'Додати'}
                            </Button>
                        </DialogActions>
                    </form>
                </FormikProvider>
            </Dialog>
        </>
    )
}