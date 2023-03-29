import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, FormControl, InputAdornment, InputLabel, MenuItem, Select, TextField
} from "@mui/material";
import Grid from "@mui/material/Grid";
import {Visibility, VisibilityOff} from '@mui/icons-material';
import IconButton from "@mui/material/IconButton";
import {useState} from "react";

export default function AddUser({open, onClose}) {
    const [user, setUser] = useState({
        id: null,
        login: '',
        password: '',
        role: '',
        first_name: '',
        last_name: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const generatePassword = (length) => {
        const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
        const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const numericChars = '0123456789';
        const specialChars = '!@#$%^&*()_+~`|}{[]\:;?><,./-=';

        let validChars = '';
        let password = '';

        validChars = lowercaseChars + uppercaseChars + numericChars + specialChars;

        // Generate password
        for (let i = 0; i < length; i++) {
            password += validChars.charAt(Math.floor(Math.random() * validChars.length));
        }

        setUser({...user, password: password});
    }

    const close = () => {
        onClose();
        setUser({
            id: null,
            login: '',
            password: '',
            role: '',
            first_name: '',
            last_name: '',
        });
    }


    return (
        <>
            <Dialog
                open={open}
                onClose={close}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Adding a user"}
                </DialogTitle>
                <DialogContent>
                    {/*<DialogContentText id="alert-dialog-description">*/}
                    {/*    Let Google help apps determine location. This means sending anonymous*/}
                    {/*    location data to Google, even when no apps are running.*/}
                    {/*</DialogContentText>*/}
                    <TextField
                        autoFocus
                        margin="dense"
                        id="login"
                        label="Login"
                        type="text"
                        fullWidth
                        //value={login}
                        //onChange={(event) => setLogin(event.target.value)}
                    />
                    <Grid container spacing={2} alignItems="center" alignContent={"center"}>
                        <Grid item xs={7}>
                            <TextField margin="dense"
                                       id="password"
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
                                //onChange={(event) => setPassword(event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={5}>
                            <Button fullWidth sx={{width: '100%'}}
                                    onClick={() => generatePassword(10)}
                                    variant="contained">Generate</Button>
                        </Grid>
                    </Grid>

                    <FormControl fullWidth sx={{marginTop: 2}}>
                        <InputLabel id="role-label">Role</InputLabel>
                        <Select
                            labelId="role-label"
                            id="role"
                            label="Role"
                            // value={role}
                            //onChange={(event) => setRole(event.target.value)}
                        >
                            <MenuItem value="admin">Admin</MenuItem>
                            <MenuItem value="user">User</MenuItem>
                        </Select>
                    </FormControl>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField margin="dense"
                                       id="firstName"
                                       sx={{mr: 12}}
                                       label="First Name"
                                       type="text"
                                       fullWidth
                                //value={firstName}
                                //onChange={(event) => setFirstName(event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField margin="dense"
                                       id="lastName"
                                       label="Last Name"
                                       type="text"
                                       fullWidth
                                //value={lastName}
                                //onChange={(event) => setLastName(event.target.value)}
                            />
                        </Grid>
                    </Grid>

                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" color="error" onClick={onClose}>Cansel</Button>
                    <Button variant="contained" color="success" onClick={onClose} autoFocus>
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}