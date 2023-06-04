import React, {useState} from "react";
import {
    Box,
    Button,
    TextField,
} from "@mui/material";
import * as Yup from "yup";
import {AddCircle} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Divider from "@mui/material/Divider";
import {theme} from "../../../../../utils/theme.js";

export default function ShortAnswerQuestion({options}) {

    return (
        <>
            <Divider />
            {options.map((answer, index) => (
                <Box style={{marginLeft: '5px'}} key={index} >
                    <div style={{
                        color: 'gray',

                    }}>Правильна відповідь : </div>
                    <div
                        style={{
                            maxWidth: '90%',
                            overflow: 'hidden',
                            border: `2px solid ${theme.palette.primary.main}`,
                            padding: '10px',
                            display:'inline-block',
                        }}
                        dangerouslySetInnerHTML={{ __html: answer }}
                        className="question-content"
                    />

                </Box>
            ))}
        </>
    );
};