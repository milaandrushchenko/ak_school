import React, {useState} from "react";
import {v4 as uuidv4} from "uuid";
import {
    Box,
    Button, DialogActions, DialogTitle, DialogContent,
    Grid,
    TextField,
    Typography, Alert, Chip
} from "@mui/material";
import TextEditor from "../../../../core/TextEditor.jsx";
import {FormikProvider, useFormik} from "formik";
import * as Yup from "yup";
import {AddCircle} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {ukrainianLetters} from "../../../../../utils/common.js";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Checkbox from "@mui/material/Checkbox";
import Matrix from "../../../../core/Matrix.jsx";

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


    const handleAddOptionToLeftColumn = () => {
        setFieldValue("options.leftColumn", [
            ...values.options.leftColumn,
            {uuid: uuidv4(), text: 'left'}
        ]);
    };

    const handleRemoveOptionFromLeftColumn = (index) => {
        const updatedOptions = [...values.options.leftColumn];
        updatedOptions.splice(index, 1);
        setFieldValue('options.leftColumn', updatedOptions);
    };
    const handleAddOptionToRightColumn = () => {
        setFieldValue("options.rightColumn", [
            ...values.options.rightColumn,
            {uuid: uuidv4(), text: 'right'}
        ]);
    };

    const handleRemoveOptionFromRightColumn = (index) => {
        const updatedOptions = [...values.options.rightColumn];
        updatedOptions.splice(index, 1);
        setFieldValue('options.rightColumn', updatedOptions);
    };

    const [matrixValues, setMatrixValues] = useState(values.options?.correctAnswers || []);

    const handleMatrixValueChange = (leftUuid, rightUuid, e) => {
        let updatedMatrixValues = matrixValues.filter(([left, right]) => left !== leftUuid && right !== rightUuid);

        if (e.target.checked) {
            updatedMatrixValues = [...updatedMatrixValues, [leftUuid, rightUuid]];
        }
        setFieldValue('options.correctAnswers', updatedMatrixValues);

        setMatrixValues(updatedMatrixValues);
    };

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} lg={6}>
                    {values.options?.leftColumn.map((leftItem, index) => (
                        <Grid container spacing={2} key={leftItem.uuid}>
                            <Grid item xs={12}>
                                <Box display="flex" justifyContent="space-between"
                                     alignItems="center">
                                    <Chip label={`${index + 1}`} color="primary"/>
                                    <IconButton
                                        aria-label="Видалити варіант"
                                        onClick={() => handleRemoveOptionFromLeftColumn(index)}
                                    >
                                        <DeleteIcon/>
                                    </IconButton>
                                </Box>
                                <TextEditor
                                    id={`leftItemText${index}`}
                                    fullWidth
                                    margin="normal"
                                    value={leftItem.text}
                                    onChange={(content) => setFieldValue(`options.leftColumn[${index}].text`, content)}
                                    name={`options.leftColumn[${index}].text`}
                                    error={touched.options?.leftColumn && Array.isArray(errors.options?.leftColumn) && !!errors.options?.leftColumn[index]?.text}
                                    helperText={touched.options?.leftColumn && Array.isArray(errors.options?.leftColumn) && errors.options?.leftColumn[index]?.text}

                                />
                            </Grid>
                        </Grid>
                    ))}
                    <Box display="flex" justifyContent="center">
                        <Button
                            variant="outlined"
                            startIcon={<AddCircle/>}
                            onClick={handleAddOptionToLeftColumn}
                        >
                            Додати ще варіант
                        </Button>
                    </Box>
                </Grid>

                <Grid item xs={12} lg={6}>
                    {values.options?.rightColumn.map((rightItem, index) => (
                        <Grid container spacing={2} key={rightItem.uuid}>
                            <Grid item xs={12}>
                                <Box display="flex" justifyContent="space-between"
                                     alignItems="center">
                                    <Chip label={ukrainianLetters[index]} color="primary"/>
                                    <IconButton
                                        aria-label="Видалити варіант"
                                        onClick={() => handleRemoveOptionFromRightColumn(index)}
                                    >
                                        <DeleteIcon/>
                                    </IconButton>
                                </Box>

                                <TextEditor
                                    id={`rightItemText${index}`}
                                    fullWidth
                                    margin="normal"
                                    value={rightItem.text}
                                    onChange={(content) => setFieldValue(`options.rightColumn[${index}].text`, content)}
                                    name={`options.rightColumn[${index}].text`}
                                    error={touched.options?.rightColumn && Array.isArray(errors.options?.rightColumn) && !!errors.options?.rightColumn[index]?.text}
                                    helperText={touched.options?.rightColumn && Array.isArray(errors.options?.rightColumn) && errors.options?.rightColumn[index]?.text}

                                />
                            </Grid>
                        </Grid>
                    ))}
                    <Box display="flex" justifyContent="center">
                        <Button
                            variant="outlined"
                            startIcon={<AddCircle/>}
                            onClick={handleAddOptionToRightColumn}
                        >
                            Додати ще варіант
                        </Button>
                    </Box>
                </Grid>
            </Grid>
            <Typography variant="subtitle1" component="label"
                        sx={{
                            paddingTop: '10px',
                            fontWeight: 'bold',
                            color: 'grey.500',
                            display: 'block',
                            textAlign: 'center'
                        }}>Вкажіть правильну відповідь:</Typography>
            <Matrix options={values.options} onChange={handleMatrixValueChange}
                    selectedOptions={values.options?.correctAnswers}/>
            {values.options?.correctAnswers.length !== values.options?.leftColumn.length && (
                <Alert severity="error"
                       sx={{marginBottom: '7px'}}>{errors.options?.correctAnswers}</Alert>
            )}

        </>
    );
};

export default MatchingQuestionForm;
