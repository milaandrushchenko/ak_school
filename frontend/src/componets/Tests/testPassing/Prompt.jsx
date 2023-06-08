import { unstable_useBlocker as useBlocker } from 'react-router-dom';
import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

function Prompt(props) {
    const block = props.when;
    const [open, setOpen] = useState(false);

    useBlocker(() => {
        if (block) {
            setOpen(true);
            return true;
        }
        return false;
    });

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle color="primary" >{props.message}</DialogTitle>
                <DialogContent>
                    {/* Add additional content if needed */}
                </DialogContent>
            </Dialog>
            <div key={block} />
        </>
    );
}

export default Prompt;
