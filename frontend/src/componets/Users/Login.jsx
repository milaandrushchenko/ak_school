import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import styles from '../../styles/Navlink.module.css';
import {jsx} from "@emotion/react";
import classNames from "classnames";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {loginUser} from "../../store/user/currentUserSlice.js";
import {Navigate} from "react-router-dom";
import {Alert, AlertTitle, FormHelperText} from "@mui/material";


const theme = createTheme({
    palette: {
        primary: {
            main: '#1a237e',
        },
        secondary: {
            main: '#2A38C9',
        },
    },
});

export default function Login() {

    const {userToken} = useSelector((state) => state.currentUser)
    let errors = useSelector((state) => state.currentUser.errors)

    if (userToken) {
        return <Navigate to='/'/>
    }
    const dispatch = useDispatch();
    const defaultUser = {
        login: '',
        password: '',
    };

    const [user, setUser] = useState(defaultUser);

    const handleChange = ({target: {value, name}}) => {
        setUser({...user, [name]: value});
    };
    const handleSubmit = (event) => {
        event.preventDefault();

        dispatch(loginUser(user));
        console.log(user);
    };

    return (
        <ThemeProvider theme={theme}>
            <Grid container maxWidth="md" sx={{
                height: '100vh',
                margin: '0 auto',
            }} component={Paper} elevation={6} square>
                <CssBaseline/>
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: `url(/login.svg)`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'contain',
                        backgroundColor: 'white',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5}
                      sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: 'rgba(75, 81, 147, 0.1)'
                      }}>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            height: '100hv',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                            <LockOutlinedIcon/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Welcome back
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 1}}>
                            {errors?.message && (
                                <Alert severity='error' >
                                    <AlertTitle>Error</AlertTitle>
                                    {errors.message}
                                </Alert>
                            )}
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="login"
                                label="Your login"
                                name="login"
                                autoComplete="login"
                                autoFocus
                                value={user.login}
                                onChange={handleChange}
                                error={errors?.login ? true : false}
                            />
                            {errors?.login && <FormHelperText error>{errors?.login}</FormHelperText>}
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={user.password}
                                onChange={handleChange}
                                error={errors?.password ? true : false}
                            />
                            {errors?.password && <FormHelperText error>{errors?.password}</FormHelperText>}
                            {/*<FormControlLabel*/}
                            {/*    control={<Checkbox value="remember" color="primary"/>}*/}
                            {/*    label="Remember me"*/}
                            {/*/>*/}
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    {/*<Link href="#" variant="body2">*/}
                                    {/*    Forgot password?*/}
                                    {/*</Link>*/}
                                </Grid>
                                <Grid item>
                                    {/*<Link href="#" variant="body2">*/}
                                    {/*    {"Don't have an account? Sign Up"}*/}
                                    {/*</Link>*/}
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}