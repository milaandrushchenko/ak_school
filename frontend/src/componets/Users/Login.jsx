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
import {useEffect, useState} from "react";
import {clearErrors, loginUser} from "../../store/user/currentUserSlice.js";
import {Navigate} from "react-router-dom";
import {Alert, AlertTitle, FormHelperText} from "@mui/material";
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {createUser} from "../../store/user/usersSlice.js";


const initialValues = {
    login: '',
    password: '',
};

const validationSchema = Yup.object().shape({
    login: Yup.string().required('Поле логіну є обов\'язковим для заповнення.').min(2, 'Логін занадто кориткий'),
    password: Yup.string().min(6, 'Пароль має містити принаймі 6 символів').max(55, 'Пароль занадто короткий.').required('Поле паролю є обов\'язковим для заповнення.'),
});
export default function Login() {
    const dispatch = useDispatch();

    const {userToken} = useSelector((state) => state.currentUser)
    let errorsServer = useSelector((state) => state.currentUser.errors)

    if (userToken) {
        return <Navigate to='/'/>
    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values, {setErrors, setSubmitting}) => {
            dispatch(loginUser(values));
            dispatch(clearErrors());
        },
    });

    useEffect(() => {
        formik.setErrors({...formik.errors, ...errorsServer});
    }, [errorsServer]);

    return (
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
                            З поверненням
                        </Typography>
                        <Box component="form" noValidate onSubmit={formik.handleSubmit}
                             sx={{mt: 1}}>
                            {errorsServer?.message && (
                                <Alert severity='error'>
                                    <AlertTitle>Помилка</AlertTitle>
                                    {errorsServer.message}
                                </Alert>
                            )}
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="login"
                                label="Ваш логін"
                                name="login"
                                autoFocus
                                value={formik.values.login}
                                onChange={formik.handleChange}
                                error={formik.touched.login && Boolean(formik.errors?.login)}
                                helperText={formik.touched.login && formik.errors && formik.errors.login}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Пароль"
                                type="password"
                                id="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                error={formik.touched.password && Boolean(formik.errors?.password)}
                                helperText={formik.touched.password && formik.errors && formik.errors.password}
                            />
                            {/*    control={<Checkbox value="remember" color="primary"/>}*/}
                            {/*    label="Remember me"*/}
                            {/*/>*/}
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                            >
                                Увійти
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
    );
}