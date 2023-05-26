import {
    AccordionSummary, Alert,
    Button, Chip,
    DialogActions,
    DialogContent,
    DialogTitle,
    Radio
} from "@mui/material";
import {AddCircle, ExpandMore, Visibility, VisibilityOff} from '@mui/icons-material';
import IconButton from "@mui/material/IconButton";
import React, {useEffect, useRef, useState} from "react";
import {FormikProvider, useFormik, useFormikContext} from 'formik';
import 'react-quill/dist/quill.snow.css';
import 'dayjs/locale/uk';
import Box from "@mui/material/Box";
import DeleteIcon from "@mui/icons-material/Delete";
import TextEditor from "../../core/TextEditor.jsx";

export default function SingleChoiceQuestionForm({formik}) {
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
                        <Radio
                            checked={option.isCorrect}
                            onChange={() => {
                                setFieldValue(`options.${index}.isCorrect`, true);
                                values.options.forEach((o, i) => {
                                    if (i !== index) {
                                        setFieldValue(`options.${i}.isCorrect`, false);
                                    }
                                });
                            }}
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