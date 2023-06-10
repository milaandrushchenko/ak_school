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


export default function MultiChoiceQuestion({ options, answerChanged }) {
    const [selectedOptions, setSelectedOptions] = useState([]);

    const onCheckboxChange = (text, e) => {
        if (e.target.checked) {
            setSelectedOptions((prevSelectedOptions) => {
                const updatedOptions = [...prevSelectedOptions, text];
                answerChanged(updatedOptions);
                return updatedOptions;
            });
        } else {
            setSelectedOptions((prevSelectedOptions) => {
                const updatedOptions = prevSelectedOptions.filter((op) => op !== text);
                answerChanged(updatedOptions);
                return updatedOptions;
            });
        }
    };

    useEffect(() => {
        setSelectedOptions([]);
    }, [options]);

    return (
        <>
            {options?.map((option, index) => (
                <Box key={index} display="flex" alignItems="center">
                    <Box flexGrow={1} display="flex" alignItems="center">
                        <FormControlLabel
                            control={
                                <Checkbox
                                    onChange={(e) => onCheckboxChange(option.text,e)}
                                    checked={selectedOptions.includes(option.text)}
                                />
                            }
                            label={
                                <div
                                    style={{ overflow: "hidden" }}
                                    dangerouslySetInnerHTML={{ __html: option.text }}
                                    className="question-content"
                                />
                            }
                            onChange={(e) => onCheckboxChange(option.text,e)}
                        />
                    </Box>
                </Box>
            ))}
        </>
    );
}
