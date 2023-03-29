import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableSortLabel from '@mui/material/TableSortLabel';
import {useState} from "react";
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

function createData(name, calories, fat, carbs, protein) {
    return {name, calories, fat, carbs, protein};
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

function Item(props) {
    return null;
}

Item.propTypes = {children: PropTypes.node};
export default function UsersList() {
    const [open, setOpen] = useState(false);
    const [rowData, setRowData] = useState(rows);
    const [orderDirection, setOrderDirection] = useState("asc");

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
                        {rows.map((row,i) => (
                            <TableRow
                                key={row.name}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row">
                                    {i+1}
                                </TableCell><TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.calories}</TableCell>
                                <TableCell align="right">{row.fat}</TableCell>
                                <TableCell align="right">{row.carbs}</TableCell>
                                <TableCell align="right">{row.protein}</TableCell>
                                <TableCell align="right">28 March</TableCell>
                                <TableCell align="right">
                                    <NavLink to={`/`} style={{ textDecoration: 'none' }}>
                                        <IconButton size="small" color="primary">
                                            <EditIcon />
                                        </IconButton>
                                    </NavLink>
                                    <NavLink to={`/`} style={{ textDecoration: 'none' }}>
                                        <IconButton size="small" color="primary">
                                            <DeleteIcon />
                                        </IconButton>
                                    </NavLink><NavLink to={`/`} style={{ textDecoration: 'none' }}>
                                        <IconButton size="small" color="primary">
                                            <LockPersonRoundedIcon />
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