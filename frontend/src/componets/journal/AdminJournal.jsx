import {useSelector} from "react-redux";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Card,
    CardContent,
    CardHeader, Chip,
    Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Typography
} from "@mui/material";
import {NavLink} from "react-router-dom";
import React from "react";
import {ExpandMore} from "@mui/icons-material";

export default function AdminJournal({subjects}){
    const {classes} = useSelector((state)=> state.classes)
    const {tests} = useSelector((state)=>state.tests)
    console.log(tests)
    return (
        <Grid container>
            {subjects.map((subject) => (
                <Grid item xs={12} key={subject.id}>
                    <Typography sx={{mb:2, mt:4}} variant="h4" color="primary">{subject.name}</Typography>
                    {subject.tasks.length > 0 ?
                        <>
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
                                                            {cls.students ? cls.students.map((s)=>(
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
                                                                {cls.students ? cls.students.map((s)=>(
                                                                    <TableCell key={s.id} align="center">
                                                                        {t ? typeof t.attempts.attempts.find((a) => a.student_id === s.id) === 'undefined' ? "-" : t.attempts.attempts.find((a) => a.student_id === s.id).score || t.attempts.attempts.find((a) => a.student_id === s.id).score === '0.00'
                                                                            ?
                                                                            <Chip label={t.attempts.attempts.find((a) => a.student_id === s.id).score.split('.')[0]} sx={{opacity: "0.75"}}
                                                                                  color={parseInt(t.attempts.attempts.find((a) => a.student_id === s.id).score.split('.')[0]) <=6 ? "error" :
                                                                                      parseInt(t.attempts.attempts.find((a) => a.student_id === s.id).score.split('.')[0]) <= 9 ? "primary" : "success"
                                                                                  }
                                                                            />
                                                                            : "" : ""}
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
                        </>
                        : <Typography variant="h5" color="grey" sx={{p:1, backgroundColor: "lightGrey", borderRadius: 1}}>Завдання відсутні</Typography>}
                </Grid>))
            }
        </Grid>
    );
}