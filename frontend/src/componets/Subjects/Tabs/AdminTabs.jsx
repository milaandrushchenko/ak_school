import {Button, Card, CardContent, CardHeader, Paper, Tab, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, Tabs, Typography} from "@mui/material";
import Grid from "@mui/material/Grid";
import TaskCard from "../Tasks/TaskCard.jsx";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import StatementTableRowSingle from "../Statements/StatementTableRowSingle.jsx";
import {useFormik} from "formik";
import {createSessionScore, createStatement, updateSessionScore} from "../../../store/statement/statementSlice.js";
import dayjs from "dayjs";
import TwoSemesters from "../Statements/TwoSemesters.jsx";
import OneSemester from "../Statements/OneSemester.jsx";
import FormStatement from "../Statements/FormStatement.jsx";
import {theme} from "../../../utils/theme.js";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd.js";
import {changeTestStatus} from "../../../store/test/testsSlice.js";
import KeyOffIcon from "@mui/icons-material/KeyOff.js";
import KeyIcon from "@mui/icons-material/Key.js";
import Notification from "../../core/Notification.jsx";
import {useNavigate} from "react-router-dom";


export default function AdminTabs({subject}){
    const [notification, setNotification] = useState(false);
    const dispatch = useDispatch();
    const [openStatementForm, setOpenStatementForm] = useState(false);
    const handleClickOpenStatementForm = (value) => {
        setOpenStatementForm(true);
    };
    const handleClickCloseStatementForm = (value) => {
        console.log(value);
        setOpenStatementForm(false);
        if (value) {
            setNotification('Відомість успішно додано!');
        }
    };
    const {statements} = useSelector((state) => state.statements)
    const [openDialogDeleteTask, setOpenDialogDeleteTask] = useState(false);

    const {users} = useSelector(state => state.users);
    let students = users ? users.filter(u => u.class && subject.classes && subject.classes.map(c => c.id).includes(u.class.id)) : null

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') return
        setNotification(prevNotification => ({...prevNotification, text: ''}));
    };

    const handleCloseDialogDeleteTask = (value) => {
        setOpenDialogDeleteTask(false);
        if (value) setNotification({text: 'Завдання успішно видалено!', color: 'success'});
    };
    const handleClickOpenDialogDeleteTask = () => {
        setOpenDialogDeleteTask(true);
    };
    const [selectedTab, setSelectedTab] = useState(0);
    const navigate = useNavigate();
    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };
    let semester_1, semester_2;
    if (statements){
        semester_1 = statements.find(s => s && s.semester === 0 && s.subject && s.subject.id === subject.id)
        semester_2 = statements.find(s => s && s.semester === 1 && s.subject && s.subject.id === subject.id)
    }
    const handleAddStatement = async (e) => {
        if (statements.find((x) => x.subject_id === subject.id && x.semester === parseInt(e.target.value))){

        } else {
            const resultAction = await dispatch(createStatement({
                subject_id: subject.id,
                year: dayjs().$M > 8 ? dayjs().$y : dayjs().$y-1,
                semester: parseInt(e.target.value)
            }));
            if (createStatement.fulfilled.match(resultAction)){
                // setNotification('Успішно оновлено!');
                navigate('/subjects/'+subject.id)
            }
        }
        console.log(statements)
    }

    const {user} = useSelector(state => state.currentUser)
    return (
        <>
            <Tabs value={selectedTab} onChange={handleTabChange}
                  indicatorColor="primary">
                <Tab label="Завдання"/>
                <Tab label="Відомість"/>
            </Tabs>
            {selectedTab === 0 && (
                <Grid container spacing={2} sx={{pt: 4}}>
                    {subject && subject.tasks && subject.tasks.length > 0 ? subject.tasks.map((task) => (
                            <Grid key={task.id} item xs={12}>
                                <TaskCard task={task}
                                          openDeleteDialog={openDialogDeleteTask}
                                          onOpenDeleteDialog={handleClickOpenDialogDeleteTask}
                                          onCloseDeleteDialog={handleCloseDialogDeleteTask}
                                />
                            </Grid>
                        )) :
                        <>
                            <Typography sx={{pl:3, pt:4}} variant="h4" color="grey">Завдання відсутні</Typography>
                        </>}
                </Grid>
            )}
            {selectedTab === 1 && (
                <div style={{paddingTop: "20px"}}>
                    {user.role === "admin" &&
                        <>
                            {semester_1 && semester_2 ? ""
                                : semester_1 ? <Button value={1} variant="contained" onClick={handleAddStatement}>
                                        Створити відомість 2 семестр
                                    </Button>
                                    :
                                    <Button value={0} variant="contained" onClick={handleAddStatement}>
                                        Створити відомість 1 семестр
                                    </Button>}
                        </>
                    }
                    {semester_1 && semester_2 ? <TwoSemesters first_semester={semester_1} second_semester={semester_2} students={students}/>
                        : semester_1 ? <OneSemester students={students} statement={semester_1}/>
                            : semester_2 ? <OneSemester statement={semester_2}/> :
                                user.role === 'teacher' &&
                                    <Typography variant="h5" color="grey">Відомості відсутні. Зверніться до адміністратора.</Typography>
                            }
                </div>
            )}
            {notification && (
            <Notification notification={!!notification}
                          hideDuration={2000} handleCloseAlert={handleCloseAlert}
                          text={notification}/>
            )}
        </>
    );
}
