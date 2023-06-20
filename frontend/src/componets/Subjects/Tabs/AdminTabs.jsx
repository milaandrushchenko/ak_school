import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    Card,
    CardContent,
    CardHeader, Chip,
    Paper,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tabs,
    Typography
} from "@mui/material";
import Grid from "@mui/material/Grid";
import TaskCard from "../Tasks/TaskCard.jsx";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {createStatement} from "../../../store/statement/statementSlice.js";
import dayjs from "dayjs";
import TwoSemesters from "../Statements/TwoSemesters.jsx";
import OneSemester from "../Statements/OneSemester.jsx";
import Notification from "../../core/Notification.jsx";
import {NavLink, useNavigate} from "react-router-dom";
import {ExpandMore} from "@mui/icons-material";


export default function AdminTabs({subject}){
    const [notification, setNotification] = useState(false);
    const dispatch = useDispatch();

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
        if (value) setNotification('Завдання успішно видалено!');
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
                setNotification('Успішно оновлено!');
                navigate('/subjects/'+subject.id)
            }
        }
        console.log(statements)
    }

    const {user} = useSelector(state => state.currentUser)
    const {classes} = useSelector((state)=> state.classes)
    const {attempts, isLoading} = useSelector((state) => state.tasks)
    return (
        <>
            <Tabs value={selectedTab} onChange={handleTabChange}
                  indicatorColor="primary">
                <Tab label="Завдання"/>
                <Tab label="Журнал"/>
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
                <>
                    {subject.tasks.length > 0 ?
                        <div style={{paddingTop: "30px"}}>
                            {subject.classes.map((cls)=>(
                                <div key={cls.id} style={{marginBottom:10}}>
                                    <Accordion>
                                        <AccordionSummary  expandIcon={<ExpandMore/>} sx={{borderBottom: "1px solid lightGrey"}}>
                                            {classes ? classes.find((c) => c.id === cls.id).name : ""}
                                        </AccordionSummary>
                                        <AccordionDetails sx={{backgroundColor: "#f5f5f5"}}>
                                            <TableContainer component={Paper}>
                                                <Table aria-label="simple table">
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell sx={{fontWeight: "bold", fontSize: "1.2em"}}>Завдання</TableCell>
                                                            {classes.find((q) => q.id === cls.id).students ? classes.find((q) => q.id === cls.id).students.map((s)=>(
                                                                <TableCell key={s.id} sx={{fontWeight: "bold"}} align="center">{s.second_name} {s.first_name}</TableCell>
                                                            )):""}
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {subject.tasks.map((t)=>(
                                                            <TableRow key={t.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                                <TableCell component="th" scope="row" sx={{fontWeight:"bold"}}>
                                                                    <NavLink to={"/task/" + t.id} color="primary" style={{textDecoration: "none"}}>{t.name}</NavLink>
                                                                </TableCell>
                                                                {classes.find((q) => q.id === cls.id).students ? classes.find((q) => q.id === cls.id).students.map((s)=>(
                                                                    <TableCell key={s.id} align="center">
                                                                        {!attempts.find((ts) => ts.id === t.id).attempts.find((x) => x.student_id === s.id).score ? "-" :
                                                                        <Chip label={attempts.find((ts) => ts.id === t.id).attempts.find((x) => x.student_id === s.id).score.split('.')[0]}/>}
                                                                        {/*<Chip label={typeof task.attempts === 'undefined' ? "-" :*/}
                                                                        {/*    task.attempts.find((a) => a.student_id === s.id).score.split('.')[0]} sx={{opacity: "0.75"}}/>*/}
                                                                    </TableCell>
                                                                )): ""}
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </AccordionDetails>
                                    </Accordion>
                                </div>
                            ))}
                        </div>
                        : <Typography variant="h5" color="grey" sx={{p:1, backgroundColor: "lightGrey", borderRadius: 1}}>Завдання відсутні</Typography>}
                </>
            )}
            {selectedTab === 2 && (
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
