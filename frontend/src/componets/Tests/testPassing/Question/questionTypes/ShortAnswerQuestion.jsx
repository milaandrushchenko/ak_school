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
                    <TextField
                        // key={index}
                        label={`Ваша відповідь`}
                        fullWidth
                        margin="normal"
                        // value={answer}
                        // name={`options[${index}]`}
                        // onChange={(event) => handleChange(event, index)}
                        // error={touched.options && !!errors.options?.[index]}
                        // helperText={touched.options && errors.options?.[index]}
                    />
        </>
    );
};
