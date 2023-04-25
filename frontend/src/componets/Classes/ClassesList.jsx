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
import ClassCard from "./ClassCard.jsx";
import Box from "@mui/material/Box";
import Notification from "../core/Notification.jsx";
import FormClass from "./FormClass.jsx";


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

    const {classes, isLoading} = useSelector((state) => state.classes)

    const [notification, setNotification] = useState(false);

    const [open, setOpen] = useState(false);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(6);

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setNotification(false);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
        if (value) setNotification('Клас успішно доданий в систему');
    };

    const displayedClasses = classes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <ThemeProvider theme={theme}>
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
                            style={{
                                backgroundColor: theme.palette.secondary.main,
                                color: 'white'
                            }}
                            onClick={handleClickOpen}
                    >
                        <PersonAddAltOutlinedIcon style={{marginRight: 10}}/>
                        СТВОРИТИ КЛАС

                    </Button>
                    <FormClass open={open}
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
            {isLoading &&
                <Box sx={{display: 'flex', justifyContent: 'center'}}>
                    <CircularProgress/>
                </Box>
            }
            {!isLoading &&
                <>
                    <Grid container spacing={2}>
                        {displayedClasses.map((classItem) => (
                            <Grid key={classItem.id} item xs={12} sm={6} md={4}>
                                <ClassCard classItem={classItem}/>
                            </Grid>
                        ))}
                    </Grid>
                    <TablePagination
                        rowsPerPageOptions={[6, 12, 24, 68]}
                        component="div"
                        count={classes.length}
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
        </ThemeProvider>
    );
}