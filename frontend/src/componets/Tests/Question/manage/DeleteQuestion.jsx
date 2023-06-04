import React, {useState} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar} from '@mui/material';
import {useDispatch} from "react-redux";
import 'react-toastify/dist/ReactToastify.css';
import {deleteQuestion} from "../../../../store/test/testsSlice.js";


export default function DeleteQuestion({question, open, onClose}) {
    const dispatch = useDispatch();

    const onDelete = async () => {
        const {id} = question;

        const resultAction = await dispatch(deleteQuestion({id, question}));
        if (deleteQuestion.fulfilled.match(resultAction)) {
            console.log(resultAction.payload);
            onClose(true);

        }

    }
    return (
        <>
            <div>

                <Dialog open={open} onClose={() => onClose(false)}>
                    <DialogTitle>Видалення Запитання</DialogTitle>
                    <DialogContent>
                        <p>Ви дійсно хочете видалити дане запитання?</p>
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