import {NavLink, useParams} from "react-router-dom";
import Grid from "@mui/material/Grid";
import {Accordion, AccordionDetails, AccordionSummary, Button, Chip, Paper, Typography} from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace.js";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getTaskById, updateAttempt} from "../../../../store/task_attempts/attemptsSlice.js";
import AttemptCard from "./AttemptCard.jsx";
import {ExpandMore} from "@mui/icons-material";
import dayjs from "dayjs";
import {getTestById, getTests} from "../../../../store/test/testsSlice.js";
import {getTasks} from "../../../../store/task/tasksSlice.js";
import TextEditor from "../../../core/TextEditor.jsx";
import {FormikProvider, useFormik} from "formik";
import {createTask, updateTask} from "../../../../store/subject/subjectsSlice.js";

const currentDate = dayjs();


export default function TaskPage(){
    const {id} = useParams();
    const {attempts, isLoading} = useSelector((state) => state.tasks)
    console.log(attempts)
    const task = attempts.find((t) => t.id === parseInt(id))
    const {user, userToken} = useSelector((state) => state.currentUser)
    const currentAttempt = task ? task.attempts.find((a) => a.student_id === user.id) : null;
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchData = async () => {
            await dispatch(getTasks());
            dispatch(getTaskById(id));
        };

        fetchData();
    }, [id])
    const initialValues = {
        content: null
    }
    const formik = useFormik({
        initialValues: currentAttempt ? currentAttempt : initialValues,
        enableReinitialize: true, // Увімкнути оновлення значень initialValues
        onSubmit: async (values, {setErrors, setSubmitting}) => {
            console.log(values)
            const attempt_id = currentAttempt.id
            await dispatch(updateAttempt({attempt_id, values}));
        }
    });
    return (
        <>
            <Grid container spacing={2}>
                {!isLoading &&
                    <>
                        <Grid item xs={12}>
                            <Button style={{backgroundColor: '#b3b7d7', color: 'white'}} sx={{pr: 2, mt: 2}}
                                    component={NavLink} to={"/subjects/" + task.subject.id}>
                                <KeyboardBackspaceIcon sx={{fontSize: "large", mx: 1}}/>
                                ДО ЗАВДАНЬ
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <div style={{marginBottom: "20px"}}>
                                <Typography variant="h4" color="primary">
                                    {task.name}
                                </Typography>
                            </div>
                            <Typography sx={{mt:4, mb: 2}} variant="h5" color="grey">Завдання</Typography>
                            <Paper sx={{p:2}}>
                                <div dangerouslySetInnerHTML={{__html: task.content}}/>
                            </Paper>
                        </Grid>
                        {user.role === 'student' ?
                            <Grid item xs={12}>
                                <Typography sx={{mt:4, mb: 2}} variant="h5" color="grey">Моя відповідь</Typography>
                                {currentAttempt.score === null || currentAttempt.score === "0.00" ?
                                    <FormikProvider value={formik}>
                                        <form onSubmit={formik.handleSubmit}>
                                            <TextEditor name='content' value={ formik.values.content }
                                                        onChange={ (newValue) => formik.setFieldValue('content', newValue)}
                                                        onError={ (error) => { formik.setFieldError('content', error) } }
                                                        helperText={formik.touched.content && formik.errors && formik.errors.content}
                                            />
                                            <Grid container justifyContent="space-between">
                                                <Grid item></Grid>
                                                <Grid item sx={{pt:2}}>
                                                    <Button type="submit" variant="contained" color="primary">
                                                        Здати завдання
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </form>
                                    </FormikProvider>
                                    :
                                    <Paper sx={{p:2}}>
                                        <div dangerouslySetInnerHTML={{__html: currentAttempt.content}}/>
                                    </Paper>
                                }
                            </Grid>
                            :
                            <Grid item xs={12}>
                                <Grid container spacing={2} sx={{pt:4, py:5}}>
                                    <Typography variant="h4" color="grey" sx={{px:2}}>Учні</Typography>
                                    {task.attempts.map((a)=>(
                                        <Grid item key={a.id} xs={12}>
                                            <AttemptCard attempt={a}/>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Grid>
                        }
                    </>
                }
            </Grid>
        </>
    );
}