import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getTestBySlug} from "../../../store/test/testsSlice.js";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import {alpha, Button, Card, CardContent, CircularProgress} from "@mui/material";
import Box from "@mui/material/Box";
import StartTest from "./StartTest.jsx";
import Question from "./Question/Question.jsx";

export default function TestPage() {
    const dispatch = useDispatch();

    const {slug} = useParams();

    const [showStart, setShowStart] = useState(true);
    const [showTest, setShowTest] = useState(false);
    const [question, setQuestion] = useState({});
    const [questionIndex, setQuestionIndex] = useState(0);

    const {isLoading, test, errors} = useSelector((state) => state.tests)

    // Start Quiz
    const startTest = () => {
        setShowStart(false);
        setShowTest(true);
    }
    // Next Question
    const nextQuestion = () => {
        setQuestionIndex(questionIndex + 1);
    }


    // Set a Single Question
    useEffect(() => {
        if (test?.questions?.length > questionIndex) {
            setQuestion(test.questions[questionIndex]);
        }
    }, [test, questionIndex])

    useEffect(() => {
        console.log(slug);
        dispatch(getTestBySlug({slug}));
    }, [slug]);

    return (
        <>
            {isLoading &&
                <Box sx={{display: 'flex', justifyContent: 'center'}}>
                    <CircularProgress/>
                </Box>
            }
            {!isLoading &&
                <Grid
                    container
                    justifyContent="center"
                    sx={{
                        height: "100vh",
                    }}
                >
                    <Grid item lg={8} xs={12}>
                        <Paper sx={{
                            padding: "24px",
                            backgroundColor: "#fff",
                            borderRadius: "8px",
                            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                            // textAlign: 'center'
                        }}>
                            <StartTest test={test} startTest={startTest} showStart={showStart}/>
                            <Question showTest={showTest} question={question}
                                      test={test} questionIndex={questionIndex}
                                      nextQuestion={nextQuestion}/>
                        </Paper>
                    </Grid>
                </Grid>
            }
        </>
    )
}