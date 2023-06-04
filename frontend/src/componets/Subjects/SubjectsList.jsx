import Grid from "@mui/material/Grid";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import SubjectCard from "./SubjectCard.jsx";
import {useNavigate} from "react-router-dom";
import {searchClass} from "../../store/class/classesSlice.js";
import {searchSubject} from "../../store/subject/subjectsSlice.js";
import Typography from "@mui/material/Typography";
import styles from "../../styles/Grid.module.css";


const SubjectsList = () => {
    const navigate = useNavigate();
    const {user, userToken} = useSelector((state) => state.currentUser)
    // const hasPermission = user.permissions?.includes("view subjects") || user.permissions?.includes("view assigned subjects");

    // useEffect(() => {
    //     if (!userToken || !hasPermission) {
    //         navigate("/");
    //     }
    // }, [userToken, hasPermission, navigate]);

    const dispatch = useDispatch();

    const {subjects, isLoading, visibleData} = useSelector((state) => state.subjects)
    console.log(subjects)

    const [notification, setNotification] = useState(false);

    const [open, setOpen] = useState(false);

    const [searchValue, setSearchValue] = useState('');

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(6);

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {return;}
        setNotification(false);
    };
    const handleSearch = (event) => {
        setSearchValue(event.target.value);
    };
    const onClickReset = () => {
        setSearchValue('');
    };
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const handleDelete = () => {
        setNotification('Предмет був успішно видалений');
    }
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = (value) => {
        setOpen(false);
        if (value) setNotification('Предмет успішно додано!');
    };

    const displayedSubjects = visibleData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    useEffect(() => {
        dispatch(searchSubject(searchValue));
    }, [searchValue])



    return (
        <>
            <Grid container justifyContent="space-between"
                  style={{flexWrap: 'wrap', paddingBottom: 5}}
                  className={styles['no-padding-top']}>
                <Grid item xs={6} lg={8} style={{alignItems: 'end', paddingBottom: 5}}
                      className={styles['no-padding-top']}>
                    <Typography component="h2" variant="h4" color="primary" py="30px" gutterBottom>
                        ПРЕДМЕТИ
                    </Typography>
                </Grid>


            </Grid>




            <Grid container spacing={2}>
                {subjects.map((subject) => (
                    <Grid key={subject.id} item xs={12} sm={6} md={4}>
                        <SubjectCard subjectItem={subject}/>
                    </Grid>
                ))}
            </Grid>
        </>
    );
}

export default SubjectsList;