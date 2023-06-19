import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import React from "react";
import StatementTableRowSingle from "./StatementTableRowSingle.jsx";

export default function OneSemester({statement, students}){
    return (
        <>
            <TableContainer component={Paper} sx={{mt:3}}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{fontWeight: "bold", fontSize: "1.2em"}}>Учень</TableCell>
                            <TableCell sx={{fontWeight: "bold", fontSize: "1.2em"}} align="center">1 семестр</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {students && students.map((s) =>
                            <StatementTableRowSingle
                                statement={statement}
                                key={s.id}
                                student={s}
                                score={statement.session_scores.find(score => score.student_id === s.id)}
                            />
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}