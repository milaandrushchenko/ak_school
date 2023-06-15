import React, {useState} from "react";
import {
    Box,
    Button, DialogActions, DialogTitle, DialogContent,
    Grid,
    TextField,
    Typography, Alert, Chip
} from "@mui/material";
import EastIcon from '@mui/icons-material/East';
import {theme} from "../../../../../utils/theme.js";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete.js";
import TextEditor from "../../../../core/TextEditor.jsx";
import {AddCircle} from "@mui/icons-material";
import {ukrainianLetters} from "../../../../../utils/common.js";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import Matrix from "../../../Matrix.jsx";
import {RESULT_TYPE} from "../../../../../utils/constans.js";
import {useSelector} from "react-redux";


const MatchingQuestion = ({options, studentAnswer, result_display_type}) => {
    console.log(result_display_type)
    const {userToken, user} = useSelector((state) => state.currentUser)

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} lg={6}>
                    {options?.leftColumn.map((leftItem, index) => (
                        <Grid container spacing={2} key={leftItem.uuid}>
                            <Grid item xs={12}>
                                <Box display="flex" alignItems="center">
                                    <Chip label={`${index + 1}`} color="primary"
                                          sx={{marginRight: '8px'}}/>
                                    <div
                                        style={{maxWidth: '100%', overflow: 'hidden'}}
                                        dangerouslySetInnerHTML={{__html: leftItem.text}}
                                        className="question-content"
                                    />
                                </Box>
                            </Grid>

                        </Grid>
                    ))}
                </Grid>

                <Grid item xs={12} lg={6}>
                    {options?.rightColumn.map((rightItem, index) => (
                        <Grid container spacing={2} key={rightItem.uuid}>
                            <Grid item xs={12}>
                                <Grid item xs={12}>
                                    <Box display="flex" alignItems="center">
                                        <Chip label={ukrainianLetters[index]} color="primary"
                                              sx={{marginRight: '8px'}}/>
                                        <div
                                            style={{maxWidth: '100%', overflow: 'hidden'}}
                                            dangerouslySetInnerHTML={{__html: rightItem.text}}
                                            className="question-content"
                                        />
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
            {(result_display_type === undefined || result_display_type === RESULT_TYPE.ALL) && (
                <>
                    <Divider/>
                    <div style={{
                        color: 'gray',

                    }}>{'Правильна відповідь :'}
                    </div>
                    <Matrix options={options} selectedOptions={options?.correctAnswers}/>
                </>
            )
            }
            {studentAnswer && (
                <>
                    <Divider/>
                    <div style={{
                        color: 'gray',

                    }}>{result_display_type ? 'Ваша відповідь :' : 'Відповідь студента :'}
                    </div>
                    <Matrix options={options} selectedOptions={studentAnswer}/></>
            )}
        </>
    );
};

export default MatchingQuestion;
