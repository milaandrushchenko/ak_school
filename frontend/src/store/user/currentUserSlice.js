import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axiosClient from "../../axios-client.js";
import {currencyPairs} from "@mui/x-data-grid-generator";

const initialState = {
    user: [],
    userToken: localStorage.getItem('ACCESS_TOKEN' || ''),
    errors: null,
    status: 'idle',
}


export const loginUser = createAsyncThunk(
    "currentUser/loginUser",
    async (payload, {rejectWithValue}) => {
        try {
            const res = await axiosClient.post(`/login`, payload);
            console.log(res.data);
            return res.data;
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

export const me = createAsyncThunk(
    "currentUser/me",
    async (_, {rejectWithValue}) => {
        try {
            const res = await axiosClient.get(`/me`);
            console.log(res.data);
            return res.data;
        } catch (error) {
            console.log(error);
            if (!error.response) {
                // Якщо немає відповіді від сервера
                return rejectWithValue("Не вдалося з'єднатися з сервером.");
            }
            const {errors} = error.response.data;
            return rejectWithValue(errors);
        }
    }
);

export const logoutUser = createAsyncThunk(
    "currentUser/logout",
    async (_, {rejectWithValue}) => {
        try {
            const res = await axiosClient.post(`/logout`);
            console.log(res.data);
            return res.data;
        } catch (error) {
            console.log(error);
            if (!error.response) {
                // Якщо немає відповіді від сервера
                return rejectWithValue("Не вдалося з'єднатися з сервером.");
            }
            const {errors} = error.response.data;
            return rejectWithValue(errors);
        }
    }
);


const currentUserSlice = createSlice({
    name: "currentUser",
    initialState,
    reducers: {
        clearErrors: (state) => {
            state.errors = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload.user;
                console.log(action.payload);
                state.userToken = action.payload.token;
                localStorage.setItem('ACCESS_TOKEN', action.payload.token);
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'failed';
                state.errors = action.payload;
            })
            .addCase(me.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(me.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload.user;
            })
            .addCase(me.rejected, (state, action) => {
                state.status = 'failed';
                state.errors = action.payload;
            })
            .addCase(logoutUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(logoutUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = [];
                localStorage.removeItem('ACCESS_TOKEN');
                state.userToken = action.payload;

            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.status = 'failed';
                state.errors = action.payload;
            });
    },
});

export const {clearErrors} = currentUserSlice.actions;

export default currentUserSlice.reducer;