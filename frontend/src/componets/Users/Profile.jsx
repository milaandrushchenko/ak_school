import React from "react";
import { useSelector } from "react-redux";
import Grid from '@mui/material/Grid';
import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

export default function Profile() {
    const { user } = useSelector((state) => state.currentUser);

    return (
        <Grid container>
            <Grid item xs={12} lg={8}>
                <Typography component="h2" variant="h4" color="primary" py="30px">
                    З поверненням!
                </Typography>
                <TableContainer>
                    <Table stickyHeader aria-label="sticky table">
                        <TableBody>
                            <TableRow hover tabIndex={-1}>
                                <TableCell>Логін</TableCell>
                                <TableCell>{user.login}</TableCell>
                            </TableRow>
                            <TableRow hover tabIndex={-1}>
                                <TableCell>Ім'я</TableCell>
                                <TableCell>{user.first_name}</TableCell>
                            </TableRow>
                            <TableRow hover tabIndex={-1}>
                                <TableCell>Прізвище</TableCell>
                                <TableCell>{user.second_name}</TableCell>
                            </TableRow>
                            <TableRow hover tabIndex={-1}>
                                <TableCell>Роль</TableCell>
                                <TableCell>{user.role}</TableCell>
                            </TableRow>
                            {user.role === "student" && (
                                <TableRow hover tabIndex={-1}>
                                    <TableCell>Клас</TableCell>
                                    <TableCell>
                                        {Array.isArray(user.class)
                                            ? user.class.length > 0
                                                ? user.class.map((cls) => cls.name).join(" ")
                                                : "-"
                                            : user.class?.name ?? "-"}
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    );
}
