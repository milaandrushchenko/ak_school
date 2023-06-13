import Typography from "@mui/material/Typography";
import React, {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import {time_converter} from "../../../utils/common.js";
import QuestionResults from "../QuestionResults.jsx";

export default function Result({showResult, test}) {
    let lastResult = test.results[test.results.length - 1];

    const [openQuestionResult, setOpenQuestionResult] = useState(null);

    const handleQuestionResultOpen = (questionAnswer) => {
        console.log(questionAnswer);
        setOpenQuestionResult(questionAnswer);
    };

    const handleQuestionResultClose = () => {
        setOpenQuestionResult(null);
    };
    const getLastResult = () => {
        lastResult = test.results[test.results.length - 1];
        return lastResult;
    }

    console.log(showResult);
    useEffect(() => {
        getLastResult();
    }, [test]);

    return (
        showResult && (
            <Box justifyContent="center">
                <Typography variant="h4" sx={{marginBottom: "24px"}}>
                    {test.title}
                </Typography>
                <Box display="block" flexWrap="wrap" textAlign="center">
                    <Typography
                        sx={{
                            color: 'gray',
                            fontStyle: 'italic',
                            paddingRight: '5px'
                        }}>
                        Оцінка за тест: </Typography>
                    <Typography component="label" color="primary" variant="h1"
                                sx={{paddingBottom: '5px'}}>
                        {lastResult.total_score}
                    </Typography>
                    <Typography component="label" color="primary" variant="h4"
                                sx={{paddingBottom: '5px'}}>
                        балів
                    </Typography>
                </Box>
                <Box display="flex" flexWrap="wrap" justifyContent="center" >
                    <Typography
                        sx={{
                            color: 'gray',
                            fontStyle: 'italic',
                            paddingRight: '5px'
                        }}>
                        Розпочато : </Typography>
                    <Typography variant="subtitle1" component="label">
                        {lastResult.start_time}
                    </Typography>
                </Box>
                <Box display="flex" flexWrap="wrap" justifyContent="center">
                    <Typography
                        sx={{
                            color: 'gray',
                            fontStyle: 'italic',
                            paddingRight: '5px'
                        }}>
                        Завершено :
                    </Typography>
                    <Typography variant="subtitle1" component="label" justifyContent="center">
                        {lastResult.end_time}
                    </Typography>
                </Box>
                <Box display="flex" flexWrap="wrap" justifyContent="center">
                    <Typography
                        sx={{
                            color: 'gray',
                            fontStyle: 'italic',
                            paddingRight: '5px'
                        }}>
                        Витрачено часу :
                    </Typography>
                    <Typography variant="subtitle1" component="label">
                        {time_converter(lastResult.time_taken)}
                    </Typography>
                </Box>
                <Typography variant="subtitle1" component="label"
                            sx={{
                                fontWeight: 'bold',
                                display: 'block'
                            }}>
                    Відповіді на питання:
                </Typography>
                {lastResult.question_results.map((questionAnswer, index) => (
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
                                open={openQuestionResult.question_id === questionAnswer.question_id}
                                onClose={handleQuestionResultClose}
                                questionAnswer={openQuestionResult}/>
                        )}
                    </React.Fragment>

                ))}
            </Box>)

    )
}