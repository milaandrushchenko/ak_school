import {createTheme, styled, ThemeProvider} from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import styles from "../../styles/Grid.module.css";
import Typography from "@mui/material/Typography";
import {alpha, Button, Card, CardContent, CircularProgress, InputBase} from "@mui/material";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined.js";
import SearchIcon from "@mui/icons-material/Search.js";
import ClearIcon from "@mui/icons-material/Clear.js";
import TablePagination from "@mui/material/TablePagination";
import React, {useEffect, useMemo, useState} from "react";
import {SearchIconWrapper, StyledInputBase, Search} from "../../styles/searchStyles.js";
import {useDispatch, useSelector} from "react-redux";
import TestCard from "./TestCard.jsx";
import Box from "@mui/material/Box";
import Notification from "../core/Notification.jsx";
import FormTest from "./FormTest.jsx";
import {fetchStudentsWithoutClass, searchUsers} from "../../store/user/usersSlice.js";
import {searchTest} from "../../store/test/testsSlice.js";
import {useNavigate} from "react-router-dom";
import {getTests} from "../../store/test/testsSlice.js";
import {theme} from "../../utils/theme.js";


export default function TestsList() {
    const navigate = useNavigate();
    const {user, userToken} = useSelector((state) => state.currentUser)
    const dispatch = useDispatch();

    const {tests, isLoading, visibleData} = useSelector((state) => state.tests)

    const [notification, setNotification] = useState(false);

    const [open, setOpen] = useState(false);

    const [searchValue, setSearchValue] = useState('');

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(6);

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setNotification(false);
    };

    const handleSearch = (event) => {
        setSearchValue(event.target.value);
    };
    const onClickReset = () => {
        setSearchValue('');
    };


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleDelete = () => {
        setNotification('Клас був успішно видалений');
    }


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
        if (value) setNotification('Тест успішно доданий в систему');
    };

    const displayedTests = visibleData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    useEffect(() => {
        dispatch(searchTest(searchValue));
    }, [searchValue])

    useEffect(() => {
        dispatch(getTests());
    }, [])

    return (
        <>
            <Grid container justifyContent="space-between"
                  style={{flexWrap: 'wrap', paddingBottom: 5}}
                  className={styles['no-padding-top']}>
                <Grid item xs={6} lg={8} style={{alignItems: 'end', paddingBottom: 5}}
                      className={styles['no-padding-top']}>
                    <Typography component="h2" variant="h4" color="primary" py="30px" gutterBottom>
                        Мої тести
                    </Typography>

                </Grid>

                <Grid item xs={6} lg={3} style={{textAlign: 'right', paddingBottom: 5}}
                      className={styles['no-padding-top']}>
                    {user.permissions?.includes("create tests") && <Button color="secondary"
                                                                           style={{
                                                                               backgroundColor: theme.palette.secondary.main,
                                                                               color: 'white'
                                                                           }}
                                                                           onClick={handleClickOpen}
                    >
                        <PersonAddAltOutlinedIcon style={{marginRight: 10}}/>
                        СТВОРИТИ НОВИЙ ТЕСТ

                    </Button>}
                    <FormTest open={open}
                              onClose={handleClose}

                    />
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
                            onClick={onClickReset}
                    >
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
                    <Grid container spacing={2}>
                        {displayedTests.map((test) => (
                            <Grid key={test.id} item xs={12} sm={6} md={6}>
                                <TestCard test={test} onDelete={handleDelete}/>
                            </Grid>
                        ))}
                    </Grid>
                    <TablePagination
                        rowsPerPageOptions={[6, 12, 24, 68]}
                        component="div"
                        count={tests.length}
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        labelRowsPerPage="Кількість на сторінці:"
                    />

                    {notification && (
                        <Notification notification={!!notification}
                                      handleCloseAlert={handleCloseAlert} hideDuration={3000}
                                      text={notification}/>
                    )}
                </>
            }
        </>
    );
}