import Grid from "@mui/material/Grid";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import SubjectCard from "./SubjectCard.jsx";
import {useNavigate} from "react-router-dom";
import {searchSubject} from "../../store/subject/subjectsSlice.js";
import Typography from "@mui/material/Typography";
import styles from "../../styles/Grid.module.css";
import {Button, CircularProgress} from "@mui/material";
import {theme} from "../../utils/theme.js";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined.js";
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import FormClass from "../Classes/FormClass.jsx";
import FormSubject from "./FormSubject";
import {Search, SearchIconWrapper, StyledInputBase} from "../../styles/searchStyles.js";
import SearchIcon from "@mui/icons-material/Search.js";
import ClearIcon from "@mui/icons-material/Clear.js";
import TablePagination from "@mui/material/TablePagination";
import Notification from "../core/Notification.jsx";
import Box from "@mui/material/Box";


const SubjectsList = () => {
    const dispatch = useDispatch();

    const {user, userToken} = useSelector((state) => state.currentUser)
    const {subjects, isLoading, visibleData} = useSelector((state) => state.subjects)
    const [notification, setNotification] = useState(false);
    const [open, setOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(9);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {return;}
        setNotification(false);
    };
    const handleSearch = (event) => {
        setSearchValue(event.target.value);
    };
    const onClickReset = () => {
        setSearchValue('');
    };
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = (value) => {
        setOpen(false);
        if (value) setNotification('Предмет успішно додано!');
    };

    const displayedSubjects = visibleData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    useEffect(() => {
        dispatch(searchSubject(searchValue));
    }, [searchValue])



    return (
        <>
            <Grid container justifyContent="space-between"
                  style={{flexWrap: 'wrap', paddingBottom: 5}}
                  className={styles['no-padding-top']}>
                <Grid item xs={6} lg={8} style={{alignItems: 'end', paddingBottom: 5}}
                      className={styles['no-padding-top']}>
                    <Typography component="h2" variant="h4" color="primary" py="30px" gutterBottom>
                        ПРЕДМЕТИ
                    </Typography>
                </Grid>

                <Grid item xs={6} lg={3} style={{textAlign: 'right', paddingBottom: 5}}
                      className={styles['no-padding-top']}>
                    {user.permissions?.includes("create classes") &&
                        <Button color="secondary"
                                style={{ backgroundColor: theme.palette.secondary.main, color: 'white' }}
                                onClick={handleClickOpen}>
                            <AddToPhotosIcon style={{marginRight: 10}}/>
                            ДОДАТИ ПРЕДМЕТ
                        </Button>
                    }
                    <FormSubject open={open}
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
                    <Button style={{backgroundColor: '#b3b7d7', color: 'white'}}
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
                        {displayedSubjects.map((subject) => (
                            <Grid key={subject.id} item xs={12} sm={6} md={4}>
                                <SubjectCard subjectItem={subject}/>
                            </Grid>
                        ))}
                    </Grid>
                    <TablePagination
                        rowsPerPageOptions={[9, 21, 33, 45]}
                        component="div"
                        count={subjects.length}
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

export default SubjectsList;