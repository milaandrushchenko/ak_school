import {Button, Chip, FormControl, TableCell, TableRow, TextField} from "@mui/material";
import {FormikProvider, useFormik} from "formik";
import Grid from "@mui/material/Grid";
import React, {useState} from "react";
import * as Yup from "yup";
import {createSessionScore, updateSessionScore} from "../../../store/statement/statementSlice.js";
import {useDispatch} from "react-redux";
import Notification from "../../core/Notification.jsx";


export default function StatementTableRowSingle({student, score, statement}){
    const [notification, setNotification] = useState(false);
    const dispatch = useDispatch();
    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {return;}
        setNotification(false);
    };
    const initialValues = {
        score: undefined,
        student_id: student.id,
        statement_id: statement && statement.id
    }
    const validationSchema = Yup.object().shape({
        score: Yup.number().min(0, 'Введіть число від 0 до 12').max(12, 'Введіть число від 0 до 12'),
    });
    const formik = useFormik({
        initialValues: score ? score : initialValues,
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
                if (updateSessionScore.fulfilled.match(resultAction))
                    setNotification('Успішно оновлено!');
            } else {
                console.log(values)
                const statement_id = statement.id;
                const resultAction = await dispatch(createSessionScore({statement_id, values}))
                if (createSessionScore.fulfilled.match(resultAction))
                    setNotification('Успішно оновлено!');
            }
        }
    })

    return (
        <TableRow>
            <TableCell sx={{fontSize: "1.1em"}}>
                {student.second_name + " " + student.first_name}
            </TableCell>
            <TableCell sx={{p:0.6}} align="center">
                <FormikProvider value={formik}>
                    <form onSubmit={formik.handleSubmit}>
                        <FormControl fullWidth
                                     error={formik.touched.score && Boolean(formik.errors.score)}>
                            <Grid>
                                <TextField
                                    id="score" name="score"
                                    variant="outlined" type="number"
                                    value={formik.values.score ? parseInt(formik.values.score) : undefined}
                                    onChange={formik.handleChange}
                                    onBlur={(x)=>{
                                        formik.handleBlur(x)
                                        formik.handleSubmit()
                                    }}
                                    inputProps={{ inputMode: 'numeric', step: "1", min: 0, max: 12}}>
                                </TextField>
                            </Grid>
                        </FormControl>
                    </form>
                </FormikProvider>
                {notification && (
                    <Notification notification={!!notification}
                                  hideDuration={2000} handleCloseAlert={handleCloseAlert}
                                  text={notification}/>
                )}
            </TableCell>
        </TableRow>
    )
}
