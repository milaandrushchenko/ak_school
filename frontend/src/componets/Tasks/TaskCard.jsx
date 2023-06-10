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

const currentDate = dayjs();
export default function TaskCard({taskItem, onDelete}){
    const [anchorEl, setAnchorEl] = useState(null);
    const [openDialogEdit, setOpenDialogEdit] = useState(false);
    const [openDialogDelete, setOpenDialogDelete] = useState(false);
    const [notification, setNotification] = useState(false);
    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setNotification(false);
    };
    const {user, userToken} = useSelector((state) => state.currentUser)
    const handleClickOpenDialogEdit = () => {
        setOpenDialogEdit(true);
    };

    const handleCloseDialogEdit = (value) => {
        setOpenDialogEdit(false);
        console.log(value)
        if (value) setNotification('Завдання успішно оновлене!');
    };
    const handleClickOpenDialogDelete = () => {
        setOpenDialogDelete(true);
    };
    const handleCloseDialogDelete = (value) => {

        onDelete();
        setOpenDialogDelete(false);
        console.log(value);
    };

    const outputTaskItem = {
        id: taskItem.id,
        name: taskItem.name,
        content: taskItem.content,
        done_to: taskItem.done_to ? dayjs(taskItem.done_to) : null,
    };
    const monthNames = ["Січня", "Лютого", "Березня", "Квітня", "Травня", "Червня",
        "Липня", "Серпня", "Вересня", "Жовтня", "Листопада", "Грудня"];
    const dayNames = ["Понеділок", "Вівторок", "Середа", "Четвер", "П\'ятниця", "Суббота", "Неділя"];
    let d = new Date(outputTaskItem.done_to)

    return (
        <>
            <Card sx={{height: '100%'}}>
                <CardHeader
                    sx={{pb:0}}
                    title={
                        <Typography color="primary" variant="h5">
                            {taskItem.name}
                        </Typography>
                    }
                    subheader={outputTaskItem.done_to ?
                    <Typography sx={{py:1, color: "grey", fontStyle: "italic"}}>
                        Здати до: <span style={{color: "black"}}>{dayNames[d.getDay()]}, {d.getDate()} {monthNames[d.getMonth()]} {d.getFullYear()}</span>
                        {taskItem.done !== 1 && dayjs(taskItem.done_to) < currentDate ?
                            <Chip component="span" label="Термін здачі вийшов" sx={{backgroundColor: "#ff1744", color: "white", ml:3}} /> : ""}
                    </Typography> : <Typography sx={{py:1, color: "grey", fontStyle: "italic"}}>Без терміну здачі</Typography>}
                    action={
                        <>
                            <IconButton
                                aria-label="more"
                                aria-controls={`menu-for-${taskItem.id}`}
                                aria-haspopup="true"
                                onClick={(e) => setAnchorEl(e.currentTarget)}>
                                <MoreVertIcon/>
                            </IconButton>
                            <Menu
                                id={`menu-for-${taskItem.id}`}
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={() => setAnchorEl(null)}
                            >
                                <MenuItem onClick={handleClickOpenDialogEdit}>Редагувати</MenuItem>
                                <FormTask open={openDialogEdit}
                                             onClose={handleCloseDialogEdit}
                                             taskItem={outputTaskItem}/>
                                {/*<MenuItem onClick={handleClickOpenDialogDelete}>Видалити</MenuItem>*/}
                                {/*<DeleteSubject open={openDialogDelete}*/}
                                {/*               onClose={handleCloseDialogDelete} subjectItem={subjectItem}*/}
                                {/*/>*/}
                            </Menu>
                        </>
                    }
                />
                <CardContent sx={{borderTop: "1px solid lightGrey", p:0}} style={{paddingBottom: 0}}>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMore/>}>
                            <Typography variant="h6">Завдання</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div dangerouslySetInnerHTML={{__html: taskItem.content}}/>
                        </AccordionDetails>
                    </Accordion>
                    {user.role === 'admin' || user.role === "teacher" ?
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMore/>}>
                                <Typography variant="h6">Результати учнів</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography variant="h5">Робота студента "1"</Typography>
                                <Typography variant="h5">Робота студента "2"</Typography>
                                <Typography variant="h5">Робота студента "3"</Typography>
                                <Typography variant="h5">Робота студента "4"</Typography>
                            </AccordionDetails>
                        </Accordion>
                         :
                        <>
                            <Accordion>
                                <AccordionSummary expandIcon={<ExpandMore/>}>
                                    <Typography variant="h6">Мої відповіді</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    дані з таблички TaskAttempts (якщо є) по id даного користувача і id завдання
                                </AccordionDetails>
                            </Accordion>
                            <Grid container justifyContent="space-between" sx={{pr:3, pt:3}}>
                                <Grid item></Grid>
                                <Grid item>
                                    <Button variant="contained">Здати завдання</Button>
                                </Grid>
                            </Grid>
                        </>

                    }

                    <Button></Button>
                </CardContent>
            </Card>
        </>
    );
}