import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    Card,
    CardContent,
    CardHeader, FormControl,
    Grid, TextField
} from "@mui/material";
import Typography from "@mui/material/Typography";
import React from "react";
import {NavLink} from "react-router-dom";
import {ExpandMore} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import dayjs from "dayjs";
import {FormikProvider, useFormik} from "formik";
import * as Yup from "yup";
import {createSubject} from "../../../store/subject/subjectsSlice.js";
import {updateAttempt} from "../../../store/task_attempts/attemptsSlice.js";


export default function AttemptCard({attempt}){
    const {user, userToken} = useSelector((state) => state.currentUser)
    const {users, isLoading} = useSelector((state) => state.users)
    const student = users.find((u) => u.id === attempt.student_id)
    const monthNames = ["Січня", "Лютого", "Березня", "Квітня", "Травня", "Червня",
        "Липня", "Серпня", "Вересня", "Жовтня", "Листопада", "Грудня"];
    const dayNames = ["Понеділок", "Вівторок", "Середа",
        "Четвер", "П\'ятниця", "Суббота", "Неділя"];
    let d = new Date(attempt.updated_at.split('T')[0] + " " + attempt.updated_at.split('T')[1])
    const dispatch = useDispatch();
    const validationSchema = Yup.object().shape({
        score: Yup.number().min(0, 'Введіть число від 0 до 12').max(12, 'Введіть число від 0 до 12'),
    });
    const initialValues = {
        score: null
    }
    const formik = useFormik({
        initialValues: attempt ? attempt : initialValues,
        validationSchema,
        onSubmit: async (values, {setErrors, setSubmitting}) => {
            const attempt_id = attempt.id
            await dispatch(updateAttempt({attempt_id, values}));
        }
    })
    return (
        <>
            {!isLoading &&
                <Card sx={{height: '100%'}}>
                    <CardHeader
                        sx={{pb:0}}
                        title={
                            <Grid container justifyContent="space-between">
                                <Grid item>
                                    <Typography color="primary" variant="h5" sx={{pb:2}}>
                                        {student.second_name + " " + student.first_name}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    {attempt.content ?
                                        <Typography sx={{py:1, color: "grey", fontStyle: "italic"}}>
                                            {dayNames[d.getDay()]}, {d.getDate()+1} {monthNames[d.getMonth()]} {d.getFullYear()},
                                            <span style={{fontWeight: "bold", paddingLeft: "5px"}}>{d.getHours()}:{d.getMinutes()}:{d.getSeconds()}</span>
                                        </Typography>
                                    :""}
                                </Grid>
                            </Grid>
                        }
                    />
                    <CardContent sx={{borderTop: "1px solid lightGrey", p:0}} style={{paddingBottom: 0}}>
                        {(user.role === 'admin' || user.role === "teacher") && attempt.content ?
                            <>
                                <Accordion style={{margin:0}}>
                                    <AccordionSummary expandIcon={<ExpandMore/>}>
                                        <Typography variant="h6" color="primary">Відповіді учня</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails sx={{backgroundColor: "#f5f5f5"}}>
                                        <div dangerouslySetInnerHTML={{__html: attempt.content}}/>
                                    </AccordionDetails>
                                </Accordion>
                                <Grid container spacing={2} justifyContent="space-between" sx={{pt:2}}>
                                    <Grid item></Grid>
                                    <Grid item>
                                        <FormikProvider value={formik}>
                                            <form onSubmit={formik.handleSubmit}>
                                                <FormControl fullWidth sx={{marginTop: 2}}
                                                    error={formik.touched.score && Boolean(formik.errors.score)}>
                                                    <Grid container sx={{pr:2, pb:2}}>
                                                        <Grid item>
                                                            <TextField
                                                                id="score" name="score" label="Оцінка"
                                                                variant="outlined" type="number"
                                                                value={formik.values.score ? parseInt(formik.values.score) : undefined}
                                                                onChange={formik.handleChange}
                                                                onBlur={formik.handleBlur}
                                                                inputProps={{ inputMode: 'numeric', step: "1", min: 0, max: 12}}>
                                                            </TextField>
                                                        </Grid>
                                                        <Grid item sx={{pt:1, pl:2}}>
                                                            <Button type="submit" variant="contained" color="primary">
                                                                Оцінити
                                                            </Button>
                                                        </Grid>
                                                    </Grid>
                                                </FormControl>
                                            </form>
                                        </FormikProvider>
                                    </Grid>

                                </Grid>
                            </>
                            : ""
                        }
                    </CardContent>
                </Card>
            }
        </>
    );
}