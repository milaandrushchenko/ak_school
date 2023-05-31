import React, {useState} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar} from '@mui/material';
import {deleteUser, getUsers, updateUser} from "../../store/user/usersSlice.js";
import {useDispatch} from "react-redux";
import MuiAlert from "@mui/material/Alert";
import {deleteClass, getClasses} from "../../store/class/classesSlice.js";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {deleteTest} from "../../store/test/testsSlice.js";


export default function DeleteTest({test, open, onClose}) {
    const dispatch = useDispatch();

    const onDelete = async () => {
        const {id} = test;

        const resultAction = await dispatch(deleteTest({id, test}));
        if (deleteTest.fulfilled.match(resultAction)) {
            console.log(resultAction.payload);
            onClose(true);

        }

    }
    return (
        <>
            <div>

                <Dialog open={open} onClose={() => onClose(false)}>
                    <DialogTitle>Видалення тесту</DialogTitle>
                    <DialogContent>
                        <p>Ви дійсно хочете видалити даний тест?</p>
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