import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axiosClient from "../../axios-client.js";
import {createUser, getUsers} from "../user/usersSlice.js";

const initialState = {
    classes: [],
    errors: null,
    isLoading: true,
    status: 'idle',
}

export const createClass = createAsyncThunk(
    "classes/createClass",
    async (payload, {rejectWithValue}) => {
        try {
            const res = await axiosClient.post('/classes', payload);
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
export const getClasses = createAsyncThunk(
    "classes/getClasses",
    async (_, {rejectWithValue}) => {
        try {
            const res = await axiosClient.get('/classes');
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
// axiosClient.post('/users', user)
//     .then(({data}) => {
//         setNotification("User was successfully created");
//         navigate('/users');
//     })
//     .catch(err => {
//         const response = err.response;
//         if (response && response.status === 422) {
//             setErrors(response.data.errors);
//         }
//     })

const classesSlice = createSlice({
    name: "classes",
    initialState,
    reducers: {
        clearErrors: (state) => {
            state.errors = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(createClass.pending, (state) => {
            // state.isLoading = true;
        });
        builder.addCase(createClass.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.classes.unshift(action.payload);
            // state.visibleData.push(action.payload);
            //state.isLoading = false;
        });
        builder.addCase(createClass.rejected, (state, action) => {
            state.status = 'rejected';
            state.errors = action.payload;
            //state.isLoading = false;
        });
        builder.addCase(getClasses.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getClasses.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.classes = action.payload.data;
            // state.visibleData = action.payload.data;
            // state.meta = action.payload.meta;
            state.isLoading = false;
        });
        builder.addCase(getClasses.rejected, (state, action) => {
            state.status = 'rejected';
            state.errors = action.payload;
            state.isLoading = false;
        });
    },
});

export const {clearErrors} = classesSlice.actions;

export default classesSlice.reducer;