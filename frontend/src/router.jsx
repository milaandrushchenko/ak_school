import {createBrowserRouter} from "react-router-dom";
import DefaultLayout from "./componets/DefaultLayout.jsx";
import GuestLayout from "./componets/GuestLayout.jsx";

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
]);

export default router;