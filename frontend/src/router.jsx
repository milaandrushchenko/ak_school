import {createBrowserRouter} from "react-router-dom";
import DefaultLayout from "./componets/DefaultLayout.jsx";
import GuestLayout from "./componets/GuestLayout.jsx";
import Dashboard from "./componets/Dashboard/Dashboard.jsx";
import UsersList from "./componets/Users/UsersList.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout/>,
        children: [
            {},
        ],
    },
    {
        path: '/',
        element: <GuestLayout/>,
        children: [
            /*  {
                  path: '/login',
                  element: <Login/>
              }*/
        ]
    },
    {
        path: "/dash",
        element: <Dashboard/>,
        children: [
            {
                path: "/dash/users",
                element: <UsersList/>
            },
            {
                path: "/dash/roles",
                element: <UsersList/>
            },
            {
                path: "/dash/permissions",
                element: <UsersList/>
            },
        ]
    },
    {},
]);

export default router;