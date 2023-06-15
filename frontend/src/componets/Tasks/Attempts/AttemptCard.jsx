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
                                    <FormikProvider value={formik}>
                                        <form onSubmit={formik.handleSubmit}>
                                            <FormControl fullWidth
                                                         error={formik.touched.score && Boolean(formik.errors.score)}>
                                                <Grid container>
                                                    <Grid item>
                                                        <TextField sx={{mb:2}}
                                                                   id="score" name="score" label="Оцінка"
                                                                   variant="outlined" type="number"
                                                                   value={formik.values.score ? parseInt(formik.values.score) : undefined}
                                                                   onChange={formik.handleChange}
                                                                   onBlur={formik.handleBlur}
                                                                   inputProps={{ inputMode: 'numeric', step: "1", min: 0, max: 12}}>
                                                        </TextField>
                                                    </Grid>
                                                    <Grid item sx={{pl:2, pt: 1.3}}>
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
                        }
                    />
                    <CardContent sx={{borderTop: "1px solid lightGrey", p:0}} style={{paddingBottom: 0}}>
                        {(user.role === 'admin' || user.role === "teacher") ?
                            <>
                                {attempt.content ?
                                    <Accordion style={{margin:0}}>
                                        <AccordionSummary expandIcon={<ExpandMore/>}>
                                            <Typography variant="h6" color="grey">Відповіді учня</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails sx={{backgroundColor: "#f5f5f5"}}>
                                            <div dangerouslySetInnerHTML={{__html: attempt.content}}/>
                                        </AccordionDetails>
                                    </Accordion>
                                    : ""}
                            </>
                            : ""
                        }
                    </CardContent>
                </Card>
            }
        </>
    );
}