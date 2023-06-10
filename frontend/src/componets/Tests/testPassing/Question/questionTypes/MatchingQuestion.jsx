import React, {useEffect, useState} from "react";
import {
    Box,
    Button,
    DialogActions,
    DialogTitle,
    DialogContent,
    Grid,
    TextField,
    Typography,
    Alert,
    MenuItem,
    Autocomplete, InputAdornment, Chip
} from "@mui/material";
import EastIcon from '@mui/icons-material/East';
import {theme} from "../../../../../utils/theme.js";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import {SendSharp} from "@mui/icons-material";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import {ukrainianLetters} from "../../../../../utils/common.js";
import TableBody from "@mui/material/TableBody";
import Checkbox from "@mui/material/Checkbox";
import Matrix from "../../../Matrix.jsx";


const MatchingQuestion = ({options, answerChanged}) => {
    const [selectedOptions, setSelectedOptions] = useState([]);

    const onCheckboxChange = (leftUuid, rightUuid, e) => {

        let updateSelectedOptions = selectedOptions.filter(([left, right]) => left !== leftUuid && right !== rightUuid);

        if (e.target.checked) {
            updateSelectedOptions = [...updateSelectedOptions, [leftUuid, rightUuid]];
            answerChanged(updateSelectedOptions);
        } else {
            answerChanged(updateSelectedOptions);
        }

        setSelectedOptions(updateSelectedOptions);

    };

    useEffect(() => {
        setSelectedOptions([]);
    }, [options]);

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
            <Matrix options={options} onChange={onCheckboxChange} selectedOptions={selectedOptions}/>
        </>
    );
};

export default MatchingQuestion;
