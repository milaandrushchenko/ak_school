import Paper from "@mui/material/Paper";
import {Chip, Menu, MenuItem} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert.js";
import Typography from "@mui/material/Typography";
import {QUESTION} from "../../../../utils/constans.js";
import ShortAnswerQuestion from "./questionTypes/ShortAnswerQuestion.jsx";
import MultiChoiceQuestion from "./questionTypes/MultiChoiceQuestion.jsx";
import SingleChoiceQuestion from "./questionTypes/SingleChoiceQuestion.jsx";
import MatchingQuestion from "./questionTypes/MatchingQuestion.jsx";
import React, {useState} from "react";
import QuestionForm from "../manage/QuestionForm.jsx";
import DeleteQuestion from "../manage/DeleteQuestion.jsx";
import Notification from "../../../core/Notification.jsx";

export default function QuestionCard({
                                         sum,
                                         index,
                                         question,
                                         count,
                                         openDeleteDialog,
                                         onOpenDeleteDialog,
                                         onCloseDeleteDialog
                                     }) {

    question = {...question, options: JSON.parse(question.options)}

    const [notification, setNotification] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [openDialogEdit, setOpenDialogEdit] = useState(false);

    const handleMenuOpen = (event) => {
        event.preventDefault();
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = (event) => {
        event.preventDefault();
        setAnchorEl(null);
    };

    const handleClickOpenDialogEdit = () => {
        setOpenDialogEdit(true);
    };

    const handleCloseDialogEdit = (value) => {
        setOpenDialogEdit(false);
        console.log(value)
        if (value) setNotification('Запитання успішно оновлено!');
    };

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setNotification(false);
    };

    return (
        <Paper sx={{padding: '20px', marginTop: '10px'}}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '10px'
            }}>
                <Chip
                    label={`Запитання ${index + 1}/${count}`}/>
                <span style={{
                    color: 'gray',
                    marginLeft: '5px'
                }}>Балів: {question.score}/{sum}</span>
                <IconButton
                    aria-label="more"
                    aria-controls={`menu-for-${index}`}
                    aria-haspopup="true"
                    onClick={handleMenuOpen}
                    style={{marginLeft: 'auto'}}
                >
                    <MoreVertIcon/>
                </IconButton>
            </div>
            <Typography component="div" variant="body1"
                        sx={{paddingBottom: '5px'}}>
                <div style={{maxWidth: '90%', overflow: 'hidden'}}
                     dangerouslySetInnerHTML={{__html: question.question}}
                     className="question-content"/>
            </Typography>
            {question.type === QUESTION.SHORT_ANSWER && <ShortAnswerQuestion
                options={question.options}/>}
            {question.type === QUESTION.MULTIPLE_CHOICE &&
                <MultiChoiceQuestion
                    options={question.options}/>}
            {question.type === QUESTION.SINGLE_CHOICE &&
                <SingleChoiceQuestion
                    options={question.options}/>}
            {question.type === QUESTION.MATCHING &&
                <MatchingQuestion options={question.options}/>}
            <Menu
                id={`menu-for-${sum}`}
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={handleClickOpenDialogEdit}
                >Редагувати</MenuItem>
                <QuestionForm open={openDialogEdit}
                              onClose={handleCloseDialogEdit} type={question.type}
                              question={question}
                />
                <MenuItem onClick={onOpenDeleteDialog}
                >Видалити</MenuItem>
                <DeleteQuestion open={openDeleteDialog}
                                onClose={onCloseDeleteDialog} question={question}
                />
            </Menu>
            {notification && (
                <Notification notification={!!notification}
                              handleCloseAlert={handleCloseAlert} hideDuration={3000}
                              text={notification}/>
            )
            }
        </Paper>
    )
}