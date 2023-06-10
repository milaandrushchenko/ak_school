import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {me} from "../store/user/currentUserSlice.js";
import DashboardContent from "./Dashboard/DashboardContent.jsx";
import {fetchStudentsWithoutClass, getUsers} from "../store/user/usersSlice.js";
import {getClasses} from "../store/class/classesSlice.js";
import {getTests} from "../store/test/testsSlice.js";
import {getSubjects} from "../store/subject/subjectsSlice.js";
import {getTasks} from "../store/task/tasksSlice.js";


export default function DefaultLayout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {userToken, user} = useSelector((state) => state.currentUser)

    if (!userToken) {
        navigate("/login");
    }

    useEffect(() => {
        dispatch(me());
        dispatch(getUsers());
        dispatch(getClasses());
        dispatch(getTests());
        dispatch(getSubjects());
        dispatch(getTasks());

    }, [])

    useEffect(() => {
        if (user.role === 'admin') {

        }
    }, [user]);

    return (
        <>{userToken && <DashboardContent/>}</>
    )
}