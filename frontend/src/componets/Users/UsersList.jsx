import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableSortLabel from '@mui/material/TableSortLabel';
import {useEffect, useMemo, useState} from "react";
import Typography from "@mui/material/Typography";
import * as locales from '@mui/material/locale';
import {
    alpha,
    AppBar,
    Button,
    CircularProgress,
    FormControl, InputBase,
    InputLabel,
    MenuItem,
    Pagination,
    Select
} from "@mui/material";
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
import SearchIcon from '@mui/icons-material/Search';
import {getUsers, searchUsers, sortUsers} from "../../store/user/usersSlice.js";
import {useDispatch, useSelector} from "react-redux";
import {createTheme, styled, ThemeProvider} from "@mui/material/styles";
import Box from "@mui/material/Box";
import TablePagination from "@mui/material/TablePagination";
import {getComparator, stableSort} from "../../utils/filtering.js";
import ClearIcon from '@mui/icons-material/Clear';
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";

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

const Search = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.25),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        // marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '15ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));
export default function UsersList() {
    const dispatch = useDispatch();

    const {users, visibleData, meta, isLoading} = useSelector((state) => state.users)

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

    const handleSortRequest = (column) => {
        const isAsc = orderBy === column && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(column);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
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
        dispatch(getUsers());
    }, [])

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
                        Users
                    </Typography>

                </Grid>
                <Grid item xs={6} lg={3} style={{textAlign: 'right', paddingBottom: 5}}
                      className={styles['no-padding-top']}>
                    <Button color="secondary"
                            style={{backgroundColor: theme.palette.secondary.main, color: 'white'}}
                            onClick={handleClickOpen}>
                        <PersonAddAltOutlinedIcon style={{marginRight: 10}}/>
                        CREATE USER

                    </Button>
                    <AddUser open={open}
                             onClose={handleClose}/>
                </Grid>
                <Grid item xs={7} lg={2} style={{alignItems: 'end', paddingBottom: 5}}
                      className={styles['no-padding-top']}>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon/>
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search for users …"
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
                        RESET
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
                                            LOGIN
                                        </TableSortLabel>
                                    </TableCell>
                                    <TableCell align="right">
                                        <TableSortLabel
                                            active={orderBy === 'first_name'}
                                            direction={orderBy === 'first_name' ? order : 'asc'}
                                            onClick={() => handleSortRequest('first_name')}
                                        >
                                            FIRST NAME
                                        </TableSortLabel>
                                    </TableCell>
                                    <TableCell align="right">
                                        <TableSortLabel
                                            active={orderBy === 'second_name'}
                                            direction={orderBy === 'second_name' ? order : 'asc'}
                                            onClick={() => handleSortRequest('second_name')}
                                        >
                                            SECOND NAME
                                        </TableSortLabel>
                                    </TableCell>
                                    <TableCell align="right">ROLE</TableCell>
                                    <TableCell align="right">STATUS</TableCell>
                                    <TableCell align="right">
                                        <TableSortLabel
                                            active={orderBy === 'created_at'}
                                            direction={orderBy === 'created_at' ? order : 'asc'}
                                            onClick={() => handleSortRequest('created_at')}
                                        >
                                            ADDED
                                        </TableSortLabel>
                                    </TableCell>
                                    <TableCell align="right">ACTIONS</TableCell>
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
                                                <NavLink to={`/`} style={{textDecoration: 'none'}}>
                                                    <IconButton size="small" color="primary">
                                                        <EditIcon/>
                                                    </IconButton>
                                                </NavLink>
                                                <NavLink to={`/`} style={{textDecoration: 'none'}}>
                                                    <IconButton size="small" color="primary">
                                                        <DeleteIcon/>
                                                    </IconButton>
                                                </NavLink><NavLink to={`/`}
                                                                   style={{textDecoration: 'none'}}>
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
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 50, 100]}
                        component="div"
                        count={visibleData.length}
                        rowsPerPage={perPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </>
            }
        </ThemeProvider>
    );
}