import {useDispatch, useSelector} from "react-redux";
import { useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {me} from "../store/user/currentUserSlice.js";
import DashboardContent from "./Dashboard/DashboardContent.jsx";

export default function DefaultLayout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {userToken} = useSelector((state) => state.currentUser)

    if (!userToken) {
        navigate("/login");
    }


    useEffect(() => {
        dispatch(me());
    }, [dispatch])

    return (
        <>
            <DashboardContent/>
        </>
    )
}