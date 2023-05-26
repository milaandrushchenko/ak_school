import {
    Accordion,
    AccordionDetails,
    AccordionSummary, Alert,
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
    MenuItem, OutlinedInput, Radio,
    Select,
    Snackbar,
    TextField
} from "@mui/material";
import Grid from "@mui/material/Grid";
import {AddCircle, ExpandMore, Visibility, VisibilityOff} from '@mui/icons-material';
import IconButton from "@mui/material/IconButton";
import React, {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import MuiAlert from '@mui/material/Alert';
import {useDispatch, useSelector} from "react-redux";
import {FormikProvider, useFormik, useFormikContext} from 'formik';
import ReactQuill, {Quill} from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ImageResize from 'quill-image-resize-module-react';
import * as Yup from 'yup';
import dayjs from 'dayjs';

import 'dayjs/locale/uk';
import Box from "@mui/material/Box";
import DeleteIcon from "@mui/icons-material/Delete";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import TextEditor from "../../core/TextEditor.jsx";


export default function MultiChoiceQuestionForm({question, formik}) {
//     const dispatch = useDispatch();
//     let errorsServer = useSelector((state) => state.tests.errors)
// console.log();
//     const formik = useFormik({
//         initialValues: question ? {...question} : {...initialValues},
//         validationSchema,
//         onSubmit: async (values, {setErrors, setSubmitting}) => {
//             console.log(values);
//         }
//     });

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

    const handleAddOption = () => {
        setFieldValue("options", [
            ...values.options,
            {text: "", isCorrect: false},
        ]);
    };

    const handleRemoveOption = (index) => {
        const updatedOptions = [...values.options];
        updatedOptions.splice(index, 1);
        setFieldValue('options', updatedOptions);
    };

    // console.log(values);
    // console.log(errors);

    return (
        <>

            {values.options?.map((option, index) => (
                <Box key={index} display="flex" alignItems="center">
                    <Box flexGrow={1} display="flex" alignItems="center">
                        <Checkbox
                            checked={option.isCorrect}
                            onChange={(e) =>
                                setFieldValue(`options[${index}].isCorrect`, e.target.checked)
                            }
                        />
                        <TextEditor
                            label={`Варіант ${index + 1}`}
                            name={`options[${index}].text`}
                            value={option.text}
                            onChange={(content) => setFieldValue(`options[${index}].text`, content)}
                            error={touched.options && !!errors.options?.[index]?.text}
                            helperText={touched.options && errors.options?.[index]?.text}
                        />
                    </Box>
                    {index > 1 && (
                        <IconButton
                            aria-label="Видалити варіант"
                            onClick={() => handleRemoveOption(index)}
                        >
                            <DeleteIcon/>
                        </IconButton>
                    )}
                </Box>
            ))}
            {!Array.isArray(errors.options) && touched.options && errors.options && (
                <Alert severity="error"
                       sx={{marginBottom: '7px'}}> {touched.options && errors.options}</Alert>
            )}
            <Box display="flex" justifyContent="center">
                <Button
                    variant="outlined"
                    startIcon={<AddCircle/>}
                    onClick={handleAddOption}
                >
                    Додати ще варіант
                </Button>
            </Box>
        </>
    )
}