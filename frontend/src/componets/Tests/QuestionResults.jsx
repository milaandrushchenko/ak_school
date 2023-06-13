import {
    Button, Chip,
    Dialog, DialogActions,
    DialogContent,
    DialogTitle
} from "@mui/material";
import React, {useState} from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {useDispatch} from "react-redux";
import {generateNewPassword} from "../../store/user/usersSlice.js";
import {generatePassword} from "../../utils/common.js";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import {QUESTION} from "../../utils/constans.js";
import ShortAnswerQuestion from "./Question/display/questionTypes/ShortAnswerQuestion.jsx";
import MultiChoiceQuestion from "./Question/display/questionTypes/MultiChoiceQuestion.jsx";
import SingleChoiceQuestion from "./Question/display/questionTypes/SingleChoiceQuestion.jsx";
import MatchingQuestion from "./Question/display/questionTypes/MatchingQuestion.jsx";
import {json} from "react-router-dom";
import Matrix from "./Matrix.jsx";
import Box from "@mui/material/Box";

const modalRoot = document.querySelector('#root');

export default function QuestionResults(props) {
    const { open, onClose, questionAnswer } = props;
    const {question, user_answer, score,question_id} = questionAnswer;

    const onSubmit = async () => {
        // if (password) {
        //     const updatedUser = {...user, password: password};
        //     const resultAction = await dispatch(generateNewPassword({
        //         id: user.id,
        //         user: updatedUser
        //     }));
        //     if (generateNewPassword.fulfilled.match(resultAction)) {
        //         console.log('password updated');
        //
        //     }
        // }
        // onClose();

    }
    console.log(question);
    console.log(user_answer);

    return (
        <>
            <Dialog
                open={open}
                onClose={onClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {`Запитання ${question_id + 1}`}
                </DialogTitle>
                <DialogContent sx={{maxWidth: '900px', width: '100%', minWidth: '400px'}}>
                    <Typography component="div" variant="body1"
                                sx={{paddingBottom: '5px'}}>
                        <div style={{maxWidth: '90%', overflow: 'hidden'}}
                             dangerouslySetInnerHTML={{__html: question.question}}
                             className="question-content"/>
                    </Typography>
                    {question.type === QUESTION.SHORT_ANSWER && <ShortAnswerQuestion
                        options={JSON.parse(question.options)}
                        studentAnswer={user_answer}/>}
                    {question.type === QUESTION.MULTIPLE_CHOICE &&
                        <MultiChoiceQuestion
                            options={JSON.parse(question.options)}
                            studentAnswer={user_answer}/>}
                    {question.type === QUESTION.SINGLE_CHOICE &&
                        <SingleChoiceQuestion
                            options={JSON.parse(question.options)} studentAnswer={user_answer}/>}
                    {question.type === QUESTION.MATCHING &&
                        <MatchingQuestion options={JSON.parse(question.options)}
                                          studentAnswer={user_answer}/>}

                    <Box display="flex" flexWrap="wrap">
                        <Typography variant="subtitle1" component="label"
                                    sx={{paddingBottom: '5px',fontWeight: 'bold',}}>
                            Набрано балів :          </Typography>
                        <Typography variant="subtitle1" component="label">
                            &nbsp;{score} з {question.score}
                        </Typography>

                    </Box>
                </DialogContent>
                <DialogActions>
                    {/*<Button variant="outlined" color="secondary"*/}
                    {/*        onClick={onSubmit}>OK</Button>*/}
                </DialogActions>
            </Dialog>
        </>
    )
}
