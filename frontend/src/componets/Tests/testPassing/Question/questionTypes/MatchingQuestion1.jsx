import React, {useState} from "react";
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
    Autocomplete, InputAdornment
} from "@mui/material";
import EastIcon from '@mui/icons-material/East';
import {theme} from "../../../../../utils/theme.js";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import {SendSharp} from "@mui/icons-material";


const MatchingQuestion1 = ({options}) => {
    // options = JSON.parse(options);

    return (
        <Grid container alignItems="center">
            {options?.map((pair, index) => (
                <React.Fragment key={index}>
                    <Grid item xs={6} sx={{textAlign: 'right'}}>
                        <div
                            style={{maxWidth: '100%', overflow: 'hidden'}}
                            dangerouslySetInnerHTML={{__html: pair.text}}
                            className="question-content"
                        />
                    </Grid>
                    <Grid item xs={6} sx={{textAlign: "left"}}>
                        <Autocomplete
                            options={options}
                            getOptionLabel={(option) => option.correctAnswer}
                            renderOption={(props, option) => (
                                <MenuItem {...props} sx={{ whiteSpace: "normal" }}>
                                    <div dangerouslySetInnerHTML={{ __html: option.correctAnswer }} />
                                </MenuItem>
                            )}
                            // ListboxProps={{ style: { maxHeight: 350 } }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Виділення"
                                    margin="normal"
                                    inputProps={{ ...params.inputProps, value: "" }}
                                    InputProps={{
                                        ...params.InputProps,
                                        startAdornment: (
                                            <React.Fragment>
                                                {params.inputProps.value && (
                                                    <Typography variant="body1" dangerouslySetInnerHTML={{ __html: params.inputProps.value }} />
                                                )}
                                            </React.Fragment>
                                        )
                                    }}
                                />

                            )}
                        />

                    </Grid>
                </React.Fragment>
            ))}
        </Grid>
    );
};

export default MatchingQuestion1;
