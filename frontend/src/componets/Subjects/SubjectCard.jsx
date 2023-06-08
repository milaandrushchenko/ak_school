import {Card, CardContent, CardHeader, Chip, Menu, MenuItem, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {NavLink} from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import React, {useState} from "react";
import Notification from "../core/Notification.jsx";
import 'react-toastify/dist/ReactToastify.css';
import FormSubject from "./FormSubject";
import DeleteSubject from "./DeleteSubject.jsx";
import {useSelector} from "react-redux";

export default function SubjectCard({subjectItem, onDelete}) {
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
        if (value) setNotification('Успішно оновлені дані предмету!');
    };
    const handleClickOpenDialogDelete = () => {
        setOpenDialogDelete(true);
    };
    const handleCloseDialogDelete = (value) => {

        onDelete();
        setOpenDialogDelete(false);
        console.log(value);
    };

    const outputSubjectItem = {
        id: subjectItem.id,
        name: subjectItem.name,
        teacher_id: subjectItem.teacher.id,
        classes: subjectItem.classes.map(class_ => class_.class_id)
    };
    let subjCls = [];
    try {
        const {classes} = useSelector((state) => state.classes);
        subjectItem.classes.map((cls) => {
            // console.log(cls)
            subjCls.push(classes.find(item => item.id === cls.class_id))
        })
        // console.log(subjCls)
    } catch {}
    const {userToken, user} = useSelector((state) => state.currentUser)

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
                            <Menu
                                id={`menu-for-${subjectItem.id}`}
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={() => setAnchorEl(null)}
                            >
                                <MenuItem onClick={handleClickOpenDialogEdit}>Редагувати</MenuItem>
                                <FormSubject open={openDialogEdit}
                                           onClose={handleCloseDialogEdit}
                                           subjectItem={outputSubjectItem}/>
                                <MenuItem onClick={handleClickOpenDialogDelete}>Видалити</MenuItem>
                                <DeleteSubject open={openDialogDelete}
                                             onClose={handleCloseDialogDelete} subjectItem={subjectItem}
                                />
                            </Menu>
                        </>
                    }
                />
                <CardContent>
                    <Typography>Викладає:</Typography>
                    <Typography>
                        <Button component={NavLink} to={`/user/${subjectItem.teacher.id}`}>
                            {`${subjectItem.teacher.first_name} ${subjectItem.teacher.second_name}`}
                        </Button>
                    </Typography>
                    <Stack direction="row" spacing={1}>
                        {user.role === 'admin' ? subjCls.map((c) => {
                            return (
                                <Chip label={c.name} color="primary" />
                            )
                        }) : ''}
                    </Stack>
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