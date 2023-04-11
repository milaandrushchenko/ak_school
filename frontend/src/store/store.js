import { configureStore } from '@reduxjs/toolkit'
import usersSlice from "./user/usersSlice.js";
import rolesSlice from "./role/rolesSlice.js";
import currentUserSlice from "./user/currentUserSlice.js";

export const store = configureStore({
    reducer: {
        users: usersSlice,
        currentUser: currentUserSlice,
        role: rolesSlice,
    },
    // middleware: (getDefaultMiddleware) =>
    //     getDefaultMiddleware({
    //         serializableCheck: false, // вимкнути перевірку на серіалізованість дій та стану
    //     }),
})