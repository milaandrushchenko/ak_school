import Typography from "@mui/material/Typography";
import React, {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import {time_converter} from "../../../utils/common.js";
import QuestionResults from "../result/QuestionResults.jsx";
import {RESULT_TYPE} from "../../../utils/constans.js";

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
                <Typography component="h1" variant="h4" color="primary" py="30px" sx={{pb: 2}}>
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
                <Box display="flex" flexWrap="wrap" justifyContent="center">
                    <Typography sx={{p: 0, fontStyle: 'italic'}} color="grey" py="30px"
                                gutterBottom>
                        Розпочато: <span style={{color: 'black'}}>{lastResult.start_time}</span>
                    </Typography>
                </Box>
                <Box display="flex" flexWrap="wrap" justifyContent="center">
                    <Typography sx={{p: 0, fontStyle: 'italic'}} color="grey" py="30px"
                                gutterBottom>
                        Завершено : <span style={{color: 'black'}}>{lastResult.end_time}</span>
                    </Typography>
                </Box>
                <Box display="flex" flexWrap="wrap" justifyContent="center">

                    <Typography sx={{p: 0, fontStyle: 'italic'}} color="grey" py="30px"
                                gutterBottom>
                        Витрачено часу : <span style={{color: 'black'}}>{time_converter(lastResult.time_taken)}</span>
                    </Typography>
                </Box>

                {test.result_display_type !== RESULT_TYPE.SCORE && (
                    <>
                        <Typography variant="subtitle1" component="label"
                                    sx={{
                                        fontWeight: 'bold',
                                        display: 'block',
                                        pt:'20px'
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
                                        result_display_type={test.result_display_type}
                                        questionAnswer={openQuestionResult}/>
                                )}
                            </React.Fragment>

                        ))}
                    </>)
                }

            </Box>)

    )
}