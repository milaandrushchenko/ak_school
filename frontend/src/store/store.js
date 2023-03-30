import { configureStore } from '@reduxjs/toolkit'
import usersSlice from "./user/usersSlice.js";

export const store = configureStore({
    reducer: {
        user: usersSlice,
    },
    // middleware: (getDefaultMiddleware) =>
    //     getDefaultMiddleware({
    //         serializableCheck: false, // вимкнути перевірку на серіалізованість дій та стану
    //     }),
})