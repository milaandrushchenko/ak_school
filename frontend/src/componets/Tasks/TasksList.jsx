import {NavLink, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {getTestById, getTests} from "../../store/test/testsSlice.js";
import {getSubjectById, getSubjects} from "../../store/subject/subjectsSlice.js";
import {useDispatch, useSelector} from "react-redux";
import Grid from "@mui/material/Grid";
import SubjectCard from "../Subjects/SubjectCard.jsx";
import TaskCard from "./TaskCard";
import {Button, Chip, CircularProgress, Typography} from "@mui/material";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import ClearIcon from "@mui/icons-material/Clear.js";
import {theme} from "../../utils/theme.js";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined.js";
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import Box from "@mui/material/Box";
import FormTask from "./FormTask.jsx";
import styles from "../../styles/Grid.module.css";
import {getTasks} from "../../store/task/tasksSlice.js";
import dayjs from "dayjs";


export default function TasksList(){
    const dispatch = useDispatch();
    const {id} = useParams();
    const {subjects, isLoading, visibleData, subject, errors} = useSelector((state) => state.subjects)
    const [notification, setNotification] = useState(false);

    const [openTaskForm, setOpenTaskForm] = useState(false);
    const [openDialogEdit, setOpenDialogEdit] = useState(false);

    const [openDialogDelete, setOpenDialogDelete] = useState(false);
    const [openDialogDeleteTask, setOpenDialogDeleteTask] = useState(false);

    // const [anchorEl, setAnchorEl] = useState(null);
    // const openMenu = Boolean(anchorEl);

    const handleClickOpenTaskForm = (value) => {
        setOpenTaskForm(true);
        // handleCloseMenu();
    };
    const handleClickCloseTaskForm = (value) => {
        console.log(value);
        setOpenTaskForm(false);
        if (value) {
            setNotification({text: 'Завдання успішно додано!', color: 'success'});
        }
    };
    const handleClickOpenDialogEdit = () => {
        setOpenDialogEdit(true);
    };
    const handleCloseDialogEdit = (value) => {
        setOpenDialogEdit(false);
        if (value) {
            setNotification({text: 'Успішно оновлено завдання!', color: 'success'});
        }
    };
    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') return
        setNotification(prevNotification => ({...prevNotification, text: ''}));
    };
    const handleClickOpenDialogDelete = () => {
        setOpenDialogDelete(true);
    };
    const handleCloseDialogDelete = (value) => {
        setOpenDialogDelete(false);
        console.log(value);
        if (value) {
            setNotification({text: 'Предмет був успішно видалений!', color: 'success'});
        }
    };
    const handleCloseDialogDeleteTask = (value) => {
        console.log(value);
        setOpenDialogDeleteTask(false);
        if (value) setNotification({text: 'Завдання успішно видалено!', color: 'success'});
    };
    const handleClickOpenDialogDeleteTask = () => {
        setOpenDialogDeleteTask(true);
    };
    useEffect(() => {
        const fetchData = async () => {
            await dispatch(getSubjects());
            dispatch(getSubjectById(id));
        };
        fetchData();
    }, [id])
    const outputSubject = subject ? {
        id: subject.id,
        name: subject.name,
        // teacher: subject.teacher.second_name + " " + subject.teacher.first_name,
        created_at: subject.created_at,
        updated_at: subject.updated_at,
        tasks: subject.tasks,
    } : null;

//--------------------------------------------------------------------------------
    const {user, userToken} = useSelector((state) => state.currentUser)
    // // const subject = subjects.find(x => x.id === parseInt(id));
    // const [open, setOpen] = useState(false);
    //
    // const handleClickOpen = () => {
    //     setOpen(true);
    // };
    // const handleClose = (value) => {
    //     setOpen(false);
    //     if (value) setNotification('Завдання успішно додано!');
    // };
    // const handleDelete = () => {
    //     setNotification('Завдання успішно видалено');
    // }
//--------------------------------------------------------------------------------

    const groupBy = (array, key) => {
        return array.reduce((result, currentValue) => {
            (result[currentValue[key]] = result[currentValue[key]] || []).push(
                currentValue
            );
            return result;
        }, {});
    };
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
                    {user.permissions?.includes("update classes") &&
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
                        <Grid item xs={12} lg={9}>
                            <Typography component="h2" variant="h4" color="primary" py="30px" sx={{pb:2}}>
                                {subject ? subject.name : ""}
                            </Typography>
                            <Typography sx={{p:0, fontSize: "1.3em", fontStyle: 'italic'}} color="grey" py="30px" gutterBottom>
                                Викладає: <span style={{color:'black'}}>{subject.teacher ? subject.teacher.second_name + " " + subject.teacher.first_name : ""}</span>
                            </Typography>
                            <Typography sx={{p:0, fontStyle: 'italic'}} color="grey" py="30px" gutterBottom>
                                Останнє оновлення: <span style={{color:'black'}}>{subject.updated_at}</span>
                            </Typography>
                            <Typography sx={{p:0, mb:4, fontStyle: 'italic'}} color="grey" py="30px" gutterBottom>
                                Створено:  <span style={{color:'black'}}>{subject.created_at}</span>
                            </Typography>
                        </Grid>

                        {/*<Grid item xs={6} lg={3} sx={{pt: 4}} style={{textAlign: 'right', paddingBottom: 5}} >*/}

                        {/*    <FormTask open={open} onClose={handleClose}/>*/}
                        {/*</Grid>*/}
                    </Grid>
                        <Grid container spacing={2}>
                            {subject.tasks ? subject.tasks.map((task) => (
                                <Grid key={task.id} item xs={12}>
                                    <TaskCard task={task}
                                        openDeleteDialog={openDialogDeleteTask}
                                        onOpenDeleteDialog={handleClickOpenDialogDeleteTask}
                                        onCloseDeleteDialog={handleCloseDialogDeleteTask}
                                    />
                                </Grid>
                            )) : ""}
                        </Grid>
                    {/*{subject.tasks.length > 0 ?*/}
                    {/*    <>*/}
                    {/*    {groupBy(subject.tasks, 'done')['0'] ?*/}
                    {/*        <Grid container spacing={2}>*/}
                    {/*            <Typography variant="h4" sx={{mt: 5, pb: 2, pl: 3, fontWeight: "bold"}}>Не виконано</Typography>*/}
                    {/*            {groupBy(subject.tasks, 'done')['0'].map((task) => (*/}
                    {/*                <Grid key={task.id} item xs={12}>*/}
                    {/*                    <TaskCard taskItem={task}/>*/}
                    {/*                </Grid>*/}
                    {/*            ))}*/}
                    {/*        </Grid> : ""}*/}
                    {/*    {groupBy(subject.tasks, 'done')['1'] ?*/}
                    {/*        <Grid container spacing={2}>*/}
                    {/*            <Typography variant="h4" sx={{mt: 5, pb: 3, pl: 3, fontWeight: "bold"}}>Виконано</Typography>*/}
                    {/*            {groupBy(subject.tasks, 'done')['1'].map((task) => (*/}
                    {/*                <Grid key={task.id} item xs={12}>*/}
                    {/*                    <TaskCard taskItem={task}/>*/}
                    {/*                </Grid>*/}
                    {/*            ))}*/}
                    {/*        </Grid>: ""}*/}
                    {/*    </>*/}
                    {/*: ""}*/}
                </div>
            }
        </>
    );
}