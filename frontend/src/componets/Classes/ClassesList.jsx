import {createTheme, styled, ThemeProvider} from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import styles from "../../styles/Grid.module.css";
import Typography from "@mui/material/Typography";
import {alpha, Button, CircularProgress, InputBase} from "@mui/material";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined.js";
import UserForm from "../Users/UserForm.jsx";
import SearchIcon from "@mui/icons-material/Search.js";
import ClearIcon from "@mui/icons-material/Clear.js";
import Box from "@mui/material/Box";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableSortLabel from "@mui/material/TableSortLabel";
import TableBody from "@mui/material/TableBody";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit.js";
import DeleteIcon from "@mui/icons-material/Delete.js";
import LockPersonRoundedIcon from "@mui/icons-material/LockPersonRounded.js";
import TablePagination from "@mui/material/TablePagination";
import ShowUser from "../Users/ShowUser.jsx";
import DeleteUser from "../Users/DeleteUser.jsx";
import Notification from "../core/Notification.jsx";
import * as locales from "@mui/material/locale";
import {useEffect, useMemo, useState} from "react";
import AddClass from "./AddClass.jsx";
import {SearchIconWrapper, StyledInputBase, Search} from "../../styles/searchStyles.js";
import {searchUsers} from "../../store/user/usersSlice.js";
import {getClasses} from "../../store/class/classesSlice.js";
import {useDispatch, useSelector} from "react-redux";


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


export default function ClassesList() {
    const dispatch = useDispatch();

    const {classes} = useSelector((state) => state.classes)

    const [open, setOpen] = useState(false);

    const [locale, setLocale] = useState('ukUA');
    const themeWithLocale = useMemo(
        () => createTheme(theme, locales[locale]),
        [locale, theme],
    );


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        // console.log(value);
        setOpen(false);
        // if (value) setNotification('Користувач успішно доданий в систему');
        // else setNotification('Форма була закрита без додавання користувача');
    };

    useEffect(() => {
        dispatch(getClasses());
    }, [])

    return (
        <ThemeProvider theme={themeWithLocale}>
            <Grid container justifyContent="space-between"
                  style={{flexWrap: 'wrap', paddingBottom: 5}}
                  className={styles['no-padding-top']}>
                <Grid item xs={6} lg={8} style={{alignItems: 'end', paddingBottom: 5}}
                      className={styles['no-padding-top']}>
                    <Typography component="h2" variant="h6" color="primary" gutterBottom>
                        Класи
                    </Typography>

                </Grid>
                <Grid item xs={6} lg={3} style={{textAlign: 'right', paddingBottom: 5}}
                      className={styles['no-padding-top']}>
                    <Button color="secondary"
                            style={{backgroundColor: theme.palette.secondary.main, color: 'white'}}
                            onClick={handleClickOpen}
                    >
                        <PersonAddAltOutlinedIcon style={{marginRight: 10}}/>
                        СТВОРИТИ КЛАС

                    </Button>
                    <AddClass open={open}
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
                            // onChange={handleSearch}
                            // value={searchValue}
                        />
                    </Search>
                </Grid>
                <Grid item xs={5} lg={3} style={{textAlign: 'right'}}
                      className={styles['no-padding-top']}>
                    <Button color="secondary"
                            style={{backgroundColor: '#676FC9', color: 'white'}}
                        // onClick={onClickReset}
                    >
                        <ClearIcon style={{marginRight: 10}}/>
                        СКИНУТИ
                    </Button>
                </Grid>
            </Grid>
            {/*{isLoading &&*/}
            {/*    <Box sx={{display: 'flex', justifyContent: 'center'}}>*/}
            {/*        <CircularProgress/>*/}
            {/*    </Box>*/}
            {/*}*/}
            {/*{!isLoading &&*/}
            {/*    <>*/}

            {/*        <TablePagination*/}
            {/*            rowsPerPageOptions={[10, 25, 50, 100]}*/}
            {/*            component="div"*/}
            {/*            count={visibleData.length}*/}
            {/*            rowsPerPage={perPage}*/}
            {/*            page={page}*/}
            {/*            onPageChange={handleChangePage}*/}
            {/*            onRowsPerPageChange={handleChangeRowsPerPage}*/}
            {/*        />*/}
            {/*        {showUser !== null && (*/}
            {/*            <ShowUser open={true} onClose={handleShowUserClose} user={showUser}/>*/}
            {/*        )}*/}
            {/*        {editUser !== null && (*/}
            {/*            <UserForm open={!!editUser} onClose={handleEditUserClose} user={editUser}/>*/}
            {/*        )}*/}
            {/*        {deleteUser && (*/}
            {/*            <DeleteUser open={true} onClose={handleDeleteUserClose} user={deleteUser}/>*/}
            {/*        )}*/}
            {/*        {notification && (*/}
            {/*            <Notification notification={!!notification}*/}
            {/*                          handleCloseAlert={handleCloseAlert} hideDuration={3000}*/}
            {/*                          text={notification}/>*/}
            {/*        )}*/}
            {/*    </>*/}
            {/*}*/}
        </ThemeProvider>
    );
}