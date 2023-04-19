import React, {useState} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar} from '@mui/material';
import {deleteUser, updateUser} from "../../store/user/usersSlice.js";
import {useDispatch} from "react-redux";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function DeleteUser({user, open, onClose}) {
    const dispatch = useDispatch();

    const onDelete = async () => {
        const {id} = user;

        const resultAction = await dispatch(deleteUser({id, user}));
        if (deleteUser.fulfilled.match(resultAction)) {
            console.log(resultAction.payload.login);
            onClose(true,resultAction.payload.login);
        }

    }
    return (
        <>
            <div>

                <Dialog open={open} onClose={() => onClose(false)}>
                    <DialogTitle>Видалення користувача</DialogTitle>
                    <DialogContent>
                        <p>Ви дійсно хочете видалити даного користувача?</p>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => onClose(false)}>Скасувати</Button>
                        <Button onClick={onDelete} color="secondary">Видалити</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </>
    )
}