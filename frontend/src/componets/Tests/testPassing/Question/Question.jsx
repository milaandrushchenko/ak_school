import Typography from "@mui/material/Typography";
import {Button, Chip} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import React, {useEffect, useState} from "react";
import {QUESTION} from "../../../../utils/constans.js";
import ShortAnswerQuestion from "./questionTypes/ShortAnswerQuestion.jsx";
import MultiChoiceQuestion from "./questionTypes/MultiChoiceQuestion.jsx";
import SingleChoiceQuestion from "./questionTypes/SingleChoiceQuestion.jsx";
import MatchingQuestion from "./questionTypes/MatchingQuestion.jsx";
import MatchingQuestion1 from "./questionTypes/MatchingQuestion1.jsx";
import CountDown from "../CountDown.jsx";

export default function Question({
                                     showTest,
                                     question,
                                     test,
                                     questionIndex,
                                     nextQuestion,
                                     answerChanged,
                                     showTheResult, timeOver,
                                     endTime, setEndTime,testStorage
                                 }) {
    const [isAnswerSelected, setIsAnswerSelected] = useState(false);

    const handleAnswerChanged = (answer) => {
        setIsAnswerSelected(answer.length > 0);
        answerChanged(answer);

    };

    const handleNextQuestion = () => {
        nextQuestion();
        setIsAnswerSelected(false);
    };


    return (
        <>
            {showTest && (
                <>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '10px'
                    }}>
                        <Chip label={`Запитання ${questionIndex + 1}/${test.questions.length}`}/>
                        <CountDown countdownTime={test.time_limit * 60} timeOver={timeOver}
                                   endTime={endTime} setEndTime={setEndTime}
                                   questionIndex={questionIndex} testStorage={testStorage}/>
                    </div>
                    <Typography>
                        <span style={{overflow: 'hidden'}}
                              dangerouslySetInnerHTML={{__html: question.question}}
                              className="question-content"/>
                    </Typography>
                    {question.type === QUESTION.SHORT_ANSWER && <ShortAnswerQuestion
                        options={question.options}
                        answerChanged={handleAnswerChanged}/>}
                    {question.type === QUESTION.MULTIPLE_CHOICE &&
                        <MultiChoiceQuestion
                            options={question.options}
                            answerChanged={handleAnswerChanged}/>}
                    {question.type === QUESTION.SINGLE_CHOICE &&
                        <SingleChoiceQuestion
                            options={question.options}
                            answerChanged={handleAnswerChanged}/>}
                    {question.type === QUESTION.MATCHING &&
                        <MatchingQuestion1 options={question.options}
                                           answerChanged={handleAnswerChanged}/>}
                    {
                        (questionIndex + 1) < test.questions.length ?
                            <Button variant="contained" color="primary"
                                    disabled={!isAnswerSelected}
                                    onClick={handleNextQuestion}>
                                Наступне питання
                            </Button>
                            :
                            <Button variant="contained" color="primary"
                                    onClick={showTheResult}
                            >
                                Завершити тестування
                            </Button>
                    }
                </>
            )
            }
        </>
    )
}