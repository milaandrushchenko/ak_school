import React, {useState} from "react";
import {
    Box,
    Button, DialogActions, DialogTitle, DialogContent,
    Grid,
    TextField,
    Typography, Alert
} from "@mui/material";
import TextEditor from "../../core/TextEditor.jsx";
import {FormikProvider, useFormik} from "formik";
import * as Yup from "yup";
import {AddCircle} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";


const MatchingQuestionForm = ({formik}) => {

    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        // handleSubmit,
        setFieldValue,
        setErrors
    } = formik;

    const handleAddPairs = () => {
        setFieldValue("options", [
            ...values.options,
            {text: "", correctAnswer: ""},
        ]);
    };

    const handleRemovePairs = (index) => {
        const updatedOptions = [...values.options];
        updatedOptions.splice(index, 1);
        setFieldValue('options', updatedOptions);
    };

    return (
        <>
            <Grid container spacing={2}>
                {values.options?.map((pair, index) => (
                    <React.Fragment key={index}>
                        <Grid item xs={12} lg={6}>
                            <TextEditor
                                label={`Запитання ${index + 1}`}
                                fullWidth
                                margin="normal"
                                value={pair.text}
                                onChange={(content) => setFieldValue(`options[${index}].text`, content)}
                                name={`options[${index}].text`}
                                error={touched.options && !!errors.options?.[index]?.text}
                                helperText={touched.options && errors.options?.[index]?.text}
                            />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <TextEditor
                                label={`Відповідь ${index + 1}`}
                                fullWidth
                                margin="normal"
                                value={pair.correctAnswer}
                                onChange={(content) => setFieldValue(`options[${index}].correctAnswer`, content)}
                                name={`options[${index}].correctAnswer`}
                                error={touched.options && !!errors.options?.[index]?.correctAnswer}
                                helperText={touched.options && errors.options?.[index]?.correctAnswer}
                            />
                        </Grid>
                        {index > 1 && (
                            <Grid item xs={12} textAlign="center" sx={{marginTop: '-15px'}}>
                                <IconButton
                                    aria-label="Видалити варіант"
                                    onClick={() => handleRemovePairs(index)}
                                >
                                    <DeleteIcon/>
                                </IconButton>
                            </Grid>
                        )}

                    </React.Fragment>
                ))}
            </Grid>
            {!Array.isArray(errors.options) && touched.options && errors.options && (
                <Alert severity="error"
                       sx={{marginBottom: '7px'}}> {touched.options && errors.options}</Alert>
            )}
            <Box display="flex" justifyContent="center">
                <Button
                    variant="outlined"
                    startIcon={<AddCircle/>}
                    onClick={handleAddPairs}
                >
                    Додати ще відповідність
                </Button>
            </Box>
        </>
    );
};

export default MatchingQuestionForm;
