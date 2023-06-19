import {useDispatch} from "react-redux";
import {deleteTask} from "../../../store/subject/subjectsSlice.js";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography} from "@mui/material";
import React from "react";


export default function DeleteTask({task, open, onClose}) {
    const dispatch = useDispatch();
    const onDelete = async () => {
        const task_id = task.id;
        const resultAction = await dispatch(deleteTask({task_id, task}));
        if (deleteTask.fulfilled.match(resultAction))
            onClose(true);
    }
    return (
        <div>
            <Dialog open={open} onClose={() => onClose(false)}>
                <DialogTitle>
                    Видалення завдання
                </DialogTitle>
                <DialogContent>
                    <p>Ви дійсно хочете видалити дане завдання?</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => onClose(false)} variant="outlined">Скасувати</Button>
                    <Button onClick={onDelete} color="primary" variant="contained">Видалити</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}