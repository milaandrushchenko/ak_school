import React, {useState} from "react";
import {
    Box,
    Button, DialogActions, DialogTitle, DialogContent,
    Grid,
    TextField,
    Typography, Alert, MenuItem, Autocomplete
} from "@mui/material";
import EastIcon from '@mui/icons-material/East';
import {theme} from "../../../../../utils/theme.js";
import ListItemText from "@mui/material/ListItemText";


const MatchingQuestion = ({ options }) => {
    const getQuestionNumbering = (index) => {
        // Повертаємо номер питання у форматі, як на "Всеосвіті" (наприклад: "1.", "2.", "3.", ...)
        return `${index + 1}.`;
    };

    const getAnswerNumbering = (index) => {
        // Повертаємо номер варіанту відповіді у форматі, як на "Всеосвіті" (наприклад: "А.", "Б.", "В.", ...)
        return String.fromCharCode(65 + index) + '.';
    };

    return (
        <Grid container alignItems="center">
            {options?.map((pair, index) => (
                <React.Fragment key={index}>
                    <Grid item xs={12} lg={6} sx={{ paddingRight: '5px' }}>
                        <div
                            style={{ maxWidth: '100%', overflow: 'hidden' }}
                            dangerouslySetInnerHTML={{
                                __html: `<span class="question-numbering">${getQuestionNumbering(index)}</span> ${pair.text}`,
                            }}
                            className="question-content"
                        />
                    </Grid>
                    <Grid item xs={12} lg={6} sx={{ paddingRight: '5px' }}>
                        <div
                            style={{ maxWidth: '100%', overflow: 'hidden' }}
                            dangerouslySetInnerHTML={{
                                __html: `<span class="answer-numbering">${getAnswerNumbering(index)}</span> ${pair.correctAnswer}`,
                            }}
                            className="question-content"
                        />
                    </Grid>
                </React.Fragment>
            ))}
        </Grid>
    );
};

export default MatchingQuestion;

