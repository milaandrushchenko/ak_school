import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axiosClient from "../../axios-client.js";
import {createUser, deleteUser, getUsers, updateUser} from "../user/usersSlice.js";

const initialState = {
    classes: [],
    visibleData: [],
    errors: null,
    isLoading: true,
    status: 'idle',
}

export const createClass = createAsyncThunk(
    "classes/createClass",
    async (payload, {rejectWithValue}) => {
        try {
            console.log(payload);
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
export const deleteClass = createAsyncThunk(
    "classes/deleteClass",
    async ({id, classItem}, {rejectWithValue}) => {
        try {
            const res = await axiosClient.delete(`/classes/${id}`);
            console.log(res);
            return classItem;
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

export const updateClass = createAsyncThunk(
    "classes/updateClass",
    async ({id, values}, {rejectWithValue}) => {
        try {
            const res = await axiosClient.put(`/classes/${id}`, values);
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
const classesSlice = createSlice({
    name: "classes",
    initialState,
    reducers: {
        clearErrors: (state) => {
            state.errors = null;
        },
        reset: (state) => {
            state.classes = [];
            state.visibleData = state.classes;
            state.errors = null;
        },
        searchClass: (state, {payload}) => {
            state.visibleData = state.classes.filter(
                (item) =>
                    item.name.toLowerCase().includes(payload.toLowerCase())
            );
        },
    },
    extraReducers: (builder) => {
        builder.addCase(createClass.pending, (state) => {
            // state.isLoading = true;
        });
        builder.addCase(createClass.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.classes.unshift(action.payload);
            state.visibleData.unshift(action.payload);
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
            state.visibleData = state.classes;
            // state.visibleData = action.payload.data;
            // state.meta = action.payload.meta;
            state.isLoading = false;
        });
        builder.addCase(getClasses.rejected, (state, action) => {
            state.status = 'rejected';
            state.errors = action.payload;
            state.isLoading = false;
        });
        builder.addCase(deleteClass.pending, (state) => {
            //state.isLoading = true;
        });
        builder.addCase(deleteClass.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.classes = state.classes.filter(classItem => classItem.id !== action.payload.id);
            state.visibleData = state.classes;
        });
        builder.addCase(deleteClass.rejected, (state, action) => {
            state.status = 'rejected';
            state.errors = action.payload;
        });
        builder.addCase(updateClass.pending, (state) => {
            //state.isLoading = true;
        });
        builder.addCase(updateClass.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.classes = state.classes.map(classItem => classItem.id === action.payload.id ? action.payload : classItem)
            state.visibleData = state.classes;
        });
        builder.addCase(updateClass.rejected, (state, action) => {
            state.status = 'rejected';
            state.errors = action.payload;
        });
    },
});

export const {clearErrors, reset, searchClass} = classesSlice.actions;

export default classesSlice.reducer;