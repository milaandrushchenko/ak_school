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
import {formattedDate, time_converter} from "../../utils/common.js";
import Box from "@mui/material/Box";

export default function TestCard({test, onDelete}) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [openDialogEdit, setOpenDialogEdit] = useState(false);
    const [openDialogDelete, setOpenDialogDelete] = useState(false);

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
                        <Box display="flex" flexWrap="wrap" alignItems="center">
                            <QueryBuilderIcon style={{marginRight: 10}}/>
                            <Typography
                                sx={{color: 'gray', fontStyle: 'italic', paddingRight: '5px'}}>
                                {'Дата вікриття :'} <span
                                style={{color: 'black'}}> {test.start_time ? formattedDate(test.start_time) : 'не зазначено'}</span> </Typography>
                        </Box>
                        <Box display="flex" flexWrap="wrap" alignItems="center">
                            <QueryBuilderIcon style={{marginRight: 10}}/>
                            <Typography
                                sx={{color: 'gray', fontStyle: 'italic', paddingRight: '5px'}}>
                                {'Дата закриття :'} <span
                                style={{color: 'black'}}> {test.end_time ? formattedDate(test.end_time) : 'не зазначено'}</span> </Typography>
                        </Box>
                        <Box display="flex" flexWrap="wrap" alignItems="center">
                            <QueryBuilderIcon style={{marginRight: 10}}/>
                            <Typography
                                sx={{color: 'gray', fontStyle: 'italic', paddingRight: '5px'}}>
                                {'Тривалість :'} <span
                                style={{color: 'black'}}>{test.time_limit ? test.time_limit + ' хвилин' : 'необмежений у часі'}</span> </Typography>
                        </Box>
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
            </Link>
        </>
    )
}