import {useSelector} from "react-redux";
import {
    Accordion, AccordionDetails, AccordionSummary, Chip, Paper, Typography,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from "@mui/material";
import {ExpandMore} from "@mui/icons-material";
import React from "react";
import {NavLink} from "react-router-dom";
import StudentJournal from "./StudentJournal";
import AdminJournal from "./AdminJournal";


export default function Journal() {
    const {user} = useSelector((state) => state.currentUser)
    const {attempts} = useSelector((state) => state.tasks)
    const {subjects, isLoading} = useSelector((state) => state.subjects)
    const {classes} = useSelector((state)=> state.classes)
    let subj = JSON.parse(JSON.stringify(subjects));
    if (!isLoading)
        subj.map((s)=>{
            s.tasks.map((t) => {
                t.attempts = attempts.find((a)=>a.id===t.id)
            })
            if (user.role === 'admin' || user.role === 'teacher')
                s.classes.map((c)=>{
                    const cls = classes.find((cls) => cls.id === c.id)
                    c.students = cls ? cls.students : null
                    c.name = cls ? cls.name : null
                })
        })
    return (
        <>
            {!isLoading &&
                <>
                    {user.role === 'admin' || user.role === 'teacher' ? <AdminJournal subjects={subj}/>
                        : user.role === 'student' ?
                            <StudentJournal subjects={subj}/>
                            : ""}
                </>
            }
        </>
    );
}