import {
    Button, Chip,
    Dialog, DialogActions,
    DialogContent,
    DialogTitle, TextField
} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Typography from "@mui/material/Typography";
import {QUESTION} from "../../../utils/constans.js";
import ShortAnswerQuestion from "../Question/display/questionTypes/ShortAnswerQuestion.jsx";
import MultiChoiceQuestion from "../Question/display/questionTypes/MultiChoiceQuestion.jsx";
import SingleChoiceQuestion from "../Question/display/questionTypes/SingleChoiceQuestion.jsx";
import MatchingQuestion from "../Question/display/questionTypes/MatchingQuestion.jsx";
import Box from "@mui/material/Box";
import {changeScoreForQuestion} from "../../../store/test/testsSlice.js";


export default function QuestionResults(props) {
    const dispatch = useDispatch();
    const {user, userToken} = useSelector((state) => state.currentUser)

    const {open, onClose, questionAnswer, result_display_type, answer, test} = props;
    const {user_answer, score, question_id, index} = questionAnswer;

    const [changeScore, setChangeScore] = useState({change: false, score: score});
    const [question, setQuestion] = useState({change: false, score: score});

    let data = {
        test_id: test.id,
        question_id: question.id,
        score: changeScore.score
    }
    const onSubmit = () => {
        console.log(changeScore.score);
        if (question.score !== changeScore.score) {
            let answerId = answer.id;
            dispatch(changeScoreForQuestion({answerId, data}));
        }
    }
    const handleChangeScore = () => {
        setChangeScore({
            ...changeScore,
            change: true
        })
    }

    const handleCreditQuestion = () => {
        data = {...data, score: question.score};
        setChangeScore({
            ...changeScore,
            score: question.score,
            change: false
        })
        onSubmit(data);
    }

    const handleSaveScore = () => {
        if (changeScore.score < 0 || changeScore.score > question.score) {
            console.log('Недопустиме значення!');
            return;
        }
        setChangeScore({
            ...changeScore,
            change: false
        })
        onSubmit(data);
    }
    const handleCancel = () => {
        setChangeScore({
            ...changeScore,
            change: false
        })
    }

    useEffect(() => {
        setQuestion(test.questions.find(q => q.id === question_id));
    }, [props])
    return (
        <>
            <Dialog
                open={open}
                onClose={onClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {`Запитання ${index + 1}`}
                </DialogTitle>
                <DialogContent sx={{maxWidth: '900px', width: '100%', minWidth: '400px'}}>
                    <Typography component="div" variant="body1"
                                sx={{paddingBottom: '5px'}}>
                        <div style={{maxWidth: '90%', overflow: 'hidden'}}
                             dangerouslySetInnerHTML={{__html: question.question}}
                             className="question-content"/>
                    </Typography>
                    {question.type === QUESTION.SHORT_ANSWER && <ShortAnswerQuestion
                        options={question.options}
                        result_display_type={result_display_type}
                        studentAnswer={user_answer}/>}
                    {question.type === QUESTION.MULTIPLE_CHOICE &&
                        <MultiChoiceQuestion
                            options={question.options}
                            result_display_type={result_display_type}
                            studentAnswer={user_answer}/>}
                    {question.type === QUESTION.SINGLE_CHOICE &&
                        <SingleChoiceQuestion
                            options={question.options}
                            result_display_type={result_display_type}
                            studentAnswer={user_answer}/>}
                    {question.type === QUESTION.MATCHING &&
                        <MatchingQuestion options={question.options}
                                          result_display_type={result_display_type}
                                          studentAnswer={user_answer}/>}

                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        flexWrap: 'wrap'
                    }}>
                        <Typography variant="subtitle1" component="label"
                                    sx={{fontWeight: 'bold',}}>
                            Набрано балів : </Typography>
                        {!changeScore.change ?
                            <Typography variant="subtitle1" component="label">
                                &nbsp;{changeScore.score}&nbsp;
                            </Typography> :
                            <TextField
                                variant="outlined"
                                size="small"
                                type="number"
                                name={score}
                                value={changeScore.score}
                                inputProps={{
                                    min: 0,
                                    max: question.score,
                                    step: 0.1
                                }}
                                onChange={(e) => setChangeScore({
                                    ...changeScore,
                                    score: e.target.value
                                })}
                                style={{padding: '5px', width: '100px'}}
                                error={(changeScore.score < 0 || changeScore.score > question.score)}

                                // helperText={changeScore.score < 0 || changeScore.score > score?'entry':''}
                            />
                        }
                        <Typography variant="subtitle1" component="label">
                            з {question.score}
                        </Typography>

                    </Box>
                    {user.role === 'teacher' && <Box>
                        {!changeScore.change ?
                            <>
                                <Button variant="outlined"
                                        size="small"
                                        style={{marginRight: '10px'}}
                                        onClick={handleChangeScore}
                                >
                                    Змінити бал
                                </Button>
                                {question.score !== changeScore.score && (
                                    <Button variant="contained"
                                            size="small"
                                            onClick={handleCreditQuestion}
                                    >
                                        Зарахувати завдання
                                    </Button>
                                )}
                            </> :
                            <>
                                <Button variant="outlined"
                                        size="small"
                                        style={{marginRight: '10px'}}
                                        onClick={handleSaveScore}
                                >
                                    Зберегти оцінку
                                </Button>
                                <Button variant="contained"
                                        size="small"
                                        onClick={handleCancel}
                                >
                                    Скасувати
                                </Button>
                            </>
                        }
                    </Box>}
                </DialogContent>
                <DialogActions>
                </DialogActions>
            </Dialog>
        </>
    )
}
