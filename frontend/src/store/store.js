import { configureStore } from '@reduxjs/toolkit'
import usersSlice from "./user/usersSlice.js";
import rolesSlice from "./role/rolesSlice.js";
import currentUserSlice from "./user/currentUserSlice.js";
import classesSlice from "./class/classesSlice.js";
import testsSlice from "./test/testsSlice.js";
import subjectsSlice from "./subject/subjectsSlice.js";
import attemptsSlice from "./task_attempts/attemptsSlice.js";
import statementSlice from "./statement/statementSlice.js";

export const store = configureStore({
    reducer: {
        users: usersSlice,
        currentUser: currentUserSlice,
        role: rolesSlice,
        classes: classesSlice,
        tests: testsSlice,
        subjects: subjectsSlice,
        tasks: attemptsSlice,
        statements: statementSlice,
    },
    // middleware: (getDefaultMiddleware) =>
    //     getDefaultMiddleware({
    //         serializableCheck: false, // вимкнути перевірку на серіалізованість дій та стану
    //     }),
})