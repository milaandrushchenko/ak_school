import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Card, CardActions,
    CardContent, CardHeader,
    ListItem, Menu, MenuItem
} from "@mui/material";
import Typography from "@mui/material/Typography";
import {Edit, ExpandMore} from "@mui/icons-material";
import Button from "@mui/material/Button";
import {Link, NavLink} from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import React, {useState} from "react";
import DeleteTest from "./DeleteTest.jsx";
import FormTest from "./FormTest.jsx";
import Notification from "../core/Notification.jsx";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function TestCard({classItem, onDelete}) {
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

    const handleClickOpenDialogEdit = () => {
        setOpenDialogEdit(true);
    };

    const handleCloseDialogEdit = (value) => {
        setOpenDialogEdit(false);
        console.log(value)
        if (value) setNotification('Успішно оновлені дані класу!');
    };
    const handleClickOpenDialogDelete = () => {
        setOpenDialogDelete(true);
    };
    const handleCloseDialogDelete = (value) => {

        onDelete();
        setOpenDialogDelete(false);
        console.log(value);
    };

    const outputClassItem = {
        id: classItem.id,
        name: classItem.name,
        monitor_id: classItem.monitor.id,
        teacher_id: classItem.teacher.id,
        student_ids: classItem.students.map(student => student.id)
    };


    return (
        <>
            <Card sx={{height: '100%'}}>
                <CardHeader
                    title={classItem.name}
                    action={
                        <>
                            <IconButton
                                aria-label="more"
                                aria-controls={`menu-for-${classItem.id}`}
                                aria-haspopup="true"
                                onClick={(e) => setAnchorEl(e.currentTarget)}
                            >
                                <MoreVertIcon/>
                            </IconButton>
                            <Menu
                                id={`menu-for-${classItem.id}`}
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={() => setAnchorEl(null)}
                            >
                                <MenuItem onClick={handleClickOpenDialogEdit}>Редагувати</MenuItem>
                                <FormTest open={openDialogEdit}
                                          onClose={handleCloseDialogEdit}
                                          classItem={outputClassItem}/>
                                <MenuItem onClick={handleClickOpenDialogDelete}>Видалити</MenuItem>
                                <DeleteTest open={openDialogDelete}
                                            onClose={handleCloseDialogDelete} classItem={classItem}
                                />
                            </Menu>
                        </>
                    }
                />
                <CardContent>
                    <Typography>Класний керівник:</Typography>
                    <Typography>
                        <Button component={NavLink} to={`/students/${classItem.teacher.id}`}>
                            {`${classItem.teacher.first_name} ${classItem.teacher.second_name}`}
                        </Button>
                    </Typography>
                    <Typography sx={{mt: 2}}>Староста класу:</Typography>
                    <Typography>
                        <Button component={NavLink} to={`/students/${classItem.monitor.id}`}>
                            {`${classItem.monitor.first_name} ${classItem.monitor.second_name}`}
                        </Button>
                    </Typography>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMore/>}>
                            <Typography>Учні:</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <ul style={{listStyleType: "none", padding: 0}}>
                                {classItem.students.map((student) => (
                                    <li key={student.id}>
                                        <Button component={NavLink} to={`/students/${student.id}`}>
                                            {`${student.first_name} ${student.second_name}`}
                                        </Button>
                                    </li>
                                ))}
                            </ul>
                        </AccordionDetails>
                    </Accordion>
                </CardContent>
            </Card>
            {notification && (
                <Notification notification={!!notification}
                              handleCloseAlert={handleCloseAlert} hideDuration={3000}
                              text={notification}/>
            )}
        </>
    )
}