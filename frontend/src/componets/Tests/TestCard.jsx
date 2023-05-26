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
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import TimerIcon from '@mui/icons-material/Timer';
import {formattedDate} from "../../utils/common.js";
import Box from "@mui/material/Box";

export default function TestCard({test, onDelete}) {
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

    // const outputClassItem = {
    //     id: test.id,
    //     name: test.name,
    //     monitor_id: test.monitor.id,
    //     teacher_id: test.teacher.id,
    //     student_ids: test.students.map(student => student.id)
    // };


    return (
        <>
            <Link to={`/tests/${test.id}`} style={{textDecoration: 'none'}}>
                <Card sx={{height: '100%'}}>
                    <CardHeader
                        title={test.title}
                        action={
                            <>
                                <IconButton
                                    aria-label="more"
                                    aria-controls={`menu-for-${test.id}`}
                                    aria-haspopup="true"
                                    onClick={(e) => setAnchorEl(e.currentTarget)}
                                >
                                    <MoreVertIcon/>
                                </IconButton>
                                <Menu
                                    id={`menu-for-${test.id}`}
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={() => setAnchorEl(null)}
                                >
                                    <MenuItem
                                        onClick={handleClickOpenDialogEdit}>Редагувати</MenuItem>
                                    <FormTest open={openDialogEdit}
                                              onClose={handleCloseDialogEdit}
                                        // test={outputClassItem}
                                    />
                                    <MenuItem
                                        onClick={handleClickOpenDialogDelete}>Видалити</MenuItem>
                                    <DeleteTest open={openDialogDelete}
                                                onClose={handleCloseDialogDelete} test={test}
                                    />
                                </Menu>
                            </>
                        }
                    />
                    <CardContent>
                        <Box display="flex" alignItems="center">
                            <QueryBuilderIcon style={{marginRight: 10}}/>
                            <Typography
                                sx={{color: 'gray', fontStyle: 'italic', paddingRight: '5px'}}>
                                {'Дата вікриття :'} </Typography>
                            <Typography> {formattedDate(test.start_time)}
                            </Typography>
                        </Box>
                        <Box style={{paddingTop: 5}} display="flex" alignItems="center">
                            <QueryBuilderIcon style={{marginRight: 10}}/>
                            <Typography
                                sx={{color: 'gray', fontStyle: 'italic', paddingRight: '5px'}}>
                                Дата закриття:</Typography>
                            <Typography>
                                {formattedDate(test.end_time)}
                            </Typography>
                        </Box>
                        <Box style={{paddingTop: 5}} display="flex" alignItems="center">
                            <TimerIcon style={{marginRight: 10}}/>
                            <Typography
                                sx={{color: 'gray', fontStyle: 'italic', paddingRight: '5px'}}>
                                Тривалість:</Typography>
                            <Typography> {test.time_limit ? test.time_limit + ' хвилин' : 'Необмежений у часі'}
                            </Typography>
                        </Box>
                        {/*<Accordion>*/}
                        {/*    <AccordionSummary expandIcon={<ExpandMore/>}>*/}
                        {/*        <Typography>Учні:</Typography>*/}
                        {/*    </AccordionSummary>*/}
                        {/*    <AccordionDetails>*/}
                        {/*        <ul style={{listStyleType: "none", padding: 0}}>*/}
                        {/*            {test.students.map((student) => (*/}
                        {/*                <li key={student.id}>*/}
                        {/*                    <Button component={NavLink} to={`/students/${student.id}`}>*/}
                        {/*                        {`${student.first_name} ${student.second_name}`}*/}
                        {/*                    </Button>*/}
                        {/*                </li>*/}
                        {/*            ))}*/}
                        {/*        </ul>*/}
                        {/*    </AccordionDetails>*/}
                        {/*</Accordion>*/}
                    </CardContent>
                </Card>
                {notification && (
                    <Notification notification={!!notification}
                                  handleCloseAlert={handleCloseAlert} hideDuration={3000}
                                  text={notification}/>
                )}
            </Link>
        </>
    )
}