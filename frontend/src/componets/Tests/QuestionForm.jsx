import {
    Button, Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@mui/material";
import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {clearErrors, createClass, getClasses, updateClass} from "../../store/class/classesSlice.js";
import {FormikProvider, useFormik, useFormikContext} from 'formik';
import 'react-quill/dist/quill.snow.css';
import * as Yup from 'yup';
import 'dayjs/locale/uk';
import SingleChoiceQuestionForm from "./questionTypes/SingleChoiceQuestionForm.jsx";
import MultiChoiceQuestionForm from "./questionTypes/MultiChoiceQuestionForm.jsx";
import MatchingQuestionForm from "./questionTypes/MatchingQuestionForm.jsx";
import ShortAnswerQuestionForm from "./questionTypes/ShortAnswerQuestionForm.jsx";
import TextEditor from "../core/TextEditor.jsx";
import {
    initialValuesMatching,
    initialValuesMultipleAnswers, initialValuesShortAnswer,
    initialValuesSingleChoice, validationSchemaMatching,
    validationSchemaMultipleAnswers, validationSchemaShortAnswer,
    validationSchemaSingleChoice
} from "../../utils/validate.js";

export default function QuestionForm({open, onClose, type, question}) {
    const dispatch = useDispatch();
    let errorsServer = useSelector((state) => state.tests.errors)
    const close = (value) => {
        onClose(value);
        dispatch(clearErrors());
        formik.resetForm(initialValues);
        formik.setErrors({});
    }

    let validationSchema;
    let initialValues;

    switch (type) {
        case 'single-answer':
            validationSchema = validationSchemaSingleChoice;
            initialValues = initialValuesSingleChoice;
            break;
        case 'multiple-answers':
            validationSchema = validationSchemaMultipleAnswers;
            initialValues = initialValuesMultipleAnswers;
            break;
        case 'matching':
            validationSchema = validationSchemaMatching;
            initialValues = initialValuesMatching;
            break;
        case 'short-answer':
            validationSchema = validationSchemaShortAnswer;
            initialValues = initialValuesShortAnswer;
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
            console.log(values);
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
                            {type === 'short-answer' && <ShortAnswerQuestionForm formik={formik}/>}
                            {type === 'multiple-answers' && (
                                <MultiChoiceQuestionForm formik={formik}/>
                            )}
                            {type === 'single-answer' && <SingleChoiceQuestionForm formik={formik}/>}
                            {type === 'matching' && (
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