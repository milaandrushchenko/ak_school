import {createTheme, styled, ThemeProvider} from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import styles from "../../styles/Grid.module.css";
import Typography from "@mui/material/Typography";
import {
    alpha,
    Button,
    Card,
    CardContent, Chip,
    CircularProgress,
    InputBase, Menu,
    MenuItem
} from "@mui/material";
import React, {useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import TestCard from "./TestCard.jsx";
import Box from "@mui/material/Box";
import {getTestById, searchTest} from "../../store/test/testsSlice.js";
import {Navigate, useNavigate, useParams} from "react-router-dom";
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
import ShortAnswerQuestionForm from "./Question/manage/questionTypes/ShortAnswerQuestionForm.jsx";
import MultiChoiceQuestionForm from "./Question/manage/questionTypes/MultiChoiceQuestionForm.jsx";
import SingleChoiceQuestionForm from "./Question/manage/questionTypes/SingleChoiceQuestionForm.jsx";
import MatchingQuestionForm from "./Question/manage/questionTypes/MatchingQuestionForm.jsx";
import ShortAnswerQuestion from "./Question/display/questionTypes/ShortAnswerQuestion.jsx";
import MultiChoiceQuestion from "./Question/display/questionTypes/MultiChoiceQuestion.jsx";
import SingleChoiceQuestion from "./Question/display/questionTypes/SingleChoiceQuestion.jsx";
import MatchingQuestion from "./Question/display/questionTypes/MatchingQuestion.jsx";
import Notification from "../core/Notification.jsx";
import UserForm from "../Users/UserForm.jsx";
import DeleteUser from "../Users/DeleteUser.jsx";
import FormTest from "./FormTest.jsx";
import dayjs from "dayjs";
import DeleteTest from "./DeleteTest.jsx";

export default function TestsEditor() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {id} = useParams();

    const {tests, isLoading, visibleData, test} = useSelector((state) => state.tests)
    const [notification, setNotification] = useState(false);

    const [openQuestionForm, setOpenQuestionForm] = useState(false);
    const [openDialogEdit, setOpenDialogEdit] = useState(false);
    const [openDialogDelete, setOpenDialogDelete] = useState(false);

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
        if (value) setNotification(`Запитання успішно додано!`);
    };
    const handleClickMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleClickOpenDialogEdit = () => {
        event.stopPropagation();
        setOpenDialogEdit(true);
    };

    const handleCloseDialogEdit = (value) => {
        setOpenDialogEdit(false);
        console.log(value)
        if (value) setNotification('Успішно оновлені дані тесту!');
    };

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setNotification(false);
    };
    const handleClickOpenDialogDelete = () => {
        setOpenDialogDelete(true);
    };
    const handleCloseDialogDelete = (value) => {

        setOpenDialogDelete(false);
        console.log(value);
        if (value) {
            setNotification('Тест був успішно видалений!');
            setTimeout(() => {
                navigate('/tests'); // Перенаправлення на сторінку /tests
            }, 1000);
        }
    };


    useEffect(() => {
        console.log(id);
        const fetchData = async () => {
        await dispatch(getTests());
        dispatch(getTestById(id));
        };

        fetchData();
    }, [])


    const outputTest = test ? {
        id: test.id,
        title: test.title,
        start_time: test.start_time ? dayjs(test.start_time) : null,
        end_time: test.end_time ? dayjs(test.end_time) : null,
        max_attempts: test.max_attempts,
        access_type: test.access_type,
        is_active: test.is_active,
        time_limit: test.time_limit,
    } : null;

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
                                <Box display="flex" alignItems="center">
                                    <QueryBuilderIcon style={{marginRight: 10}}/>
                                    <Typography
                                        sx={{
                                            color: 'gray',
                                            fontStyle: 'italic',
                                            paddingRight: '5px'
                                        }}>
                                        {'Дата вікриття :'} </Typography>
                                    <Typography> {formattedDate(test?.start_time)}
                                    </Typography>
                                </Box>
                                <Box style={{paddingTop: 5}} display="flex" alignItems="center">
                                    <QueryBuilderIcon style={{marginRight: 10}}/>
                                    <Typography
                                        sx={{
                                            color: 'gray',
                                            fontStyle: 'italic',
                                            paddingRight: '5px'
                                        }}>
                                        Дата закриття:</Typography>
                                    <Typography>
                                        {formattedDate(test?.end_time)}
                                    </Typography>
                                </Box>
                                <Box style={{paddingTop: 5}} display="flex" alignItems="center">
                                    <TimerIcon style={{marginRight: 10}}/>
                                    <Typography
                                        sx={{
                                            color: 'gray',
                                            fontStyle: 'italic',
                                            paddingRight: '5px'
                                        }}>
                                        Тривалість:</Typography>
                                    <Typography> {test?.time_limit ? test?.time_limit + ' хвилин' : 'Необмежений у часі'}
                                    </Typography>
                                </Box>
                                <Box style={{paddingTop: 15}} display="flex" alignItems="center">
                                    <Button
                                        color="secondary"
                                        style={{
                                            color: 'white',
                                            marginRight: 10,
                                        }}
                                        // onClick={handleClickOpen}
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
                                        }}
                                        variant="contained" color="error"
                                        // onClick={handleClickOpen}
                                        // startIcon={<QuestionMarkIcon/>}
                                        // endIcon={<KeyboardArrowDownIcon/>}
                                        disableElevation
                                        onClick={handleClickOpenDialogDelete}
                                    >
                                        Видалити
                                    </Button>
                                </Box>
                            </Paper>
                            {test.questions?.map((question, index) => (
                                <Paper key={index} sx={{padding: '20px', marginTop: '10px'}}>
                                    <Chip
                                        label={`Запитання ${index + 1}/${test.questions.length}`}/>
                                    <span style={{
                                        color: 'gray',
                                        marginLeft: '5px'
                                    }}>Балів: {question.score}/{sumOfScores}</span>
                                    <Typography component="div" variant="body1"
                                                sx={{paddingBottom: '5px'}}>
                                        <div
                                            style={{maxWidth: '90%', overflow: 'hidden'}}
                                            dangerouslySetInnerHTML={{__html: question.question}}
                                            className="question-content"
                                        />
                                    </Typography>
                                    {question.type === QUESTION.SHORT_ANSWER &&
                                        <ShortAnswerQuestion
                                            options={JSON.parse(question.options)}/>}
                                    {question.type === QUESTION.MULTIPLE_CHOICE && (
                                        <MultiChoiceQuestion
                                            options={JSON.parse(question.options)}/>
                                    )}
                                    {question.type === QUESTION.SINGLE_CHOICE &&
                                        <SingleChoiceQuestion
                                            options={JSON.parse(question.options)}/>}
                                    {question.type === QUESTION.MATCHING && (
                                        <MatchingQuestion options={JSON.parse(question.options)}/>
                                    )}
                                </Paper>
                            ))}

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
                                    <MenuItem
                                        onClick={() => handleClickOpenQuestionForm(QUESTION.SINGLE_CHOICE)}
                                        disableRipple>
                                        <RadioButtonCheckedIcon sx={{marginRight: '8px'}}/>
                                        З однією правильною відовіддю
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() => handleClickOpenQuestionForm(QUESTION.MULTIPLE_CHOICE)}
                                        disableRipple>
                                        <FormatListBulletedIcon sx={{marginRight: '8px'}}/>
                                        З кількома правильними відповідями
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() => handleClickOpenQuestionForm(QUESTION.MATCHING)}
                                        disableRipple>
                                        <SyncAltIcon sx={{marginRight: '8px'}}/>
                                        На встановлення відповідності
                                    </MenuItem>
                                    <MenuItem
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

                    {openDialogEdit !== null && (
                        <FormTest open={!!openDialogEdit} onClose={handleCloseDialogEdit}
                                  test={outputTest}/>
                    )}
                    {openDialogDelete && (
                        <DeleteTest open={!!openDialogDelete} onClose={handleCloseDialogDelete}
                                    test={outputTest}/>
                    )}
                    {notification && (
                        <Notification notification={!!notification}
                                      handleCloseAlert={handleCloseAlert} hideDuration={3000}
                                      text={notification}/>
                    )
                    }
                </>
            }
        </>
    );
}