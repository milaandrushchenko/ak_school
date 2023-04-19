import {
    Button,
    Dialog, DialogActions,
    DialogContent,
    DialogTitle
} from "@mui/material";
import React, {useState} from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {useDispatch} from "react-redux";
import {generateNewPassword} from "../../store/user/usersSlice.js";
import {generatePassword} from "../../utils/common.js";

const modalRoot = document.querySelector('#root');

export default function ShowUser({user, open, onClose}) {
    const dispatch = useDispatch();

    const [password, setPassword] = useState('');

    const onSubmit = async () => {
        if (password) {
            const updatedUser = {...user, password: password};
            const resultAction = await dispatch(generateNewPassword({
                id: user.id,
                user: updatedUser
            }));
            if (generateNewPassword.fulfilled.match(resultAction)) {
                console.log('password updated');

            }
        }
        onClose();

    }
    const getPassword = (length) => {
        setPassword(generatePassword(length));
    }


    return (
        <>
            <Dialog
                open={open}
                onClose={onClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Дані користувача"}
                </DialogTitle>
                <DialogContent>
                    <TableContainer>
                        <Table stickyHeader aria-label="sticky table">
                            {/*<TableHead>*/}
                            {/*    <TableRow>*/}
                            {/*        {columns.map((column) => (*/}
                            {/*            <TableCell*/}
                            {/*                key={column.id}*/}
                            {/*                align={column.align}*/}
                            {/*                style={{ minWidth: column.minWidth }}*/}
                            {/*            >*/}
                            {/*                {column.label}*/}
                            {/*            </TableCell>*/}
                            {/*        ))}*/}
                            {/*    </TableRow>*/}
                            {/*</TableHead>*/}
                            <TableBody>
                                <TableRow hover tabIndex={-1}>
                                    <TableCell>
                                        Логін
                                    </TableCell>
                                    <TableCell>
                                        {user.login}
                                    </TableCell>
                                </TableRow>
                                <TableRow hover tabIndex={-1}>
                                    <TableCell>
                                        Ім'я
                                    </TableCell>
                                    <TableCell>
                                        {user.first_name}
                                    </TableCell>
                                </TableRow>
                                <TableRow hover tabIndex={-1}>
                                    <TableCell>
                                        Прізвище
                                    </TableCell>
                                    <TableCell>
                                        {user.second_name}
                                    </TableCell>
                                </TableRow>
                                <TableRow hover tabIndex={-1}>
                                    <TableCell>
                                        Поштова скринька
                                    </TableCell>
                                    <TableCell>
                                        {user.email ? user.email : '—'}
                                    </TableCell>
                                </TableRow>
                                <TableRow hover tabIndex={-1}>
                                    <TableCell>
                                        Роль
                                    </TableCell>
                                    <TableCell>
                                        {user.role}
                                    </TableCell>
                                </TableRow>
                                <TableRow hover tabIndex={-1}>
                                    <TableCell>
                                        Групи
                                    </TableCell>
                                    <TableCell>
                                        -
                                    </TableCell>
                                </TableRow>
                                <TableRow hover tabIndex={-1}>
                                    <TableCell>
                                        Статус
                                    </TableCell>
                                    <TableCell>
                                        {user.status.title}
                                    </TableCell>
                                </TableRow>
                                <TableRow hover tabIndex={-1}>
                                    <TableCell>
                                        Пароль
                                    </TableCell>
                                    <TableCell>
                                        <div>{password}</div>
                                        <Button fullWidth sx={{width: '100%'}}
                                                onClick={() => getPassword(10)}
                                                variant="contained">Згенерувати новий</Button>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" color="secondary"
                            onClick={onSubmit}>OK</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
