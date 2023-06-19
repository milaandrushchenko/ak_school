import React, {useState} from "react";
import {useDispatch} from "react-redux";
import * as Yup from "yup";
import {FormikProvider, useFormik} from "formik";
import {Chip, FormControl, Grid, TableCell, TableRow, TextField} from "@mui/material";
import {createSessionScore, updateSessionScore} from "../../../store/statement/statementSlice.js";
import Notification from "../../core/Notification.jsx";

export default function StatementTableRowDouble({first_score, second_score, student, first_semester_id, second_semester_id}){
    const initialYearScore = Math.ceil(((first_score && first_score.score) + (second_score && second_score.score))/2)
    const [yearScore, setYearScore] = useState(initialYearScore);
    const [notification, setNotification] = useState(false);
    const dispatch = useDispatch();
    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {return;}
        setNotification(false);
    };
    const initialValues1 = {
        score: undefined,
        student_id: student.id,
        statement_id: first_semester_id
    }
    const initialValues2 = {
        score: undefined,
        student_id: student.id,
        statement_id: second_semester_id
    }
    const validationSchema = Yup.object().shape({
        score: Yup.number().min(0, 'Введіть число від 0 до 12').max(12, 'Введіть число від 0 до 12'),
    });
    const formik1 = useFormik({
        initialValues: first_score ? first_score : initialValues1,
        validationSchema,
        validateOnBlur: true,
        onSubmit: async (values, {setErrors, setSubmitting}) => {
            if (values.id) {
                const resultAction = await dispatch(updateSessionScore(
                    {
                        id: values.id,
                        score: values.score
                    }
                ))
                if (updateSessionScore.fulfilled.match(resultAction)){
                    setYearScore(Math.ceil((second_score.score + resultAction.payload.score)/2))
                    setNotification('Успішно оновлено!');
                }
            } else {
                const statement_id = first_semester_id;
                const resultAction = await dispatch(createSessionScore({statement_id, values}))
                if (createSessionScore.fulfilled.match(resultAction)){
                    setNotification('Успішно оновлено!');
                    setYearScore(Math.ceil((second_score.score + resultAction.payload.score) / 2 ))
                }
            }
        }
    })
    const formik2 = useFormik({
        initialValues: second_score ? second_score : initialValues2,
        validationSchema,
        validateOnBlur: true,
        onSubmit: async (values, {setErrors, setSubmitting}) => {
            if (values.id) {
                const resultAction = await dispatch(updateSessionScore(
                    {
                        id: values.id,
                        score: values.score
                    }
                ))
                if (updateSessionScore.fulfilled.match(resultAction)){
                    setYearScore(Math.ceil((first_score.score + resultAction.payload.score)/2))
                    setNotification('Успішно оновлено!');
                }
            } else {
                const statement_id = first_semester_id;
                const resultAction = await dispatch(createSessionScore({statement_id, values}))
                if (createSessionScore.fulfilled.match(resultAction)){
                    setNotification('Успішно оновлено!');
                    setYearScore(Math.ceil((first_score.score + resultAction.payload.score) / 2 ))
                }
            }
        }
    })

    return (
        <TableRow>
            <TableCell sx={{fontSize: "1.1em"}}>
                {student.second_name + " " + student.first_name}
            </TableCell>
            <TableCell sx={{p:0.6}} align="center">
                <FormikProvider value={formik1}>
                    <form onSubmit={formik1.handleSubmit}>
                        <FormControl fullWidth error={formik1.touched.score && Boolean(formik1.errors.score)}>
                            <Grid>
                                <TextField
                                    id="score" name="score"
                                    variant="outlined" type="number"
                                    value={formik1.values.score ? parseInt(formik1.values.score) : undefined}
                                    onChange={formik1.handleChange}
                                    onBlur={(x)=>{
                                        formik1.handleBlur(x)
                                        formik1.handleSubmit()
                                    }}
                                    inputProps={{ inputMode: 'numeric', step: "1", min: 0, max: 12}}>
                                </TextField>
                            </Grid>
                        </FormControl>
                    </form>
                </FormikProvider>
            </TableCell>
            <TableCell sx={{p:0.6}} align="center">
                <FormikProvider value={formik2}>
                    <form onSubmit={formik2.handleSubmit}>
                        <FormControl fullWidth error={formik2.touched.score && Boolean(formik2.errors.score)}>
                            <Grid>
                                <TextField
                                    id="score" name="score"
                                    variant="outlined" type="number"
                                    value={formik2.values.score ? parseInt(formik2.values.score) : undefined}
                                    onChange={formik2.handleChange}
                                    onBlur={(x)=>{
                                        formik2.handleBlur(x)
                                        formik2.handleSubmit()
                                    }}
                                    inputProps={{ inputMode: 'numeric', step: "1", min: 0, max: 12}}>
                                </TextField>
                            </Grid>
                        </FormControl>
                    </form>
                </FormikProvider>
            </TableCell>
            <TableCell sx={{p:0.6}} align="center">
                {!isNaN(yearScore) && <Chip sx={{fontSize: "1.1em"}} label={yearScore}/>}
                {notification && (
                    <Notification notification={!!notification}
                                  hideDuration={2000} handleCloseAlert={handleCloseAlert}
                                  text={notification}/>
                )}
            </TableCell>
        </TableRow>
    )
}