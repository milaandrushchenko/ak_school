import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import StatementTableRowDouble from "./StatementTableRowDouble.jsx";
import React from "react";

export default function TwoSemesters({first_semester, second_semester, students}){

    return (
        <>
            <TableContainer component={Paper} sx={{mt:3}}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{fontWeight: "bold", fontSize: "1.2em"}}>Учень</TableCell>
                            <TableCell sx={{fontWeight: "bold", fontSize: "1.2em"}} align="center">1 семестр</TableCell>
                            <TableCell sx={{fontWeight: "bold", fontSize: "1.2em"}} align="center">2 семестр</TableCell>
                            <TableCell sx={{fontWeight: "bold", fontSize: "1.2em"}} align="center">Річна</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {students && students.map((s) =>
                            <StatementTableRowDouble
                                key={s.id}
                                first_score={first_semester.session_scores.find(score => score.student_id === s.id)}
                                first_semester_id={first_semester.id}
                                second_score={second_semester.session_scores.find(score => score.student_id === s.id)}
                                second_semester_id={second_semester.id}
                                student={s}/>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}