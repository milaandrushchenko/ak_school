import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    FormHelperText,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    Snackbar,
    TextField
} from "@mui/material";
import Grid from "@mui/material/Grid";
import {Visibility, VisibilityOff} from '@mui/icons-material';
import IconButton from "@mui/material/IconButton";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import MuiAlert from '@mui/material/Alert';
import {generatePassword} from '../../utils/common'
import {useDispatch, useSelector} from "react-redux";
import {clearErrors, createUser} from "../../store/user/usersSlice.js";
import {getRoles} from "../../store/role/rolesSlice.js";


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function AddUser({open, onClose}) {
    const dispatch = useDispatch();
    const defaultUser = {
        login: '',
        password: '',
        role: '',
        first_name: '',
        second_name: '',
    };

    const [user, setUser] = useState(defaultUser);
    const [notification, setNotification] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const roles = useSelector((state) => state.role.roles)
    let errors = useSelector((state) => state.user.errors)


    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const getPassword = (length) => {
        setUser({...user, password: generatePassword(length)});
    }

    const close = () => {
        onClose();
        setUser(defaultUser);
        dispatch(clearErrors());
    }

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setNotification(false);
    };

    const handleChange = ({target: {value, name}}) => {
        setUser({...user, [name]: value});
    };
    const handleSubmit = async (event) => {
        event.preventDefault();

        const resultAction = await dispatch(createUser(user));
        if (createUser.fulfilled.match(resultAction)) {
            setNotification(true);
            close();
        }
    };

    useEffect(() => {
        dispatch(getRoles());
    }, []);

    return (
        <>
            <Dialog
                open={open}
                onClose={close}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <form onSubmit={handleSubmit}>
                    <DialogTitle id="alert-dialog-title">
                        {"Adding a user"}
                    </DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="login"
                            name="login"
                            label="Login"
                            type="text"
                            fullWidth
                            value={user.login}
                            onChange={handleChange}
                            error={errors?.login ? true : false}
                        />
                        {errors?.login && <FormHelperText error>{errors?.login}</FormHelperText>}
                        <Grid container spacing={2} alignItems="center" alignContent={"center"}>
                            <Grid item xs={7}>
                                <TextField margin="dense"
                                           id="password"
                                           name="password"
                                           label="Password"
                                           type={showPassword ? 'text' : 'password'}
                                           fullWidth
                                           InputProps={{
                                               endAdornment: (
                                                   <InputAdornment position="end">
                                                       <IconButton
                                                           onClick={handleClickShowPassword}
                                                           onMouseDown={(e) => e.preventDefault()}
                                                       >
                                                           {showPassword ? <VisibilityOff/> :
                                                               <Visibility/>}
                                                       </IconButton>
                                                   </InputAdornment>
                                               ),
                                           }}
                                           sx={{width: '100%'}}
                                           value={user.password}
                                           onChange={handleChange}
                                           error={errors?.password ? true : false}
                                />
                                {errors?.password &&
                                    <FormHelperText error>{errors?.password}</FormHelperText>}
                            </Grid>
                            <Grid item xs={5}>
                                <Button fullWidth sx={{width: '100%'}}
                                        onClick={() => getPassword(10)}
                                        variant="contained">Generate</Button>
                            </Grid>
                        </Grid>

                        <FormControl fullWidth sx={{marginTop: 2}} error={Boolean(errors?.role)}>
                            <InputLabel id="role-label">Role</InputLabel>
                            <Select
                                labelId="role-label"
                                id="role"
                                name="role"
                                label="Role"
                                value={user.role}
                                onChange={handleChange}
                            >
                                {roles?.map(role => (
                                    <MenuItem key={role.id}
                                              value={role.name}>{role.name}</MenuItem>
                                ))}
                            </Select>
                            {errors?.role && <FormHelperText>{errors.role}</FormHelperText>}
                        </FormControl>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField margin="dense"
                                           id="first_name"
                                           name="first_name"
                                           sx={{mr: 12}}
                                           label="First Name"
                                           type="text"
                                           fullWidth
                                           value={user.first_name}
                                           onChange={handleChange}
                                           error={errors?.first_name ? true : false}
                                />
                                {errors?.first_name &&
                                    <FormHelperText error>{errors?.first_name}</FormHelperText>}
                            </Grid>
                            <Grid item xs={6}>
                                <TextField margin="dense"
                                           id="second_name"
                                           name="second_name"
                                           label="Last Name"
                                           type="text"
                                           fullWidth
                                           value={user.second_name}
                                           onChange={handleChange}
                                           error={errors?.second_name ? true : false}
                                />
                                {errors?.second_name &&
                                    <FormHelperText error>{errors?.second_name}</FormHelperText>}
                            </Grid>
                        </Grid>

                    </DialogContent>
                    <DialogActions>
                        <Button variant="outlined" color="error"
                                onClick={() => close()}>Cansel</Button>
                        <Button type="submit" variant="contained" color="success"
                                autoFocus>
                            Add
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
            {notification && (
                <Snackbar open={notification} autoHideDuration={3000} onClose={handleCloseAlert}>
                    <Alert onClose={handleCloseAlert} severity="success" sx={{
                        width: '300px',
                        position: 'fixed',
                        bottom: '20px',
                        right: '20px',
                    }}>
                        User successfully added!
                    </Alert>
                </Snackbar>
            )}
        </>
    )
}