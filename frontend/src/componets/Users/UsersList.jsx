import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import {useEffect, useMemo, useState} from "react";
import Typography from "@mui/material/Typography";
import * as locales from '@mui/material/locale';
import {
    alpha,
    Button,
    CircularProgress, InputBase,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import styles from '../../styles/Grid.module.css';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import LockPersonRoundedIcon from "@mui/icons-material/LockPersonRounded";
import SearchIcon from '@mui/icons-material/Search';
import {getUsers, searchUsers, sortUsers} from "../../store/user/usersSlice.js";
import {useDispatch, useSelector} from "react-redux";
import {createTheme, styled, ThemeProvider} from "@mui/material/styles";
import Box from "@mui/material/Box";
import TablePagination from "@mui/material/TablePagination";
import ClearIcon from '@mui/icons-material/Clear';
import ShowUser from "./ShowUser.jsx";
import UserForm from "./UserForm.jsx";
import DeleteUser from "./DeleteUser.jsx";
import Notification from "../core/Notification.jsx";
import {useNavigate} from "react-router-dom";
import {SearchIconWrapper, StyledInputBase, Search} from "../../styles/searchStyles.js";

const theme = createTheme({
    palette: {
        primary: {
            main: '#1a237e',
        },
        secondary: {
            main: '#2A38C9',
        },
    },
});

export default function UsersList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {users, visibleData, meta, isLoading} = useSelector((state) => state.users)
    const {user, userToken} = useSelector((state) => state.currentUser)

    const hasPermission = user.permissions?.includes("show users");

    useEffect(() => {
        if (!userToken || !hasPermission) {
            navigate("/");
        }
    }, [userToken, hasPermission, navigate]);

    const [orderBy, setOrderBy] = useState('');
    const [order, setOrder] = useState('asc');

    const [searchValue, setSearchValue] = useState('');

    const [open, setOpen] = useState(false);
    const [perPage, setPerPage] = useState(10);
    const [page, setPage] = useState(0);

    const [locale, setLocale] = useState('ukUA');
    const themeWithLocale = useMemo(
        () => createTheme(theme, locales[locale]),
        [locale, theme],
    );

    const [showUser, setShowUser] = useState(null);
    const [editUser, setEditUser] = useState(null);
    const [deleteUser, setDeleteUser] = useState(null);

    const [notification, setNotification] = useState(false);
    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setNotification(false);
    };
    const handleDeleteUserOpen = (user) => {
        // Логіка видалення користувача
        setDeleteUser(user);
    };

    function handleDeleteUserClose(value, user = '') {
        setDeleteUser(null);
        if (value) setNotification(`Користувач ${user} успішно видалений`);
    }

    function handleShowUserOpen(user) {
        setShowUser(user);
    }

    function handleShowUserClose() {
        setShowUser(null);
    }

    function handleEditUserOpen(user) {
        setEditUser(user);

    }

    function handleEditUserClose(value) {
        setEditUser(null);
        if (value) setNotification('Дані користувача оновлено');
    }

    const handleSortRequest = (column) => {
        const isAsc = orderBy === column && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(column);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
        if (value) setNotification('Користувач успішно доданий в систему');
        // else setNotification('Форма була закрита без додавання користувача');
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    //search
    const handleSearch = (event) => {
        setSearchValue(event.target.value);
    };
    const onClickReset = () => {
        setSearchValue('');
    };


    useEffect(() => {
        dispatch(searchUsers(searchValue));
    }, [searchValue])

    useEffect(() => {
        dispatch(sortUsers({order, orderBy}));
    }, [order, orderBy])

    return (
        <ThemeProvider theme={themeWithLocale}>
            <Grid container justifyContent="space-between"
                  style={{flexWrap: 'wrap', paddingBottom: 5}}
                  className={styles['no-padding-top']}>
                <Grid item xs={6} lg={8} style={{alignItems: 'end', paddingBottom: 5}}
                      className={styles['no-padding-top']}>
                    <Typography component="h2" variant="h6" color="primary" gutterBottom>
                        Користувачі
                    </Typography>

                </Grid>
                <Grid item xs={6} lg={3} style={{textAlign: 'right', paddingBottom: 5}}
                      className={styles['no-padding-top']}>
                    <Button color="secondary"
                            style={{backgroundColor: theme.palette.secondary.main, color: 'white'}}
                            onClick={handleClickOpen}>
                        <PersonAddAltOutlinedIcon style={{marginRight: 10}}/>
                        СТВОРИТИ КОРИСТУВАЧА

                    </Button>
                    <UserForm open={open}
                              onClose={handleClose}/>
                </Grid>
                <Grid item xs={7} lg={2} style={{alignItems: 'end', paddingBottom: 5}}
                      className={styles['no-padding-top']}>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon/>
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Пошук..."
                            inputProps={{'aria-label': 'search'}}
                            onChange={handleSearch}
                            value={searchValue}
                        />
                    </Search>
                </Grid>
                <Grid item xs={5} lg={3} style={{textAlign: 'right'}}
                      className={styles['no-padding-top']}>
                    <Button color="secondary"
                            style={{backgroundColor: '#676FC9', color: 'white'}}
                            onClick={onClickReset}>
                        <ClearIcon style={{marginRight: 10}}/>
                        СКИНУТИ
                    </Button>
                </Grid>
            </Grid>
            {isLoading &&
                <Box sx={{display: 'flex', justifyContent: 'center'}}>
                    <CircularProgress/>
                </Box>
            }
            {!isLoading &&
                <>
                    <TableContainer>
                        <Table sx={{minWidth: 650}} aria-label="simple table">
                            <TableHead>
                                <TableRow style={{backgroundColor: '#E2E4EF'}}>
                                    <TableCell>№</TableCell>
                                    <TableCell align="right">
                                        <TableSortLabel
                                            active={orderBy === 'login'}
                                            direction={orderBy === 'login' ? order : 'asc'}
                                            onClick={() => handleSortRequest('login')}
                                        >
                                            ЛОГІН
                                        </TableSortLabel>
                                    </TableCell>
                                    <TableCell align="right">
                                        <TableSortLabel
                                            active={orderBy === 'first_name'}
                                            direction={orderBy === 'first_name' ? order : 'asc'}
                                            onClick={() => handleSortRequest('first_name')}
                                        >
                                            ІМ'Я
                                        </TableSortLabel>
                                    </TableCell>
                                    <TableCell align="right">
                                        <TableSortLabel
                                            active={orderBy === 'second_name'}
                                            direction={orderBy === 'second_name' ? order : 'asc'}
                                            onClick={() => handleSortRequest('second_name')}
                                        >
                                            ПРІЗВИЩЕ
                                        </TableSortLabel>
                                    </TableCell>
                                    <TableCell align="right">РОЛЬ</TableCell>
                                    <TableCell align="right">СТАТУС</TableCell>
                                    <TableCell align="right">
                                        <TableSortLabel
                                            active={orderBy === 'created_at'}
                                            direction={orderBy === 'created_at' ? order : 'asc'}
                                            onClick={() => handleSortRequest('created_at')}
                                        >
                                            ДОДАНО
                                        </TableSortLabel>
                                    </TableCell>
                                    <TableCell align="right">ДІЇ</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {visibleData
                                    .slice(page * perPage, page * perPage + perPage)
                                    .map((user, i) => (
                                        <TableRow
                                            key={user.id}
                                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                        >
                                            <TableCell component="th" scope="row">
                                                {(page * perPage + i + 1)}
                                            </TableCell>
                                            <TableCell align="right">
                                                {user.login}
                                            </TableCell>
                                            <TableCell align="right">{user.first_name}</TableCell>
                                            <TableCell align="right">{user.second_name}</TableCell>
                                            <TableCell align="right">{user.role}</TableCell>
                                            <TableCell align="right" style={{}}>
                                    <span
                                        style={{
                                            backgroundColor: `${user.status.backgroundColor}`,
                                            color: `${user.status.color}`,
                                            display: "block",
                                            textAlign: 'center',
                                            width: 65,
                                            borderRadius: 5,
                                            float: 'right'
                                        }}>{user.status.title}</span>
                                            </TableCell>
                                            <TableCell align="right">{user.created_at}</TableCell>
                                            <TableCell align="right">
                                                <IconButton size="small" color="primary"
                                                            onClick={() => handleEditUserOpen(user)}>
                                                    <EditIcon/>
                                                </IconButton>
                                                <IconButton size="small" color="primary"
                                                            onClick={() => handleDeleteUserOpen(user)}>
                                                    <DeleteIcon/>
                                                </IconButton>
                                                <IconButton size="small" color="primary"
                                                            onClick={() => handleShowUserOpen(user)}>
                                                    <LockPersonRoundedIcon/>

                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 50, 100]}
                        component="div"
                        count={visibleData.length}
                        rowsPerPage={perPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                    {showUser !== null && (
                        <ShowUser open={true} onClose={handleShowUserClose} user={showUser}/>
                    )}
                    {editUser !== null && (
                        <UserForm open={!!editUser} onClose={handleEditUserClose} user={editUser}/>
                    )}
                    {deleteUser && (
                        <DeleteUser open={true} onClose={handleDeleteUserClose} user={deleteUser}/>
                    )}
                    {notification && (
                        <Notification notification={!!notification}
                                      handleCloseAlert={handleCloseAlert} hideDuration={3000}
                                      text={notification}/>
                    )}
                </>
            }
        </ThemeProvider>
    );
}