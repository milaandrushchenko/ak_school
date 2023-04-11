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
import {FormikProvider, useFormik, useFormikContext} from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    login: Yup.string().required('The login field is required.').max(55, 'Too long').min(2, 'Too short'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').max(55, 'Too long').required('The password field is required.'),
    first_name: Yup.string().min(2, 'First name must be at least 6 characters').max(55, 'Too long').required('The first name field is required.'),
    second_name: Yup.string().min(2, 'Second name must be at least 6 characters').max(55, 'Too long').required('The second name field is required.'),
    role: Yup.string().required('Role is required.'),
});
const initialValues = {
    login: '',
    password: '',
    role: '',
    first_name: '',
    second_name: '',
};
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function List({open, onClose}) {
    const dispatch = useDispatch();

    const [notification, setNotification] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const roles = useSelector((state) => state.role.roles)
    let errorsServer = useSelector((state) => state.users.errors)

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const getPassword = (length) => {
        formik.setFieldValue('password', generatePassword(length));
    }

    const close = () => {
        onClose();
        dispatch(clearErrors());
        formik.resetForm(initialValues);
        formik.setErrors({});
    }

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setNotification(false);
    };

    useEffect(() => {
        dispatch(getRoles());
    }, []);

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values,{ setErrors,setSubmitting  }) => {
            const resultAction = await dispatch(createUser(values));
            if (createUser.fulfilled.match(resultAction)) {
                setNotification(true);
                close();
            }
        },
    });

    useEffect(() => {
        formik.setErrors({ ...formik.errors, ...errorsServer });
    }, [errorsServer]);

    return (
        <>
            <Dialog
                open={open}
                onClose={close}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <FormikProvider value={formik}>
                    <form onSubmit={formik.handleSubmit}>
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
                                value={formik.values.login}
                                onChange={formik.handleChange}
                                error={formik.touched.login && Boolean(formik.errors?.login)}
                                helperText={formik.touched.login && formik.errors && formik.errors.login}
                            />
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
                                               value={formik.values.password}
                                               onChange={formik.handleChange}
                                               error={formik.touched.password && Boolean(formik.errors?.password)}
                                               helperText={formik.touched.password && formik.errors && formik.errors.password}
                                    />
                                </Grid>
                                <Grid item xs={5}>
                                    <Button fullWidth sx={{width: '100%'}}
                                            onClick={() => getPassword(10)}
                                            variant="contained">Generate</Button>
                                </Grid>
                            </Grid>

                            <FormControl fullWidth sx={{marginTop: 2}}
                                         error={formik.touched.role && Boolean(formik.errors?.role)}>
                                <InputLabel id="role-label">Role</InputLabel>
                                <Select
                                    labelId="role-label"
                                    id="role"
                                    name="role"
                                    label="Role"
                                    value={formik.values.role}
                                    onChange={formik.handleChange}
                                >
                                    {roles?.map(role => (
                                        <MenuItem key={role.id}
                                                  value={role.name}>{role.name}</MenuItem>
                                    ))}
                                </Select>
                                {formik.touched.role && Boolean(formik.errors?.role) &&
                                    <FormHelperText>{formik.touched.role && formik.errors && formik.errors.role}</FormHelperText>}
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
                                               value={formik.values.first_name}
                                               onChange={formik.handleChange}
                                               error={formik.touched.first_name && Boolean(formik.errors?.first_name)}
                                               helperText={formik.touched.first_name && formik.errors && formik.errors.first_name}

                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField margin="dense"
                                               id="second_name"
                                               name="second_name"
                                               label="Last Name"
                                               type="text"
                                               fullWidth
                                               value={formik.values.second_name}
                                               onChange={formik.handleChange}
                                               error={formik.touched.second_name && Boolean(formik.errors?.second_name)}
                                               helperText={formik.touched.second_name && formik.errors && formik.errors.second_name}
                                    />
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
                </FormikProvider>
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