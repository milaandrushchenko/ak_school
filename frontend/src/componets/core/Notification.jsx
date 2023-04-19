import React, {useEffect, useState} from "react";
import MuiAlert from "@mui/material/Alert";
import {Snackbar} from "@mui/material";


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Notification({notification, handleCloseAlert, hideDuration, text}) {
    return (
        <>
            <Snackbar open={notification} autoHideDuration={hideDuration}
                      onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity="success" sx={{
                    width: '300px',
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                }}>
                    {text}
                </Alert>
            </Snackbar>

        </>
    )
}