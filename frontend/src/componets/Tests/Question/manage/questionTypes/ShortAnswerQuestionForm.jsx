import React, {useState} from "react";
import {
    Box,
    Button,
    TextField,
} from "@mui/material";
import * as Yup from "yup";
import {AddCircle} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ShortAnswerQuestionForm({formik}) {


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

    const handleAddAnswer = () => {
        setFieldValue("options", [
            ...values.options,
            '',
        ]);
    };

    const handleRemoveAnswer = (index) => {
        const updatedOptions = [...values.options];
        updatedOptions.splice(index, 1);
        setFieldValue('options', updatedOptions);
    };

    return (
        <>
            {values.options && values.options.map((answer, index) => (
                <Box key={index} display="flex" alignItems="center">
                    <TextField
                        key={index}
                        label={`Варіант відповіді ${index + 1}`}
                        fullWidth
                        margin="normal"
                        value={answer}
                        name={`options[${index}]`}
                        onChange={(event) => handleChange(event, index)}
                        error={touched.options && !!errors.options?.[index]}
                        helperText={touched.options && errors.options?.[index]}
                    />
                    {index >= 1 && (
                        <IconButton
                            aria-label="Видалити варіант"
                            onClick={() => handleRemoveAnswer(index)}
                        >
                            <DeleteIcon/>
                        </IconButton>
                    )}
                </Box>
            ))}
            <Box display="flex" justifyContent="center">
                <Button
                    variant="outlined"
                    startIcon={<AddCircle/>}
                    onClick={handleAddAnswer}
                >
                    Додати ще варіант
                </Button>
            </Box>

        </>
    );
};
