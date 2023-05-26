import {createTheme, styled, ThemeProvider} from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import styles from "../../styles/Grid.module.css";
import Typography from "@mui/material/Typography";
import {
    alpha,
    Button,
    Card,
    CardContent,
    CircularProgress,
    InputBase, Menu,
    MenuItem
} from "@mui/material";
import React, {useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import TestCard from "./TestCard.jsx";
import Box from "@mui/material/Box";
import {getTestById, searchTest} from "../../store/test/testsSlice.js";
import {useNavigate, useParams} from "react-router-dom";
import {getTests} from "../../store/test/testsSlice.js";
import {theme} from "../../utils/theme.js";
import Paper from "@mui/material/Paper";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder.js";
import {formattedDate} from "../../utils/common.js";
import TimerIcon from "@mui/icons-material/Timer.js";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import KeyOffIcon from '@mui/icons-material/KeyOff';
import KeyIcon from '@mui/icons-material/Key';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import ShortTextIcon from '@mui/icons-material/ShortText';
import QuestionForm from "./QuestionForm.jsx";

export default function TestsEditor() {
    const navigate = useNavigate();
    const {user, userToken} = useSelector((state) => state.currentUser)
    const dispatch = useDispatch();

    const {id} = useParams();

    const {tests, isLoading, visibleData, test} = useSelector((state) => state.tests)
    const [notification, setNotification] = useState(false);

    const [searchValue, setSearchValue] = useState('');

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(6);

    const [openQuestionForm, setOpenQuestionForm] = useState(false);

    const [selectedTaskType, setSelectedTaskType] = useState('');

    const [anchorEl, setAnchorEl] =useState(null);
    const openMenu = Boolean(anchorEl);

    const handleClickOpenQuestionForm = (value) => {
        setSelectedTaskType(value);
        setOpenQuestionForm(true);
        handleCloseMenu();
    };

    const handleClickCloseQuestionForm = () => {
        setOpenQuestionForm(false);
    };
    const handleClickMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

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

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(getTests());
            dispatch(getTestById(id));
        };

        fetchData();
    }, [])

    return (
        <Grid container justifyContent="space-between"
              style={{flexWrap: 'wrap', paddingBottom: 5}}
              className={styles['no-padding-top']} spacing={2}>
            <Grid item xs={12} lg={9}>
                <Paper sx={{padding: '20px'}}>
                    <Typography component="h2" variant="h6" sx={{paddingBottom: '5px'}}> <span
                        style={{color: 'gray'}}>Тест:</span> {test?.title}
                    </Typography>
                    <Box display="flex" alignItems="center">
                        <QueryBuilderIcon style={{marginRight: 10}}/>
                        <Typography
                            sx={{color: 'gray', fontStyle: 'italic', paddingRight: '5px'}}>
                            {'Дата вікриття :'} </Typography>
                        <Typography> {formattedDate(test?.start_time)}
                        </Typography>
                    </Box>
                    <Box style={{paddingTop: 5}} display="flex" alignItems="center">
                        <QueryBuilderIcon style={{marginRight: 10}}/>
                        <Typography
                            sx={{color: 'gray', fontStyle: 'italic', paddingRight: '5px'}}>
                            Дата закриття:</Typography>
                        <Typography>
                            {formattedDate(test?.end_time)}
                        </Typography>
                    </Box>
                    <Box style={{paddingTop: 5}} display="flex" alignItems="center">
                        <TimerIcon style={{marginRight: 10}}/>
                        <Typography
                            sx={{color: 'gray', fontStyle: 'italic', paddingRight: '5px'}}>
                            Тривалість:</Typography>
                        <Typography> {test?.time_limit ? test?.time_limit + ' хвилин' : 'Необмежений у часі'}
                        </Typography>
                    </Box>
                </Paper>
            </Grid>
            <Grid item xs={12} lg={3}>
                <Box display="flex" flexWrap="wrap">
                    <Button
                        color="secondary"
                        style={{
                            backgroundColor: theme.palette.secondary.main,
                            color: 'white',
                            width: '100%'
                        }}
                        // onClick={handleClickOpen}
                        startIcon={<QuestionMarkIcon/>}
                        endIcon={<KeyboardArrowDownIcon/>}
                        variant="contained"
                        disableElevation
                        onClick={handleClickMenu}
                    >
                        Додати нове запитання
                    </Button>
                    <Menu
                        id="fade-menu"
                        MenuListProps={{
                            'aria-labelledby': 'fade-button',
                        }}
                        anchorEl={anchorEl}
                        open={openMenu}
                        onClose={handleCloseMenu}
                        PaperProps={{
                            style: {// Встановлює ширину на 100%
                            },
                        }}
                    >
                        <MenuItem   onClick={()=>handleClickOpenQuestionForm('single-answer')} disableRipple>
                            <RadioButtonCheckedIcon sx={{ marginRight: '8px' }}/>
                            З однією правильною відовіддю
                        </MenuItem>
                        <MenuItem onClick={()=>handleClickOpenQuestionForm('multiple-answers')} disableRipple>
                            <FormatListBulletedIcon sx={{ marginRight: '8px' }}/>
                            З кількома правильними відповідями
                        </MenuItem>
                        <MenuItem onClick={()=>handleClickOpenQuestionForm('matching')} disableRipple>
                            <SyncAltIcon sx={{ marginRight: '8px' }}/>
                            На встановлення відповідності
                        </MenuItem>
                        <MenuItem onClick={()=>handleClickOpenQuestionForm('short-answer')} disableRipple>
                            <ShortTextIcon sx={{ marginRight: '8px' }}/>
                            Коротка відповідь
                        </MenuItem>
                    </Menu>
                    <QuestionForm open={openQuestionForm}
                              onClose={handleClickCloseQuestionForm} type={selectedTaskType}/>
                    <Button
                        color="primary"
                        style={{
                            backgroundColor: theme.palette.secondary.main,
                            color: 'white',
                            marginTop: 10,
                            width: '100%'

                        }}
                        startIcon={<LockPersonIcon/>}
                        // onClick={handleClickOpen}
                    >
                        Керувати доступом
                    </Button>
                    <Button
                        variant="contained"
                        style={{
                            marginTop: 10,
                            width: '100%',
                            backgroundColor: test?.is_active === 0 ? 'green' : 'red'
                        }}
                        startIcon={test?.is_active === 0 ? <KeyIcon/> : <KeyOffIcon/>}
                    >
                        Активувати тест
                    </Button>
                </Box>
            </Grid>
        </Grid>
        // {isLoading &&
        //     <Box sx={{display: 'flex', justifyContent: 'center'}}>
        //         <CircularProgress/>
        //     </Box>
        // }
        // {!isLoading &&
        //     <>
        //         <div style={{maxWidth: '100px'}} dangerouslySetInnerHTML={{__html: text}}/>
        //         <Grid container spacing={2}>
        //             {displayedTests.map((test) => (
        //                 <Grid key={test.id} item xs={12} sm={6} md={6}>
        //                     <TestCard test={test} onDelete={handleDelete}/>
        //                 </Grid>
        //             ))}
        //         </Grid>
        //         <TablePagination
        //             rowsPerPageOptions={[6, 12, 24, 68]}
        //             component="div"
        //             count={tests.length}
        //             page={page}
        //             onPageChange={handleChangePage}
        //             rowsPerPage={rowsPerPage}
        //             onRowsPerPageChange={handleChangeRowsPerPage}
        //             labelRowsPerPage="Кількість на сторінці:"
        //         />
        //         {notification && (
        //             <Notification notification={!!notification}
        //                           handleCloseAlert={handleCloseAlert} hideDuration={3000}
        //                           text={notification}/>
        //         )}
        //     </>
        // }
    );
}