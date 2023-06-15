import {useSelector} from "react-redux";
import {Chip, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material";
import React from "react";
import {NavLink} from "react-router-dom";

export default function StudentJournal({subjects}){
    const {user} = useSelector((state) => state.currentUser)
    return (
        <>
            {subjects.map((subject) => (
                <div key={subject.id}>
                    <Typography sx={{mb:2, mt:4}} variant="h4" color="primary">{subject.name}</Typography>
                    {subject.tasks.length > 0 ?
                        <TableContainer component={Paper}>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{fontWeight: "bold", fontSize: "1.2em"}}>Завдання</TableCell>
                                        <TableCell sx={{fontWeight: "bold", fontSize: "1.2em"}} align="right">Оцінка</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {subject.tasks.map((row) => (
                                        <TableRow key={row.id}
                                                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            <TableCell component="th" scope="row">
                                                <NavLink to={"/task/" + row.id} color="primary" style={{textDecoration: "none"}}>{row.name}</NavLink>
                                            </TableCell>
                                            <TableCell align="right">
                                                {row.attempts && row.attempts.attempts.find((a) => a.student_id ===user.id ).score &&
                                                row.attempts.attempts.find((a) => a.student_id ===user.id ).score !== '0.00' ?
                                                    <Chip sx={{fontWeight:"bold"}} color="primary"
                                                          label={row.attempts.attempts.find((a) => a.student_id ===user.id ).score}/> : ""}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        : <Typography variant="h5" color="grey" sx={{p:1, backgroundColor: "lightGrey", borderRadius: 1}}>Завдання відсутні</Typography>}
                </div>
            ))}
        </>
    );
}