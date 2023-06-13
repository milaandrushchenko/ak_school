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
        if (value) setNotification('Завдання успішно оновлено!');
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
    const monthNames = ["Січня", "Лютого", "Березня", "Квітня", "Травня", "Червня",
        "Липня", "Серпня", "Вересня", "Жовтня", "Листопада", "Грудня"];
    const dayNames = ["Понеділок", "Вівторок", "Середа",
        "Четвер", "П\'ятниця", "Суббота", "Неділя"];
    const d = new Date(task.done_to)
    const dc = new Date(task.created_at)
    const du = new Date(task.updated_at)
    return (
        <>
            <Card sx={{height: '100%'}}>
                <CardHeader
                    sx={{pb:0}}
                    title={
                        <Typography color="primary" variant="h5">
                            {task.name}{currentAttempt && (currentAttempt.score || currentAttempt.score) !== "0.00" ?
                            <Chip component="span" label={currentAttempt.score} color="primary" sx={{ml:2}}/> : ""
                            }
                        </Typography>
                    }
                    subheader={task.done_to ?
                    <Typography sx={{py:1, color: "grey", fontStyle: "italic"}}>
                        Здати до: <span style={{color: "black"}}>{dayNames[d.getDay()]}, {d.getDate()} {monthNames[d.getMonth()]} {d.getFullYear()}</span>
                        {task.done !== 1 && dayjs(task.done_to) < currentDate ?
                            <Chip component="span" label="Термін здачі вийшов" sx={{backgroundColor: "#ff1744", color: "white", ml:3}} /> : ""}
                    </Typography> : <Typography sx={{py:1, color: "grey", fontStyle: "italic"}}>Без терміну здачі</Typography>}
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
                                                {dayNames[dc.getDay()]}, {dc.getDate()} {monthNames[dc.getMonth()]} {dc.getFullYear()}
                                            </span>
                                        </Typography>
                                        <Typography color="grey" fontStyle="italic">
                                            Відредаговано:
                                            <span style={{color: "black", paddingLeft: "10px"}}>
                                                {dayNames[du.getDay()]}, {du.getDate()} {monthNames[du.getMonth()]} {du.getFullYear()}
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
                    <Accordion style={{margin:0}}>
                        <AccordionSummary expandIcon={<ExpandMore/>} sx={{borderBottom: "1px solid lightGrey"}}>
                            <Typography variant="h6" color="primary">Завдання</Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{backgroundColor: "#f5f5f5"}}>
                            <div dangerouslySetInnerHTML={{__html: task.content}}/>
                        </AccordionDetails>
                    </Accordion>
                </CardContent>
            </Card>
        </>
    );
}