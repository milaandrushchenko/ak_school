import {
    Accordion,
    AccordionDetails,
    AccordionSummary, Alert,
    Button, Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    FormHelperText,
    InputAdornment,
    InputLabel,
    MenuItem, OutlinedInput, Radio,
    Select,
    Snackbar,
    TextField
} from "@mui/material";
import Grid from "@mui/material/Grid";
import {AddCircle, ExpandMore, Visibility, VisibilityOff} from '@mui/icons-material';
import IconButton from "@mui/material/IconButton";
import React, {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import MuiAlert from '@mui/material/Alert';
import {useDispatch, useSelector} from "react-redux";
import {FormikProvider, useFormik, useFormikContext} from 'formik';
import ReactQuill, {Quill} from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ImageResize from 'quill-image-resize-module-react';
import * as Yup from 'yup';
import dayjs from 'dayjs';

import 'dayjs/locale/uk';
import Box from "@mui/material/Box";
import DeleteIcon from "@mui/icons-material/Delete";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import TextEditor from "../../../../core/TextEditor.jsx";
import Divider from "@mui/material/Divider";


export default function MultiChoiceQuestion({options, studentAnswer}) {

    return (
        <>
            <Divider/>
            <div style={{
                color: 'gray',

            }}>Правильна відповідь :
            </div>
            {options?.map((option, index) => (
                <Box key={index} display="flex" alignItems="center">
                    <Box flexGrow={1} display="flex" alignItems="center">
                        <Checkbox
                            checked={option.isCorrect}
                        />
                        <div
                            style={{maxWidth: '90%', overflow: 'hidden'}}
                            dangerouslySetInnerHTML={{__html: option.text}}
                            className="question-content"
                        />
                    </Box>
                </Box>
            ))}
            {
                studentAnswer && (
                    <>
                        <Divider/>
                        <div style={{
                            color: 'gray',

                        }}>Відповідь студента:
                        </div>
                        {options?.map((option, index) => (
                            <Box key={index} display="flex" alignItems="center">
                                <Box flexGrow={1} display="flex" alignItems="center">
                                    <Checkbox
                                        checked={studentAnswer.includes(option.text)}
                                    />
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