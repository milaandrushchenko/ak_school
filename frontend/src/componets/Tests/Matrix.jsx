import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import {ukrainianLetters} from "../../utils/common.js";
import TableBody from "@mui/material/TableBody";
import Checkbox from "@mui/material/Checkbox";
import React, {useEffect} from "react";

export default function Matrix({options, selectedOptions, onChange}) {
    console.log(selectedOptions);
    const handleChange = (leftUuid, rightUuid, e) => {
        if (onChange !== undefined) {
            onChange(leftUuid, rightUuid, e);
        }
    }

    return (
        <>
            <TableContainer sx={{
                maxWidth: "100%",
                overflowX: "auto",
            }}>
                <Table sx={{width: "auto", tableLayout: "fixed", borderCollapse: "collapse"}}>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{borderBottom: "none"}}/>
                            {options?.rightColumn.map((rightItem, index) => (
                                <TableCell key={rightItem.uuid} sx={{
                                    width: 30,
                                    textAlign: "center",
                                    fontWeight: "bold",
                                    borderBottom: "none"
                                }}>
                                    {ukrainianLetters[index]}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {options?.leftColumn.map((leftItem, leftIndex) => (
                            <TableRow key={leftItem.uuid} sx={{borderBottom: "none"}}>
                                <TableCell sx={{
                                    width: 30,
                                    textAlign: "left",
                                    fontWeight: "bold",
                                    borderBottom: "none",
                                    padding: 0
                                }}>{leftIndex + 1}</TableCell>
                                {options?.rightColumn.map((rightItem) => (
                                    <TableCell key={rightItem.uuid} sx={{
                                        width: 30,
                                        textAlign: "center",
                                        borderBottom: "none",
                                        padding: 0
                                    }}>
                                        <Checkbox
                                            checked={selectedOptions.some(([left, right]) => left === leftItem.uuid && right === rightItem.uuid)}
                                            onChange={(e) => handleChange(leftItem.uuid, rightItem.uuid, e)}
                                        />
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}