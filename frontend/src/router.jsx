import {createBrowserRouter, Navigate} from "react-router-dom";
import DefaultLayout from "./componets/DefaultLayout.jsx";
import GuestLayout from "./componets/GuestLayout.jsx";
import UsersList from "./componets/Users/UsersList.jsx";
import Login from "./componets/Users/Login.jsx";
import ClassesList from "./componets/Classes/ClassesList.jsx";
import TestsList from "./componets/Tests/TestsList.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout/>,
        children: [
            {
                path: '/dashboard',
                element: <Navigate to="/"/>
            },

            {
                path: "/users",
                element: <UsersList/>
            },
            {
                path: "/roles",
                element: <UsersList/>
            },
            {
                path: "/permissions",
                element: <UsersList/>
            },
            {
                path: "/classes",
                element: <ClassesList/>
            },
            {
                path: "/tests",
                element: <TestsList/>
            },
        ]
    },
    {
        path: '/',
        element: <GuestLayout/>,
        children: [
            {
                path: '/login',
                element: <Login/>
            },
        ]
    },
    {},
]);

export default router;