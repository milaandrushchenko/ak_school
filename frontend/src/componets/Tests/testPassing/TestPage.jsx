import {useNavigate, useParams} from "react-router-dom";
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
import Prompt from "./Prompt.jsx";

export default function TestPage() {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const {slug} = useParams();

    const [storage, setStorage] = useState(JSON.parse(localStorage.getItem("test")) || null);

    const [showStart, setShowStart] = useState(!localStorage.getItem("test"));
    const [showTest, setShowTest] = useState(!!localStorage.getItem("test"));
    const [question, setQuestion] = useState({});
    const [questionIndex, setQuestionIndex] = useState(storage?.questionIndex || 0);
    const [answers, setAnswers] = useState({...storage?.answers} || {});
    const [showResult, setShowResult] = useState(!!localStorage.getItem("test"));
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(parseInt(storage?.endTime) || null);


    const {isLoading, test, errors} = useSelector((state) => state.tests)

    const testStorage = {
        questionIndex: questionIndex,
        answers: {...answers},
        startTime: startTime,
        endTime: endTime,
    };

    // Start Quiz
    const startTest = () => {
        setShowStart(false);
        setShowTest(true);
        setStartTime(Date.now());
        setEndTime(Date.now() + test.time_limit * 60 * 1000);
    }


    // Next Question
    const nextQuestion = () => {
        setQuestionIndex(questionIndex + 1);
    }

    const answerChanged = (question, value) => {
        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [question.id]: value,
        }));
    };
    const showTheResult = () => {
        console.log(answers);
        setShowResult(true);
        setShowTest(false);
        localStorage.removeItem("test");

    }

    const timeOver = () => {
        setShowTest(false);
        localStorage.removeItem("test");

    };

    // Set a Single Question
    useEffect(() => {
        if (test?.questions?.length > questionIndex) {
            setQuestion(test.questions[questionIndex]);
        }
    }, [test, questionIndex])

    useEffect(() => {
        dispatch(getTestBySlug({slug}));
    }, [slug]);

    useEffect(() => {
        const handleBeforeUnload = () => {
            if (showTest) {
                localStorage.setItem('test', JSON.stringify(testStorage));
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [testStorage]);

    return (
        <>
            <Prompt when={showTest} message='Спершу завершіть тест!'/>

            {isLoading &&
                <Box sx={{display: 'flex', justifyContent: 'center'}}>
                    <CircularProgress/>
                </Box>
            }
            {!isLoading && Object.keys(test).length !== 0 &&
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
                            textAlign: showTest ? 'start' : 'center'
                        }}>
                            <StartTest test={test} startTest={startTest} showStart={showStart}/>
                            <Question showTest={showTest} question={question}
                                      test={test} questionIndex={questionIndex}
                                      nextQuestion={nextQuestion} answers={answers}
                                      answerChanged={val => answerChanged(question, val)}
                                      showTheResult={showTheResult} timeOver={timeOver}
                                      testStorage={testStorage}
                                      endTime={endTime} setEndTime={setEndTime}
                            />
                        </Paper>
                    </Grid>
                </Grid>
            }
        </>
    )
}