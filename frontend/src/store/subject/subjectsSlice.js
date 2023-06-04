import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axiosClient from "../../axios-client.js";
import {deleteClass} from "../class/classesSlice.js";

const initialState = {
    subjects: [],
    visibleData: [],
    errors: null,
    isLoading: true,
    status: 'idle',
}

export const getSubjects = createAsyncThunk(
    "subjects/getSubjects",
    async (_, {rejectWithValue}) => {
        try {
            const res = await axiosClient.get('/subjects');
            return res.data;
        } catch (error) {
            if (!error.response) {
                return rejectWithValue("Не вдалося з'єднатися з сервером.");
            }
            const {errors} = error.response.data;
            return rejectWithValue(errors);
        }

    }
);

export const createSubject = createAsyncThunk(
    "subjects/createSubject",
    async (payload, {rejectWithValue}) => {
        try {
            console.log(payload);
            const res = await axiosClient.post('/subjects', payload);
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

export const updateSubject = createAsyncThunk(
    "subjects/updateSubject",
    async ({id, values}, {rejectWithValue}) => {
        try {
            const res = await axiosClient.put(`/subjects/${id}`, values);
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

export const deleteSubject = createAsyncThunk(
    "subjects/deleteSubject",
    async ({id, subjectItem}, {rejectWithValue}) => {
        try {
            const res = await axiosClient.delete(`/subjects/${id}`);
            console.log(res);
            return subjectItem;
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






const subjectsSlice = createSlice({
    name: "subjects",
    initialState,
    reducers: {
        clearErrors: (state) => {
            state.errors = null;
        },
        reset: (state) => {
            state.subjects = [];
            state.visibleData = state.subjects;
            state.errors = null;
        },
        searchSubject: (state, {payload}) => {
            state.visibleData = state.subjects.filter(
                (item) =>
                    item.name.toLowerCase().includes(payload.toLowerCase())
            );
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getSubjects.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getSubjects.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.subjects = action.payload.data;
            state.visibleData = state.subjects;
            state.isLoading = false;
        });
        builder.addCase(getSubjects.rejected, (state, action) => {
            state.status = 'rejected';
            state.errors = action.payload;
            state.isLoading = false;
        });

        builder.addCase(createSubject.pending, (state) => {
            // state.isLoading = true;
        });
        builder.addCase(createSubject.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.subjects.unshift(action.payload);
            state.visibleData.unshift(action.payload);
        });
        builder.addCase(createSubject.rejected, (state, action) => {
            state.status = 'rejected';
            state.errors = action.payload;
        });

        builder.addCase(updateSubject.pending, (state) => {
            //state.isLoading = true;
        });
        builder.addCase(updateSubject.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.subjects = state.subjects.map(subjectItem =>
                subjectItem.id === action.payload.id ? action.payload : subjectItem)
            state.visibleData = state.subjects;
        });
        builder.addCase(updateSubject.rejected, (state, action) => {
            state.status = 'rejected';
            state.errors = action.payload;
        });

        builder.addCase(deleteSubject.pending, (state) => {
            //state.isLoading = true;
        });
        builder.addCase(deleteSubject.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.subjects = state.subjects.filter(subjectItem => subjectItem.id !== action.payload.id);
            state.visibleData = state.subjects;
        });
        builder.addCase(deleteSubject.rejected, (state, action) => {
            state.status = 'rejected';
            state.errors = action.payload;
        });
    }
})
export const {clearErrors, reset, searchSubject} = subjectsSlice.actions;
export default subjectsSlice.reducer;