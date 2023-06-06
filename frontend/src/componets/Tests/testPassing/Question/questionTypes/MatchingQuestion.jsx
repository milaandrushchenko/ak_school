import React, {useState} from "react";
import {
    Box,
    Button, DialogActions, DialogTitle, DialogContent,
    Grid,
    TextField,
    Typography, Alert
} from "@mui/material";
import EastIcon from '@mui/icons-material/East';
import {theme} from "../../../../../utils/theme.js";


const MatchingQuestion = ({options}) => {
    // options = JSON.parse(options);

    return (
        <>
            <Grid container alignItems="center" >
                {options?.map((pair, index) => (
                    <React.Fragment key={index}>
                        <Grid item xs={5} sx={{textAlign: 'right'}}>
                            <div
                                style={{maxWidth: '100%', overflow: 'hidden'}}
                                dangerouslySetInnerHTML={{__html: pair.text}}
                                className="question-content"
                            />
                        </Grid>
                        <Grid item xs={2} sx={{textAlign: 'center', display: 'flex',justifyContent:'center'}}>
                            <EastIcon color="primary"/>
                        </Grid>

                        <Grid item xs={5} sx={{textAlign: 'left'}}>
                            <div
                                style={{maxWidth: '100%', overflow: 'hidden'}}
                                dangerouslySetInnerHTML={{__html: pair.correctAnswer}}
                                className="question-content"
                            />
                        </Grid>

                    </React.Fragment>
                ))}
            </Grid>
        </>
    );
};

export default MatchingQuestion;
