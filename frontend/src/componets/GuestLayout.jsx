import {useSelector} from "react-redux";
import {Navigate, Outlet} from "react-router-dom";
import Login from "./Users/Login.jsx";

export default function GuestLayout() {
    const {userToken} = useSelector((state) => state.currentUser)

    if (userToken) {
        return <Navigate to='/'/>
    }
    return (
        <>
            <Login/>
        </>
    )
}