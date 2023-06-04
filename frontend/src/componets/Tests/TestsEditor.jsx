import Grid from "@mui/material/Grid";
import styles from "../../styles/Grid.module.css";
import Typography from "@mui/material/Typography";
import {
    Button,
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
import Notification from "../core/Notification.jsx";
import FormTest from "./FormTest.jsx";
import dayjs from "dayjs";
import DeleteTest from "./DeleteTest.jsx";
import QuestionCard from "./Question/display/QuestionCard.jsx";

export default function TestsEditor() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {id} = useParams();

    const {tests, isLoading, visibleData, test} = useSelector((state) => state.tests)
    const [notification, setNotification] = useState(false);

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

    const handleCloseDialogDeleteQuestion = (value) => {
        console.log(value);
        setOpenDialogDeleteQuestion(false);
        if (value) setNotification('Запитання успішно видалено!');
    };


    const handleClickOpenDialogDeleteQuestion = () => {
            setOpenDialogDeleteQuestion(true);
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
                                <QuestionCard key={question.id} sum={sumOfScores} index={index} question={question} count={test.questions.length} openDeleteDialog={openDialogDeleteQuestion} onOpenDeleteDialog={handleClickOpenDialogDeleteQuestion} onCloseDeleteDialog={handleCloseDialogDeleteQuestion}/>
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