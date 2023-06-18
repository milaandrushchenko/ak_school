import Paper from "@mui/material/Paper";
import {Chip, Menu, MenuItem} from "@mui/material";
import Typography from "@mui/material/Typography";
import React, {useState} from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import {time_converter} from "../../../utils/common.js";
import QuestionResults from "./QuestionResults.jsx";
import {findAllInRenderedTree} from "react-dom/test-utils";
import ShowUser from "../../Users/ShowUser.jsx";

export default function TestResults({result, index,testId}) {


    const [notification, setNotification] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [openDialogEdit, setOpenDialogEdit] = useState(false);
    const [openQuestionResult, setOpenQuestionResult] = useState(null);

    const handleQuestionResultOpen = (questionAnswer) => {
        console.log(questionAnswer);
        setOpenQuestionResult(questionAnswer);
    };

    const handleQuestionResultClose = () => {
        setOpenQuestionResult(null);
    };
    const handleMenuOpen = (event) => {
        event.preventDefault();
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = (event) => {
        event.preventDefault();
        setAnchorEl(null);
    };

    const handleClickOpenDialogEdit = () => {
        setOpenDialogEdit(true);
    };

    const handleCloseDialogEdit = (value) => {
        setOpenDialogEdit(false);
        console.log(value)
        if (value) setNotification('Запитання успішно оновлено!');
    };

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setNotification(false);
    };

    return (

        <Paper key={index} sx={{padding: '20px', marginTop: '10px'}}>
            <Grid container alignItems="center">
                <Grid item xs={12} lg={8}>
                    <Typography component="div" color="primary" variant="h5"
                                sx={{paddingBottom: '5px'}}>
                        {/*{result.user.login}*/}
                        {result.user.first_name + ' ' + result.user.second_name}
                    </Typography>

                    <Box display="flex" flexWrap="wrap">
                        <Typography
                            sx={{
                                color: 'gray',
                                fontStyle: 'italic',
                                paddingRight: '5px'
                            }}>
                            Дата приєднання : </Typography>
                        <Typography variant="subtitle1" component="label">
                            {result.user.created_at}
                        </Typography>
                    </Box>
                    <Box display="flex" flexWrap="wrap">
                        <Typography
                            sx={{
                                color: 'gray',
                                fontStyle: 'italic',
                                paddingRight: '5px'
                            }}>
                            Розпочато : </Typography>
                        <Typography variant="subtitle1" component="label">
                            {result.start_time}
                        </Typography>
                    </Box>
                    <Box display="flex" flexWrap="wrap">
                        <Typography
                            sx={{
                                color: 'gray',
                                fontStyle: 'italic',
                                paddingRight: '5px'
                            }}>
                            Завершено :
                        </Typography>
                        <Typography variant="subtitle1" component="label">
                            {result.end_time}
                        </Typography>
                    </Box>
                    <Box display="flex" flexWrap="wrap">
                        <Typography
                            sx={{
                                color: 'gray',
                                fontStyle: 'italic',
                                paddingRight: '5px'
                            }}>
                            Витрачено часу :
                        </Typography>
                        <Typography variant="subtitle1" component="label">
                            {time_converter(result.time_taken)}
                        </Typography>
                    </Box>
                    <Typography variant="subtitle1" component="label"
                                sx={{
                                    fontWeight: 'bold',
                                    display: 'block'
                                }}>
                        Відповіді на питання:
                    </Typography>
                    {result.question_results.map((questionAnswer, index) => (
                        <React.Fragment key={questionAnswer.question_id}
                        >
                            <Box
                                key={questionAnswer.question_id}
                                display="inline-flex"
                                alignItems="center"
                                justifyContent="center"
                                p={1}
                                bgcolor={+questionAnswer.score === +questionAnswer.question.score ? 'green' : +questionAnswer.score !== 0 ? 'orange' : 'red'}
                                m={1}
                                color='white'
                                width={24}
                                height={26}
                                borderRadius="15%"
                                onClick={() => handleQuestionResultOpen(questionAnswer)}
                                style={{cursor: 'pointer'}}
                            >
                                <span style={{lineHeight: 1}}>{index + 1}</span>
                            </Box>
                            {openQuestionResult !== null && (
                                <QuestionResults
                                    answer={result}
                                    testId={testId}
                                    open={openQuestionResult.question_id === questionAnswer.question_id}
                                    onClose={handleQuestionResultClose}
                                    questionAnswer={openQuestionResult}/>
                            )}
                        </React.Fragment>

                    ))}
                </Grid>
                <Grid item xs={12} lg={4} textAlign="center">
                    Оцінка за тест:
                    <Typography component="div" color="primary" variant="h1"
                                sx={{paddingBottom: '5px'}}>
                        {Math.round(result.total_score)}
                    </Typography>
                </Grid>
            </Grid>
            <Menu
                // id={`menu-for-${sum}`}
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={handleClickOpenDialogEdit}
                >Редагувати</MenuItem>
                {/*<QuestionForm open={openDialogEdit}*/}
                {/*              onClose={handleCloseDialogEdit} type={question.type}*/}
                {/*              question={question}*/}
                {/*/>*/}
                {/*<MenuItem onClick={onOpenDeleteDialog}*/}
                {/*>Видалити</MenuItem>*/}
                {/*<DeleteQuestion open={openDeleteDialog}*/}
                {/*                onClose={onCloseDeleteDialog} question={question}*/}
                {/*/>*/}
            </Menu>
            {notification && (
                <Notification notification={!!notification}
                              handleCloseAlert={handleCloseAlert} hideDuration={3000}
                              text={notification}/>
            )
            }
        </Paper>
    )
}