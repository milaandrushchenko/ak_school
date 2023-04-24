import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {me} from "../store/user/currentUserSlice.js";
import DashboardContent from "./Dashboard/DashboardContent.jsx";
import {getUsers} from "../store/user/usersSlice.js";
import {getClasses} from "../store/class/classesSlice.js";

export default function DefaultLayout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {userToken, user} = useSelector((state) => state.currentUser)

    if (!userToken) {
        navigate("/login");
    }
    console.log(userToken);

    useEffect(() => {
        dispatch(me());

    }, [])

    useEffect(() => {
        if (user.role === 'admin') {
            dispatch(getUsers());
            dispatch(getClasses());
        }
    }, [user]);

    return (
        <>{userToken && <DashboardContent/>}</>
    )
}