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
import {clearErrors, createUser, updateUser} from "../../store/user/usersSlice.js";
import {getRoles} from "../../store/role/rolesSlice.js";
import {FormikProvider, useFormik, useFormikContext} from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    login: Yup.string().required('Поле логіну є обов\'язковим для заповнення.').max(55, 'Логін занадто довгий').min(2, 'Логін занадто короткий').matches(/^\S*$/, 'Ви не межете використовувати пробіли'),
    password: Yup.string().min(6, 'Пароль має містити принаймі 6 символів').max(100, 'Пароль занадто довгий').required('Поле паролю є обов\'язковим для заповнення.'),
    first_name: Yup.string().min(2, 'Ім\'я має містити принаймі 2 символи').max(55, 'Ім\'я занадто довге').required('Поле імені є обов\'язковим для заповнення').matches(/^[A-Za-zа-яА-ЯЁёіІїЇєЄґҐ]+$/, 'Для введення дозволенні лише літери'),
    second_name: Yup.string().min(2, 'Прізвище має містити принаймі 2 символи').max(55, 'Прізвище занадто довге').required('Поле прізвище є обов\'язковим для заповнення').matches(/^[A-Za-zа-яА-ЯЁёіІїЇєЄґҐ]+$/, 'Для введення дозволенні лише літери'),
    role: Yup.string().required('Оберіть роль для користувача.'),
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

export default function UserForm({user, open, onClose}) {
    const dispatch = useDispatch();

    const [showPassword, setShowPassword] = useState(false);

    const roles = useSelector((state) => state.role.roles)
    let errorsServer = useSelector((state) => state.users.errors)

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const getPassword = (length) => {
        formik.setFieldValue('password', generatePassword(length));
    }

    const close = (value) => {
        onClose(value);
        dispatch(clearErrors());
        formik.resetForm(initialValues);
        formik.setErrors({});
    }

    useEffect(() => {
        dispatch(getRoles());
    }, []);

    const formik = useFormik({
        initialValues: user ? {...user} : {...initialValues},
        validationSchema,
        onSubmit: async (values, {setErrors, setSubmitting}) => {
            if (!user) {
                const resultAction = await dispatch(createUser(values));
                if (createUser.fulfilled.match(resultAction)) {
                    close(true);
                }
            } else {
                let data = Object.assign({}, values);
                delete data.password;
                let id = data.id;
                const resultAction = await dispatch(updateUser({id, data}));
                if (updateUser.fulfilled.match(resultAction)) {
                    console.log('user updated');
                    close(true);
                }
            }
        },
    });

    useEffect(() => {
        formik.setErrors({...formik.errors, ...errorsServer});
    }, [errorsServer]);

    return (
        <>
            <Dialog
                open={open}
                onClose={()=>close(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <FormikProvider value={formik}>
                    <form onSubmit={formik.handleSubmit}>
                        <DialogTitle id="alert-dialog-title">
                            {user ? "Редагування користувача" : "Створення користувача"}
                        </DialogTitle>
                        <DialogContent>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="login"
                                name="login"
                                label="Логін"
                                type="text"
                                fullWidth
                                value={formik.values.login}
                                onChange={formik.handleChange}
                                error={formik.touched.login && Boolean(formik.errors?.login)}
                                helperText={formik.touched.login && formik.errors && formik.errors.login}
                            />
                            {!user && <Grid container spacing={2} alignItems="center"
                                            alignContent={"center"}>
                                <Grid item xs={7}>
                                    <TextField margin="dense"
                                               id="password"
                                               name="password"
                                               label="Пароль"
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
                                            variant="contained">Згенерувати</Button>
                                </Grid>
                            </Grid>
                            }

                            <FormControl fullWidth sx={{marginTop: 2}}
                                         error={formik.touched.role && Boolean(formik.errors?.role)}>
                                <InputLabel id="role-label">Роль</InputLabel>
                                <Select
                                    labelId="role-label"
                                    id="role"
                                    name="role"
                                    label="Роль"
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
                                               label="Ім'я"
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
                                               label="Прізвище"
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
                                    onClick={() => close(false)}>Відмінити</Button>
                            <Button type="submit" variant="contained" color="success"
                                    autoFocus>
                                {user ? 'Зберегти' : 'Додати'}
                            </Button>
                        </DialogActions>
                    </form>
                </FormikProvider>
            </Dialog>
        </>
    )
}