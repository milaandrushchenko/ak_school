import {
    AccordionSummary, Alert,
    Button, Chip,
    DialogActions,
    DialogContent,
    DialogTitle,
    Radio, RadioGroup
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
import FormControlLabel from "@mui/material/FormControlLabel";

export default function SingleChoiceQuestion({options, answerChanged}) {
    const handleOptionClick = (selectedOption) => {
        answerChanged(selectedOption);
    };
    return (
        <>
            <RadioGroup defaultValue="outlined" name="radio-buttons-group">
                {options.map((option, index) => (
                    <FormControlLabel
                        key={index}
                        control={
                            <Radio
                                onChange={(ev) => answerChanged(ev.target.value)}
                                id={`option-${index}-${option.text}`}
                                value={option.text}
                            />
                        }
                        label={
                            <div
                                style={{ overflow: 'hidden' }}
                                dangerouslySetInnerHTML={{ __html: option.text }}
                                className="question-content"
                            />
                        }
                        onClick={() => handleOptionClick(option.text)}
                    />
                ))}
            </RadioGroup>

        </>
    )
}