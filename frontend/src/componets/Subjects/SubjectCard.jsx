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
import Notification from "../core/Notification.jsx";
import 'react-toastify/dist/ReactToastify.css';

export default function SubjectCard({subjectItem: subjectItem,}) {
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

    //
    // const outputSubjectItem = {
    //     id: subjectItem.id,
    //     name: subjectItem.name,
    //     teacher_id: subjectItem.teacher.id,
    //     created_at: subjectItem.created_at,
    // };

    console.log(subjectItem.created_at)
    return (
        <>
            <Card sx={{height: '100%'}}>
                <CardHeader
                    title={subjectItem.name}
                    action={
                        <>
                            <IconButton
                                aria-label="more"
                                aria-controls={`menu-for-${subjectItem.id}`}
                                aria-haspopup="true"
                                onClick={(e) => setAnchorEl(e.currentTarget)}>
                                <MoreVertIcon/>
                            </IconButton>
                        </>
                    }
                />
                <CardContent>
                    <Typography>Класний керівник:</Typography>
                    <Typography>
                        <Button component={NavLink} to={`/user/${subjectItem.teacher.id}`}>
                            {`${subjectItem.teacher.first_name} ${subjectItem.teacher.second_name}`}
                        </Button>
                    </Typography>
                    <Typography style={{fontSize: "0.8em", color: "grey", top: "10px", position: "relative"}}>
                        Створено: {subjectItem.created_at}
                    </Typography>
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