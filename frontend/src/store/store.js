import { configureStore } from '@reduxjs/toolkit'
import usersSlice from "./user/usersSlice.js";
import rolesSlice from "./role/rolesSlice.js";

export const store = configureStore({
    reducer: {
        user: usersSlice,
        role: rolesSlice,
    },
    // middleware: (getDefaultMiddleware) =>
    //     getDefaultMiddleware({
    //         serializableCheck: false, // вимкнути перевірку на серіалізованість дій та стану
    //     }),
})