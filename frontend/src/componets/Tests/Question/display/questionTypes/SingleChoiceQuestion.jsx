import {
    AccordionSummary, Alert,
    Button, Chip,
    DialogActions,
    DialogContent,
    DialogTitle,
    Radio
} from "@mui/material";
import {AddCircle, ExpandMore, Visibility, VisibilityOff} from '@mui/icons-material';
import IconButton from "@mui/material/IconButton";
import React, {useEffect, useRef, useState} from "react";
import {FormikProvider, useFormik, useFormikContext} from 'formik';
import 'react-quill/dist/quill.snow.css';
import 'dayjs/locale/uk';
import Box from "@mui/material/Box";
import DeleteIcon from "@mui/icons-material/Delete";
import TextEditor from "../../../../core/TextEditor.jsx";
import Divider from "@mui/material/Divider";
import {RESULT_TYPE} from "../../../../../utils/constans.js";

export default function SingleChoiceQuestion({options, studentAnswer, result_display_type}) {

    return (
        <>
            {result_display_type === null || result_display_type === RESULT_TYPE.ALL && (
                <>
                    <Divider/>
                    <div style={{
                        color: 'gray',

                    }}>Правильна відповідь :
                    </div>
                    {options.map((option, index) => (
                        <Box key={index} display="flex" alignItems="center">
                            <Box flexGrow={1} display="flex" alignItems="center">
                                <Radio
                                    checked={option.isCorrect}
                                />
                                {/*<TextEditor*/}
                                {/*    label={`Варіант ${index + 1}`}*/}
                                {/*    name={`options[${index}].text`}*/}
                                {/*    value={option.text}*/}
                                {/*/>*/}
                                <div
                                    style={{maxWidth: '90%', overflow: 'hidden'}}
                                    dangerouslySetInnerHTML={{__html: option.text}}
                                    className="question-content"
                                />
                            </Box>
                        </Box>

                    ))}
                </>
            )
            }
            {
                studentAnswer && (
                    <>
                        <Divider/>
                        <div style={{
                            color: 'gray',

                        }}>{result_display_type ? 'Ваша відповідь :' : 'Відповідь студента :'}
                        </div>
                        {options.map((option, index) => (
                            <Box key={index} display="flex" alignItems="center">
                                <Box flexGrow={1} display="flex" alignItems="center">
                                    <Radio
                                        checked={option.text === studentAnswer}
                                    />
                                    {/*<TextEditor*/}
                                    {/*    label={`Варіант ${index + 1}`}*/}
                                    {/*    name={`options[${index}].text`}*/}
                                    {/*    value={option.text}*/}
                                    {/*/>*/}
                                    <div
                                        style={{maxWidth: '90%', overflow: 'hidden'}}
                                        dangerouslySetInnerHTML={{__html: option.text}}
                                        className="question-content"
                                    />
                                </Box>
                            </Box>

                        ))}
                    </>
                )
            }
        </>
    )
}