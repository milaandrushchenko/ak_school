import {
    Accordion, AccordionDetails, AccordionSummary, Button, Grid,
    Card, CardContent, CardHeader, Chip, Menu, MenuItem,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import {NavLink} from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert.js";
import React, {useState} from "react";
import FormTask from "./FormTask.jsx";
import dayjs from "dayjs";
import {ExpandMore} from "@mui/icons-material";
import {useSelector} from "react-redux";
import DeleteTask from "./DeleteTask.jsx";
import {formattedDate} from "../../../utils/common.js";
import Notification from "../../core/Notification.jsx";

const currentDate = dayjs();

export default function TaskCard({task, openDeleteDialog, onOpenDeleteDialog, onCloseDeleteDialog}){
    const [notification, setNotification] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [openDialogEdit, setOpenDialogEdit] = useState(false);
    const handleClickOpenDialogEdit = () => {
        setOpenDialogEdit(true);
    };
    const handleCloseDialogEdit = (value) => {
        setOpenDialogEdit(false);
        console.log(value)
        if (value) setNotification({text: 'Завдання успішно оновлено!', color: "success"});
    };
    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setNotification(false);
    };
    const handleMenuOpen = (event) => {
        event.preventDefault();
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = (event) => {
        event.preventDefault();
        setAnchorEl(null);
    };

    const {user, userToken} = useSelector((state) => state.currentUser)
    const {attempts, isLoading} = useSelector((state) => state.tasks)
    let att, done;
    if (!isLoading){
        try {
            att = attempts.find((a) => a.id === task.id).attempts
            done = att.filter((a) => a.score !== null)
        } catch {}
    }
    const currentAttempt = att ? att.find((a) => a.student_id === user.id) : null;
    return (
        <>
            <Card sx={{height: '100%'}}>
                <CardHeader
                    sx={{pb:0}}
                    title={
                        <Typography color="primary" variant="h5">
                            {task.name}
                            {user.role === 'student'
                                && task.done_to
                                && (currentAttempt && currentAttempt.done_at && currentAttempt.done_at > task.done_to ?
                                    <Chip component="span" label="Протерміновано" sx={{backgroundColor: "#ff1744", color: "white", ml:3}} /> : "")}
                        </Typography>
                    }
                    subheader={
                    <>
                        { task.done_to ?
                        <Typography sx={{py:1, color: "grey", fontStyle: "italic"}}>
                            Здати до: <span style={{color: "black"}}>{formattedDate(task.done_to)}</span>
                        </Typography> : <Typography sx={{py:1, color: "grey", fontStyle: "italic"}}>Без терміну здачі</Typography>}
                        {currentAttempt && currentAttempt.done_at &&
                            <Typography  sx={{py:1, color: "grey", fontStyle: "italic"}}>Здано: <span style={{color: "black"}}>{formattedDate(currentAttempt.done_at)}</span></Typography>}
                    </>

                   }
                    action={user.role !== 'student' ?
                        <>
                            <IconButton
                                aria-label="more"
                                aria-controls={`menu-for-${task.id}`}
                                aria-haspopup="true"
                                onClick={handleMenuOpen}>
                                <MoreVertIcon/>
                            </IconButton>
                            <Menu
                                id={`menu-for-${task.id}`}
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleMenuClose}
                            >
                                <MenuItem onClick={handleClickOpenDialogEdit}>Редагувати</MenuItem>
                                <FormTask open={openDialogEdit} onClose={handleCloseDialogEdit} task={task}/>
                                <MenuItem onClick={onOpenDeleteDialog}>Видалити</MenuItem>
                                <DeleteTask open={openDeleteDialog}
                                               onClose={onCloseDeleteDialog} task={task}
                                />
                            </Menu>
                        </> : <>
                            {currentAttempt && (!currentAttempt.score || currentAttempt.score === "0.00") ?
                                <>
                                    <Grid sx={{mt: 2, mr: 2}}>
                                        <Button variant="contained" component={NavLink} to={"/task/" + task.id}>
                                            {currentAttempt.content ? "Редагувати" : "Здати завдання"}
                                        </Button>
                                    </Grid>
                                </>
                            :
                                <Grid sx={{mt: 2, mr: 2}}>
                                    <Button variant="outlined" component={NavLink} to={"/task/" + task.id}>Переглянути</Button>
                                </Grid>
                            }
                        </>
                    }
                />
                <CardContent sx={{borderTop: "1px solid lightGrey", p:0}} style={{paddingBottom: 0}}>
                    {user.role === 'admin' || user.role === "teacher" ?
                        <>
                            {!isLoading &&
                                <Grid container justifyContent="space-between" sx={{p:2}}>
                                    <Grid item>
                                        <Typography color="grey" fontStyle="italic">
                                            Учнів виконало: <span style={{color: "black"}}>{done ? done.length : ""}/{att ? att.length : ""}</span>
                                        </Typography>
                                        <Typography color="grey" fontStyle="italic">
                                            Опубліковано:
                                            <span style={{color: "black", paddingLeft: "10px"}}>
                                                {formattedDate(task.created_at)}
                                            </span>
                                        </Typography>
                                        <Typography color="grey" fontStyle="italic">
                                            Відредаговано:
                                            <span style={{color: "black", paddingLeft: "10px"}}>
                                                {formattedDate(task.updated_at)}
                                            </span>
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Button variant="contained" component={NavLink} to={"/task/" + task.id}>Результати учнів</Button>
                                    </Grid>

                                </Grid>
                            }
                        </>
                        : ""
                    }
                    {currentAttempt && (!currentAttempt.score || currentAttempt.score === "0.00") &&
                        <Accordion style={{margin:0}}>
                            <AccordionSummary expandIcon={<ExpandMore/>} sx={{borderBottom: "1px solid lightGrey"}}>
                                <Typography variant="h6" color="primary">Завдання</Typography>
                            </AccordionSummary>
                            <AccordionDetails sx={{backgroundColor: "#f5f5f5"}}>
                                <div dangerouslySetInnerHTML={{__html: task.content}}/>
                            </AccordionDetails>
                        </Accordion>
                    }
                    {notification && (
                        <Notification notification={!!notification}
                                      handleCloseAlert={handleCloseAlert} hideDuration={3000}
                                      text={notification}/>
                    )}
                </CardContent>
            </Card>
        </>
    );
}