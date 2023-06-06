import Typography from "@mui/material/Typography";
import {Button, Chip} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import React from "react";
import {QUESTION} from "../../../../utils/constans.js";
import ShortAnswerQuestion from "./questionTypes/ShortAnswerQuestion.jsx";
import MultiChoiceQuestion from "./questionTypes/MultiChoiceQuestion.jsx";
import SingleChoiceQuestion from "./questionTypes/SingleChoiceQuestion.jsx";
import MatchingQuestion from "./questionTypes/MatchingQuestion.jsx";

export default function Question({showTest, question, test, questionIndex, nextQuestion}) {

    return (
        <>
            {showTest && (
                <>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '10px'
                    }}>
                        <Chip
                            label={`Запитання ${questionIndex + 1}/${test.questions.length}`}/>
                        {/*<span style={{*/}
                        {/*    color: 'gray',*/}
                        {/*    marginLeft: '5px'*/}
                        {/*}}>Балів: {question.score}/{sum}</span>*/}
                    </div>
                    <Typography>
                        <div style={{ overflow: 'hidden'}}
                             dangerouslySetInnerHTML={{__html: question.question}}
                             className="question-content"/>
                    </Typography>
                    {question.type === QUESTION.SHORT_ANSWER && <ShortAnswerQuestion
                        options={question.options}/>}
                    {question.type === QUESTION.MULTIPLE_CHOICE &&
                        <MultiChoiceQuestion
                            options={question.options}/>}
                    {question.type === QUESTION.SINGLE_CHOICE &&
                        <SingleChoiceQuestion
                            options={question.options}/>}
                    {question.type === QUESTION.MATCHING &&
                        <MatchingQuestion options={question.options}/>}
                    {
                        (questionIndex + 1) !== test.questions.length ?
                            <Button variant="contained" color="primary" onClick={nextQuestion}>
                                Наступне питання
                            </Button>
                            :
                            <Button variant="contained" color="primary" onClick={nextQuestion}>
                                Завершити тестування
                            </Button>
                    }
                </>
            )
            }
        </>
    )
}