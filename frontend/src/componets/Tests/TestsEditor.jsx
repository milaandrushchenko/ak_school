import Grid from "@mui/material/Grid";
import styles from "../../styles/Grid.module.css";
import Typography from "@mui/material/Typography";
import {
    Button,
    CircularProgress,
    InputBase, Menu,
    MenuItem, Tab, Tabs
} from "@mui/material";
import React, {useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import TestCard from "./TestCard.jsx";
import Box from "@mui/material/Box";
import {
    changeTestStatus,
    getTestById,
    searchTest,
    updateTest
} from "../../store/test/testsSlice.js";
import {Navigate, NavLink, useNavigate, useParams} from "react-router-dom";
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
import QuestionForm from "./Question/manage/QuestionForm.jsx";
import {QUESTION} from "../../utils/constans.js";
import Notification from "../core/Notification.jsx";
import FormTest from "./FormTest.jsx";
import dayjs from "dayjs";
import DeleteTest from "./DeleteTest.jsx";
import QuestionCard from "./Question/display/QuestionCard.jsx";
import TestResults from "./TestResults.jsx";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace.js";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd.js";
import FormTask from "../Tasks/FormTask.jsx";

const currentDate = dayjs();
export default function TestsEditor() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {id} = useParams();

    const {tests, isLoading, visibleData, test, errors} = useSelector((state) => state.tests)
    const [notification, setNotification] = useState({text: '', color: 'success'});

    const [openQuestionForm, setOpenQuestionForm] = useState(false);
    const [openDialogEdit, setOpenDialogEdit] = useState(false);
    const [openDialogDelete, setOpenDialogDelete] = useState(false);
    const [openDialogDeleteQuestion, setOpenDialogDeleteQuestion] = useState(false);

    const [selectedTaskType, setSelectedTaskType] = useState('');

    const [anchorEl, setAnchorEl] = useState(null);
    const openMenu = Boolean(anchorEl);

    const sumOfScores = test?.questions?.reduce((accumulator, question) => {
        const score = parseFloat(question.score); // Перетворення рядка на число
        return accumulator + score;
    }, 0);

    const handleClickOpenQuestionForm = (value) => {
        setSelectedTaskType(value);
        setOpenQuestionForm(true);
        handleCloseMenu();
    };

    const handleClickCloseQuestionForm = (value) => {
        console.log(value);
        setOpenQuestionForm(false);
        if (value) {
            setNotification({text: 'Запитання успішно додано!', color: 'success'});
        }

    };
    const handleClickMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleClickOpenDialogEdit = () => {
        setOpenDialogEdit(true);
    };

    const handleCloseDialogEdit = (value) => {
        setOpenDialogEdit(false);
        if (value) {
            setNotification({text: 'Успішно оновлені дані тесту!', color: 'success'});
        }

    };

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setNotification(prevNotification => ({...prevNotification, text: ''}));

    };
    const handleClickOpenDialogDelete = () => {
        setOpenDialogDelete(true);
    };
    const handleCloseDialogDelete = (value) => {

        setOpenDialogDelete(false);
        console.log(value);
        if (value) {
            setNotification({text: 'Тест був успішно видалений!', color: 'success'});
            setTimeout(() => {
                navigate('/tests'); // Перенаправлення на сторінку /tests
            }, 1000);
        }
    };

    const handleCloseDialogDeleteQuestion = (value) => {
        console.log(value);
        setOpenDialogDeleteQuestion(false);
        if (value) setNotification({text: 'Запитання успішно видалено!', color: 'success'});
    };


    const handleClickOpenDialogDeleteQuestion = () => {
        setOpenDialogDeleteQuestion(true);
    };

    const handleChangeTestStatus = async () => {
        if (dayjs(test?.end_time) < currentDate || test?.questions.length < 2) {
            setNotification({
                text: 'Помилка! Дата закриття тесту вже минула обо тест мість меньше,ніж 2 запитання!',
                color: 'error'
            });
        } else {
            let id = test.id;
            const resultAction = await dispatch(changeTestStatus({id}));
            if (changeTestStatus.rejected.match(resultAction)) {
                setNotification({
                    text: errors,
                    color: 'error'
                });

            }
            if (changeTestStatus.fulfilled.match(resultAction)) {
                setNotification({
                    text: 'Операція успішна! Статус тесту змінено!',
                    color: 'success'
                });

            }
        }

    }

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(getTests());
            dispatch(getTestById(id));
        };

        fetchData();
    }, [id])


    const outputTest = test ? {
        id: test.id,
        title: test.title,
        start_time: test.start_time ? dayjs(test.start_time) : null,
        end_time: test.end_time ? dayjs(test.end_time) : null,
        max_attempts: test.max_attempts,
        access_type: test.access_type,
        is_active: test.is_active,
        subject_ids: test.subjects?.map(subject => subject.id),
        time_limit: test.time_limit,
        result_display_type: test.result_display_type,
    } : null;


    const [selectedTab, setSelectedTab] = useState(0); // Стан для вибраної вкладки

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };
    return (
        <>


            {isLoading &&
                <Box sx={{display: 'flex', justifyContent: 'center'}}>
                    <CircularProgress/>
                </Box>
            }
            {
                !isLoading && test &&
                <>
                    <Grid container justifyContent="space-between"
                          style={{flexWrap: 'wrap', paddingBottom: 5}}
                          className={styles['no-padding-top']} spacing={2}>
                        <Grid item xs={12} lg={9}>
                            <Paper sx={{padding: '20px'}}>

                                <Typography component="h2" variant="h6" sx={{paddingBottom: '5px'}}> <span
                                    style={{color: 'gray'}}>Тест:</span> {test?.title}
                                </Typography>
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
                            </Paper>
                            <Tabs value={selectedTab} onChange={handleTabChange}
                                  indicatorColor="primary">
                                <Tab label="Питання"/>
                                <Tab label="Результати учнів"/>
                            </Tabs>

                            {selectedTab === 0 && (
                                <>
                                    {test.questions?.map((question, index) => (
                                        <QuestionCard
                                            key={question.id}
                                            sum={sumOfScores}
                                            index={index}
                                            question={question}
                                            count={test.questions.length}
                                            openDeleteDialog={openDialogDeleteQuestion}
                                            onOpenDeleteDialog={handleClickOpenDialogDeleteQuestion}
                                            onCloseDeleteDialog={handleCloseDialogDeleteQuestion}
                                        />
                                    ))}
                                </>
                            )}

                            {selectedTab === 1 && (
                                <>
                                    {test.results.length > 0 ?
                                        test.results?.map((result, index) => (
                                            <TestResults index={index} result={result}/>
                                        ))
                                        :
                                        <div>Цей тест ще ніхто не проходив</div>
                                    }
                                </>
                            )}

                        </Grid>
                        <Grid item xs={12} lg={3} >
                            <Box display="flex" flexWrap="wrap" >
                                <Button
                                    color="secondary"
                                    style={{
                                        backgroundColor: theme.palette.secondary.main,
                                        color: 'white',
                                        width: '100%'
                                    }}
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
                                    <MenuItem
                                        sx={{ whiteSpace: 'normal' }}
                                        onClick={() => handleClickOpenQuestionForm(QUESTION.SINGLE_CHOICE)}
                                        disableRipple>
                                        <RadioButtonCheckedIcon sx={{marginRight: '8px'}}/>
                                        З однією правильною відовіддю
                                    </MenuItem>
                                    <MenuItem
                                        sx={{ whiteSpace: 'normal' }}
                                        onClick={() => handleClickOpenQuestionForm(QUESTION.MULTIPLE_CHOICE)}
                                        disableRipple>
                                        <FormatListBulletedIcon sx={{marginRight: '8px'}}/>
                                        З кількома правильними відповідями
                                    </MenuItem>
                                    <MenuItem
                                        sx={{ whiteSpace: 'normal' }}
                                        onClick={() => handleClickOpenQuestionForm(QUESTION.MATCHING)}
                                        disableRipple>
                                        <SyncAltIcon sx={{marginRight: '8px'}}/>
                                        На встановлення відповідності
                                    </MenuItem>
                                    <MenuItem
                                        sx={{ whiteSpace: 'normal' }}
                                        onClick={() => handleClickOpenQuestionForm(QUESTION.SHORT_ANSWER)}
                                        disableRipple>
                                        <ShortTextIcon sx={{marginRight: '8px'}}/>
                                        Коротка відповідь
                                    </MenuItem>
                                </Menu>
                                <QuestionForm open={openQuestionForm}
                                              onClose={handleClickCloseQuestionForm}
                                              type={selectedTaskType}/>
                                <Button
                                    variant="contained"
                                    style={{
                                        marginTop: 10,
                                        width: '100%',
                                        backgroundColor: test?.is_active ? 'red' : 'green'
                                    }}
                                    startIcon={test?.is_active ? <KeyOffIcon/> : <KeyIcon/>}
                                    onClick={handleChangeTestStatus}
                                >
                                    {test?.is_active ? 'Деактивувати тест' : 'Активувати тест'}
                                </Button>
                                <Button
                                    color="secondary"
                                    style={{
                                        color: 'white',
                                        marginTop: 10,
                                        width: '100%',
                                    }}
                                    // startIcon={<QuestionMarkIcon/>}
                                    // endIcon={<KeyboardArrowDownIcon/>}
                                    variant="contained"
                                    disableElevation
                                    onClick={handleClickOpenDialogEdit}
                                >
                                    Редагувати
                                </Button>
                                <Button
                                    style={{
                                        color: 'white',
                                        marginTop: 10,
                                        width: '100%',
                                    }}
                                    variant="contained" color="error"
                                    // startIcon={<QuestionMarkIcon/>}
                                    // endIcon={<KeyboardArrowDownIcon/>}
                                    disableElevation
                                    onClick={handleClickOpenDialogDelete}
                                >
                                    Видалити
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>

                    {openDialogEdit !== null && (
                        <FormTest open={!!openDialogEdit} onClose={handleCloseDialogEdit}
                                  test={outputTest}/>
                    )}
                    {openDialogDelete && (
                        <DeleteTest open={!!openDialogDelete} onClose={handleCloseDialogDelete}
                                    test={outputTest}/>
                    )}
                    {notification && (
                        <Notification notification={!!notification.text}
                                      handleCloseAlert={handleCloseAlert} hideDuration={3000}
                                      text={notification.text} color={notification.color}/>
                    )
                    }
                </>
            }
        </>
    );
}