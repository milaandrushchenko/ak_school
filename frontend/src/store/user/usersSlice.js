import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axiosClient from "../../axios-client.js";
import {loginUser} from "./currentUserSlice.js";
import {getComparator, stableSort} from "../../utils/filtering.js";
import {getRoles} from "../role/rolesSlice.js";

const initialState = {
    users: [],
    studentsWithoutClass: [],
    visibleData: [],
    meta: [],
    errors: null,
    isLoading: true,
    status: 'idle',
}

export const createUser = createAsyncThunk(
    "users/createUser",
    async (payload, {rejectWithValue}) => {
        try {
            const res = await axiosClient.post('/users/create', payload);
            return res.data;
        } catch (error) {
            if (!error.response) {
                // Якщо немає відповіді від сервера
                return rejectWithValue("Не вдалося з'єднатися з сервером.");
            }
            const {errors} = error.response.data;
            return rejectWithValue(errors);
        }

    }
);

export const updateUser = createAsyncThunk(
    "users/updateUser",
    async ({id, data}, {rejectWithValue}) => {
        try {
            const res = await axiosClient.put(`/users/${id}`, data);
            return res.data;
        } catch (error) {
            if (!error.response) {
                // Якщо немає відповіді від сервера
                return rejectWithValue("Не вдалося з'єднатися з сервером.");
            }
            const {errors} = error.response.data;
            return rejectWithValue(errors);
        }

    }
);

export const getUsers = createAsyncThunk(
    "users/getUsers",
    async (_, {rejectWithValue}) => {
        try {
            const res = await axiosClient.get(`/users`);
            return res.data;
        } catch (error) {
            if (!error.response) {
                // Якщо немає відповіді від сервера
                return rejectWithValue("Не вдалося з'єднатися з сервером.");
            }
            const {errors} = error.response.data;
            return rejectWithValue(errors);
        }

    }
);
export const fetchStudentsWithoutClass = createAsyncThunk(
    'users/fetchStudentsWithoutClass',
    async (classId, {rejectWithValue}) => {
        try {
            const res = await axiosClient.get(`/students-without-class/${classId}`);
            return res.data;
        } catch (error) {
            if (!error.response) {
                // Якщо немає відповіді від сервера
                return rejectWithValue("Не вдалося з'єднатися з сервером.");
            }
            const {errors} = error.response.data;
            return rejectWithValue(errors);
        }

    }
);
export const deleteUser = createAsyncThunk(
    "users/deleteUser",
    async ({id, user}, {rejectWithValue}) => {
        try {
            await axiosClient.delete(`/users/${id}`, user);
            return user;
        } catch (error) {
            if (!error.response) {
                // Якщо немає відповіді від сервера
                return rejectWithValue("Не вдалося з'єднатися з сервером.");
            }
            const errors = error.response.data;
            return rejectWithValue(errors.errors ? errors.errors : errors);
        }

    }
);
export const generateNewPassword = createAsyncThunk(
    "users/generateNewPassword",
    async ({id, user}, {rejectWithValue}) => {
        try {
            const res = await axiosClient.post(`/users/new-password/${id}`, user);
            return res.data;
        } catch (error) {
            if (!error.response) {
                // Якщо немає відповіді від сервера
                return rejectWithValue("Не вдалося з'єднатися з сервером.");
            }
            const {errors} = error.response.data;
            return rejectWithValue(errors);
        }

    }
);

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        clearErrors: (state) => {
            state.errors = null;
        },
        reset: (state) => {
            state.users = [];
            state.visibleData = state.users;
            state.errors = null;
        },
        searchUsers: (state, {payload}) => {
            state.visibleData = state.users.filter(
                (item) =>
                    item.first_name.toLowerCase().includes(payload.toLowerCase()) ||
                    item.second_name.toLowerCase().includes(payload.toLowerCase()) ||
                    item.login.toLowerCase().includes(payload.toLowerCase())
            );
        },
        sortUsers: (state, {payload}) => {
            state.visibleData = stableSort(
                state.visibleData,
                getComparator(payload.order, payload.orderBy),
            );
        },
    },
    extraReducers: (builder) => {
        builder.addCase(createUser.pending, (state) => {
            //state.isLoading = true;
        });
        builder.addCase(createUser.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.users.unshift(action.payload);
            state.visibleData.unshift(action.payload);
            //state.isLoading = false;
        });
        builder.addCase(createUser.rejected, (state, action) => {
            state.status = 'rejected';
            state.errors = action.payload;
            //state.isLoading = false;
        });
        builder.addCase(updateUser.pending, (state) => {
            //state.isLoading = true;
        });
        builder.addCase(updateUser.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.users = state.users.map(user => user.id === action.payload.data.id ? action.payload.data : user)
            state.visibleData = state.visibleData.map(user => user.id === action.payload.data.id ? action.payload.data : user)
        });
        builder.addCase(updateUser.rejected, (state, action) => {
            state.status = 'rejected';
            state.errors = action.payload;
        });
        builder.addCase(deleteUser.pending, (state) => {
            state.errors = null;

            //state.isLoading = true;
        });
        builder.addCase(deleteUser.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.users = state.users.filter(user => user.id !== action.payload.id);
            state.visibleData = state.users;
        });
        builder.addCase(deleteUser.rejected, (state, action) => {
            state.status = 'rejected';
            state.errors = action.payload.message ? action.payload.message : action.payload;
            console.log(state.errors);
        });
        builder.addCase(getUsers.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getUsers.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.users = action.payload.data;
            state.visibleData = action.payload.data;
            state.meta = action.payload.meta;
            state.isLoading = false;
        });
        builder.addCase(getUsers.rejected, (state, action) => {
            state.status = 'rejected';
            state.errors = action.payload;
            state.isLoading = false;
        });
        builder.addCase(fetchStudentsWithoutClass.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.studentsWithoutClass = action.payload.data;
        });
    },
});

export const {clearErrors, searchUsers, sortUsers, reset} = usersSlice.actions;

export default usersSlice.reducer;