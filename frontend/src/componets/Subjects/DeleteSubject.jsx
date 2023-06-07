import {useDispatch} from "react-redux";
import {deleteSubject} from "../../store/subject/subjectsSlice";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import React from "react";


export default function DeleteSubject({subjectItem, open, onClose}){
    const dispatch = useDispatch();

    const onDelete = async () => {
        const {id} = subjectItem;
        const resultAction = await dispatch(deleteSubject({id, subjectItem}));
        if (deleteSubject.fulfilled.match(resultAction)){
            console.log(resultAction.payload);
            onClose(true);
        }
    }

    return (
        <>
            <div>
                <Dialog open={open} onClose={()=>onClose(false)}>
                    <DialogTitle>Видалення класу</DialogTitle>
                    <DialogContent>
                        <p>Ви дійсно хочете видалити <b>{subjectItem.name}</b> ?</p>
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