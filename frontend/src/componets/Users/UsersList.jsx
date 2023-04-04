import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableSortLabel from '@mui/material/TableSortLabel';
import {useEffect, useState} from "react";
import Typography from "@mui/material/Typography";
import {Button} from "@mui/material";
import Grid from "@mui/material/Grid";
import * as PropTypes from "prop-types";
import styles from '../../styles/Grid.module.css';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import EditIcon from '@mui/icons-material/Edit';
import AddUser from "./AddUser.jsx";
import {NavLink} from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import LockPersonRoundedIcon from "@mui/icons-material/LockPersonRounded";
import {getUsers} from "../../store/user/usersSlice.js";
import {useDispatch, useSelector} from "react-redux";

function Item(props) {
    return null;
}

Item.propTypes = {children: PropTypes.node};
export default function UsersList() {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [orderDirection, setOrderDirection] = useState("asc");

    const users = useSelector((state) => state.user.users)

    console.log(users);
    const sortArray = (arr, orderBy) => {
        switch (orderBy) {
            case "asc":
            default:
                return arr.sort((a, b) =>
                    a.name > b.name ? 1 : b.name > a.name ? -1 : 0
                );
            case "desc":
                return arr.sort((a, b) =>
                    a.name < b.name ? 1 : b.name < a.name ? -1 : 0
                );
        }
    };

    const handleSortRequest = () => {
        setRowData(sortArray(rows, orderDirection));
        setOrderDirection(orderDirection === "asc" ? "desc" : "asc");
    };


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        dispatch(getUsers());
    }, [])

    return (
        <>
            <Grid container spacing={2} justifyContent="space-between"
                  style={{flexWrap: 'wrap', padding: 10}} className={styles['no-padding-top']}>
                <Grid item xs={12} lg={8} style={{alignItems: 'end'}}
                      className={styles['no-padding-top']}>
                    <Typography component="h2" variant="h6" color="primary" gutterBottom>
                        Users
                    </Typography>
                </Grid>
                <Grid item xs={12} lg={3} style={{textAlign: 'right'}}
                      className={styles['no-padding-top']}>
                    <Button style={{backgroundColor: '#1e88e5', color: 'white'}}
                            onClick={handleClickOpen}>
                        <PersonAddAltOutlinedIcon style={{marginRight: 10}}/>
                        CREATE USER

                    </Button>
                    <AddUser open={open}
                             onClose={handleClose}/>
                </Grid>
            </Grid>
            <TableContainer>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow style={{backgroundColor: '#E2E4EF'}}>
                            <TableCell>№</TableCell>
                            <TableCell>LOGIN</TableCell>
                            <TableCell align="right">FIRST NAME</TableCell>
                            <TableCell align="right">SECOND NAME</TableCell>
                            <TableCell align="right">ROLE</TableCell>
                            <TableCell align="right">STATUS</TableCell>
                            <TableCell align="right">ADDED</TableCell>
                            <TableCell align="right">ACTIONS</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users?.map((user, i) => (
                            <TableRow
                                key={i}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row">
                                    {i + 1}
                                </TableCell><TableCell component="th" scope="row">
                                {user.login}
                            </TableCell>
                                <TableCell align="right">{user.first_name}</TableCell>
                                <TableCell align="right">{user.second_name}</TableCell>
                                <TableCell align="right">{user.role}</TableCell>
                                <TableCell align="right" style={{}}>
                                    <span
                                        style={{
                                            backgroundColor: '#aee6eb',
                                            color:'#00aec1',
                                            display: "block",
                                            textAlign:'center',
                                            width: 65,
                                            borderRadius: 5,
                                            float: 'right'
                                        }}>{user.status}</span></TableCell>
                                <TableCell align="right">{user.created_at}</TableCell>
                                <TableCell align="right">
                                    <NavLink to={`/`} style={{textDecoration: 'none'}}>
                                        <IconButton size="small" color="primary">
                                            <EditIcon/>
                                        </IconButton>
                                    </NavLink>
                                    <NavLink to={`/`} style={{textDecoration: 'none'}}>
                                        <IconButton size="small" color="primary">
                                            <DeleteIcon/>
                                        </IconButton>
                                    </NavLink><NavLink to={`/`} style={{textDecoration: 'none'}}>
                                    <IconButton size="small" color="primary">
                                        <LockPersonRoundedIcon/>
                                    </IconButton>
                                </NavLink>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}