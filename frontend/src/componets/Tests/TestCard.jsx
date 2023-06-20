import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Card, CardActions,
    CardContent, CardHeader, Chip,
    ListItem, Menu, MenuItem, Stack
} from "@mui/material";
import Typography from "@mui/material/Typography";
import {Edit, ExpandMore} from "@mui/icons-material";
import Button from "@mui/material/Button";
import {Link, NavLink} from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import HelpIcon from '@mui/icons-material/Help';
import React, {useState} from "react";
import DeleteTest from "./DeleteTest.jsx";
import FormTest from "./FormTest.jsx";
import Notification from "../core/Notification.jsx";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import TimerIcon from '@mui/icons-material/Timer';
import {formattedDate, time_converter} from "../../utils/common.js";
import Box from "@mui/material/Box";
import dayjs from "dayjs";
import {useSelector} from "react-redux";

export default function TestCard({test, onDelete}) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [openDialogEdit, setOpenDialogEdit] = useState(false);
    const [openDialogDelete, setOpenDialogDelete] = useState(false);

    const {user} = useSelector((state) => state.currentUser)


    const handleClickOpenDialogEdit = () => {
        event.stopPropagation();
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

    const handleMenuOpen = (event) => {
        event.preventDefault();
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = (event) => {
        event.preventDefault();
        setAnchorEl(null);
    };

    const outputTest = test ? {
        id: test.id,
        title: test.title,
        start_time: test.start_time ? dayjs(test.start_time) : null,
        end_time: test.end_time ? dayjs(test.end_time) : null,
        max_attempts: test.max_attempts,
        access_type: test.access_type,
        is_active: test.is_active,
        subject_ids: test.subjects?.map(subject => subject.id),
        time_limit: test.time_limit,
        result_display_type: test.result_display_type,
    } : null;

    return (
        <>
            {/*<Link to={`/tests/${test.id}`} style={{textDecoration: 'none'}}>*/}
            <Card sx={{height: '100%'}}>
                <CardHeader
                    title={<NavLink to={`/tests/${test.id}`} style={{color: '#1a237e'}}>
                        {test.title}
                    </NavLink>
                    }
                    action={
                        <>
                            <IconButton
                                aria-label="more"
                                aria-controls={`menu-for-${test.id}`}
                                aria-haspopup="true"
                                onClick={handleMenuOpen}
                            >
                                <MoreVertIcon/>
                            </IconButton>
                            <Menu
                                id={`menu-for-${test.id}`}
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleMenuClose}
                            >
                                <MenuItem
                                    onClick={handleClickOpenDialogEdit}>Редагувати</MenuItem>
                                <FormTest open={openDialogEdit}
                                          onClose={handleCloseDialogEdit}
                                          test={outputTest}
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
                    <Stack sx={{mb: '5px'}}>
                        {user.role === 'admin' &&
                            <Box display="flex" alignItems="center">
                                <Typography fontWeight="bold">Власник:</Typography>

                                <Typography>
                                    <Button component={NavLink} to={`/students/${test.teacher.id}`}>
                                        {`${test.teacher.first_name} ${test.teacher.second_name}`}
                                    </Button>
                                </Typography>
                            </Box>
                        }
                        <Box display="flex" alignItems="center">
                            <HelpIcon style={{marginRight: 10}}/>
                            <Typography
                                sx={{
                                    color: 'gray',
                                    fontStyle: 'italic',
                                    paddingRight: '5px'
                                }}>
                                {'Кількість запитань :'} <span
                                style={{color: 'black'}}>{test.questions?.length}</span>
                            </Typography>
                        </Box>
                        <Box display="flex" alignItems="center">
                            <QueryBuilderIcon style={{marginRight: 10}}/>
                            <Typography
                                sx={{color: 'gray', fontStyle: 'italic', paddingRight: '5px'}}>
                                {'Дата вікриття :'} <span
                                style={{color: 'black'}}> {test.start_time ? formattedDate(test.start_time) : 'не зазначено'}</span>
                            </Typography>
                        </Box>
                        <Box display="flex" alignItems="center">
                            <QueryBuilderIcon style={{marginRight: 10}}/>
                            <Typography
                                sx={{color: 'gray', fontStyle: 'italic', paddingRight: '5px'}}>
                                {'Дата закриття :'} <span
                                style={{color: 'black'}}> {test.end_time ? formattedDate(test.end_time) : 'не зазначено'}</span>
                            </Typography>
                        </Box>
                        <Box display="flex" alignItems="center">
                            <TimerIcon style={{marginRight: 10}}/>
                            <Typography
                                sx={{color: 'gray', fontStyle: 'italic', paddingRight: '5px'}}>
                                {'Тривалість :'} <span
                                style={{color: 'black'}}>{test.time_limit ? test.time_limit + ' хвилин' : 'необмежений у часі'}</span>
                            </Typography>
                        </Box>
                    </Stack>
                    <Stack direction="row" spacing={1}>
                        {user.role === 'admin' || user.role === "teacher" ? test.subjects?.map((subject) => {
                            return (
                                <Chip key={subject?.id} label={subject?.name} color="primary"/>
                            )
                        }) : ''}
                    </Stack>
                    <Typography style={{
                        fontSize: "0.8em",
                        color: "grey",
                        top: "10px",
                        position: "relative"
                    }}>
                        Створено: {test.created_at}
                    </Typography>
                </CardContent>
            </Card>
            {/*</Link>*/}
        </>
    )
}