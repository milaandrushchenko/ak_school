import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import {clearErrors} from "../../../store/subject/subjectsSlice.js";
import {useDispatch} from "react-redux";
import {FormikProvider, useFormik} from "formik";
import dayjs from "dayjs";
import React from "react";
import * as Yup from "yup";


export default function FormStatement({open, onClose, semester, subject}){
    const dispatch = useDispatch();
    const initialValues = {
        semester: semester,
        subject_id: subject.id,
        year: dayjs().$M > 8 ? dayjs().$y : dayjs().$y-1
    }
    const validationSchema = Yup.object({
        year: Yup.number().min(2000, 'Введіть більший рік').max(dayjs().$y + 1, 'Введіть менший рік')
    })
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema,
        onSubmit: async (values, {setErrors, setSubmitting}) => {
            console.log(values)
        }
    })

    const close = (value) => {
        onClose(value);
        dispatch(clearErrors());
        formik.resetForm(initialValues);
        formik.setErrors({});
    }
    return (
        <>
            <Dialog
                open={open}
                onClose={() => close(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <FormikProvider value={formik}>
                    <form onSubmit={formik.handleSubmit}>
                        <DialogTitle id="alert-dialog-title">Створення відомості</DialogTitle>
                        <DialogContent sx={{ minWidth: '400px', width: '100%' }}>
                            <TextField sx={{width: "100%", mt:2}}
                                id="year" name="year" label="Початок навчального року"
                                variant="outlined" type="number"
                                value={formik.values.year ? parseInt(formik.values.year) : undefined}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                inputProps={{ inputMode: 'numeric', step: "1", min: 2000, max: dayjs().$y + 1}}>
                            </TextField>
                        </DialogContent>
                        <DialogActions>
                            <Button variant="outlined" color="error" onClick={() => close(false)}>
                                Відмінити
                            </Button>
                            <Button type="submit" variant="contained" color="success" autoFocus>
                                Додати
                            </Button>
                        </DialogActions>
                    </form>
                </FormikProvider>
            </Dialog>
        </>
    )

}