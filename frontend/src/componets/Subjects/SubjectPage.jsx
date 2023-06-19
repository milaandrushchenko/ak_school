import {Link, NavLink, useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {getSubjectById, getSubjects, updateSubject} from "../../store/subject/subjectsSlice.js";
import {useDispatch, useSelector} from "react-redux";
import Grid from "@mui/material/Grid";
import TaskCard from "./Tasks/TaskCard.jsx";
import {Button, Card, CardContent, CardHeader, Chip, CircularProgress, Paper, Tab, Tabs, Typography} from "@mui/material";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import {theme} from "../../utils/theme.js";
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import Box from "@mui/material/Box";
import FormTask from "./Tasks/FormTask.jsx";
import {FormikProvider, useFormik} from "formik";
import TextEditor from "../core/TextEditor.jsx";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder.js";
import {formattedDate} from "../../utils/common.js";
import TimerIcon from "@mui/icons-material/Timer.js";
import FactCheckIcon from '@mui/icons-material/FactCheck';
import StudentTabs from "./Tabs/StudentTabs.jsx";
import AdminTabs from "./Tabs/AdminTabs";


export default function SubjectPage(){
    const dispatch = useDispatch();
    const {id} = useParams();
    const {subjects, isLoading, visibleData, subject, errors} = useSelector((state) => state.subjects)
    const [notification, setNotification] = useState(false);
    const [openTaskForm, setOpenTaskForm] = useState(false);
    const [openDialogEdit, setOpenDialogEdit] = useState(false);

    const [openDialogDelete, setOpenDialogDelete] = useState(false);
    const [openDialogDeleteTask, setOpenDialogDeleteTask] = useState(false);

    const navigate = useNavigate();
    const handleClickOpenTaskForm = (value) => {
        setOpenTaskForm(true);
    };
    const handleClickCloseTaskForm = (value) => {
        console.log(value);
        setOpenTaskForm(false);
        if (value) {
            setNotification({text: 'Завдання успішно додано!', color: 'success'});
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(getSubjects());
            dispatch(getSubjectById(id));
        };
        fetchData();
    }, [id])

    const {user, userToken} = useSelector((state) => state.currentUser)
    if (!isLoading && !subject)
        navigate("/error/404")
    const initialValues = {
        content: ""
    }
    const formik = useFormik({
        initialValues: subject ? subject : initialValues,
        enableReinitialize: true, // Увімкнути оновлення значень initialValues
        onSubmit: async (values, {setErrors, setSubmitting}) => {
            values['classes_ids'] = values.classes.map(c => c.id);
            let id = subject.id;
            console.log(id);
            const resultAction = await dispatch(updateSubject({id, values}));
            if (updateSubject.fulfilled.match(resultAction)) {
                console.log('subject updated');
                console.log(values);
                close(true);
            }
        }
    });
    return (
        <>
            <Grid container justifyContent="space-between">
                <Grid item>
                    <Button style={{backgroundColor: '#b3b7d7', color: 'white'}} sx={{pr: 2, mt: 2}} component={NavLink} to="/subjects">
                        <KeyboardBackspaceIcon sx={{fontSize: "large", mx: 1}}/>
                        ДО ПРЕДМЕТІВ
                    </Button>
                </Grid>

                <Grid item>
                    {user.role !== "student" &&
                        <Button
                            sx={{pr: 2, mt: 2}}
                            color="secondary"
                            style={{backgroundColor: theme.palette.secondary.main, color: 'white'}}
                            onClick={handleClickOpenTaskForm}>
                            <PlaylistAddIcon style={{marginRight: 10}}/>
                            НОВЕ ЗАВДАННЯ
                        </Button>
                    }
                    <FormTask open={openTaskForm} onClose={handleClickCloseTaskForm}/>
                </Grid>
            </Grid>
            {isLoading &&
                <Box sx={{display: 'flex', justifyContent: 'center'}}>
                    <CircularProgress/>
                </Box>
            }
            {!isLoading &&
                <div>
                    <Grid container justifyContent='space-between' style={{flexWrap: 'wrap', paddingBottom: 5}} spacing={2}>
                        <Grid item xs={12}>
                            <Grid container justifyContent="space-between">
                                <Grid item xs={12} md={6}>
                                    <Typography component="h2" variant="h4" color="primary" py="30px" sx={{pb:2}}>
                                        {subject ? subject.name : ""}
                                    </Typography>
                                    <Typography sx={{p:0, fontSize: "1.3em", fontStyle: 'italic'}} color="grey" py="30px" gutterBottom>
                                        Викладає: <span style={{color:'black'}}>{subject.teacher ? subject.teacher.second_name + " " + subject.teacher.first_name : ""}</span>
                                    </Typography>
                                    <Typography sx={{p:0, fontStyle: 'italic'}} color="grey" py="30px" gutterBottom>
                                        Останнє оновлення: <span style={{color:'black'}}>{formattedDate(subject.updated_at)}</span>
                                    </Typography>
                                    <Typography sx={{p:0, mb:4, fontStyle: 'italic'}} color="grey" py="30px" gutterBottom>
                                        Створено:  <span style={{color:'black'}}>{formattedDate(subject.created_at)}</span>
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    {user.role === 'student' ?
                                        <> {subject.content &&
                                            <Paper sx={{p:2}}>
                                                <div dangerouslySetInnerHTML={{__html: subject.content}}/>
                                            </Paper>}
                                        </> :
                                        <>
                                        <FormikProvider value={formik}>
                                            <form>
                                                <TextEditor name='content' value={ formik.values.content }
                                                    onChange={
                                                        (newValue) => {
                                                            formik.setFieldValue('content', newValue)
                                                            formik.handleSubmit()
                                                        }
                                                    }
                                                    onError={ (error) => { formik.setFieldError('content', error) } }
                                                    helperText={formik.touched.content && formik.errors && formik.errors.content}
                                                />
                                            </form>
                                        </FormikProvider>
                                        </>}
                                </Grid>
                            </Grid>

                        </Grid>
                    </Grid>
                    {user.role === "student" ? <StudentTabs subject={subject}/> : <AdminTabs subject={subject}/>}
                </div>
            }
        </>
    );
}