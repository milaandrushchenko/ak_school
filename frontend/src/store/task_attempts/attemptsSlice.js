import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axiosClient from "../../axios-client.js";
import {updateSubject} from "../subject/subjectsSlice.js";

const initialState = {
    attempts: [],
    task: {},
    visibleData: [],
    errors: null,
    isLoading: true,
    status: 'idle',
}

//           СПРРОБИ ЗАДАНЬ
export const getAttempts = createAsyncThunk('tasks/getTasks',
    async (_, {rejectWithValue}) => {
        try {
            const res = await axiosClient.get('/tasks');
            return res.data;
        } catch (error) {
            if (!error.response) return rejectWithValue("Не вдалося з'єднатися з сервером.");
            const {errors} = error.response.data;
            return rejectWithValue(errors);
        }
    });
export const updateAttempt = createAsyncThunk("tasks/updateTaskAttempt",
    async ({attempt_id, values}, {rejectWithValue}) => {
        console.log(values)
        try {
            const res = await axiosClient.put(`/tasks/update-attempt/${attempt_id}`, values)
            console.log(res.data)
            return res.data;
        } catch (error) {
            if (!error.response) return rejectWithValue("Не вдалося з'єднатися з сервером.");
            const {errors} = error.response.data;
            return rejectWithValue(errors);
        }
    });



const attemptsSlice = createSlice({
    name: "attempts",
    initialState,
    reducers: {
        clearErrors: (state) => {
            state.errors = null;
        },
        reset: (state) => {
            state.attempts = [];
            state.task = null;
            state.visibleData = state.attempts;
            state.errors = null;
        },
        getTaskById: (state, {payload}) => {
            state.task = state.visibleData.find(task => task.id === parseInt(payload))
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAttempts.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getAttempts.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.attempts = action.payload.data;
            state.visibleData = state.attempts;
            state.isLoading = false;
        });
        builder.addCase(getAttempts.rejected, (state, action) => {
            state.status = 'rejected';
            state.errors = action.payload;
            state.isLoading = false;
        });
        builder.addCase(updateAttempt.pending, (state) => {
            //state.isLoading = true;
        });
        builder.addCase(updateAttempt.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.attempts = state.attempts.map(attempt =>
                attempt.id === action.payload.id ? action.payload : attempt)
            state.visibleData = state.attempts;
        });
        builder.addCase(updateAttempt.rejected, (state, action) => {
            state.status = 'rejected';
            state.errors = action.payload;
        });

        // builder.addCase(updateTask.pending, (state) => {})
        // builder.addCase(updateTask.fulfilled, (state, action) => {
        //     state.status = 'succeeded';
        //     state.subject.tasks = state.subject.tasks.map(task => task.id === action.payload.id ? action.payload : task);
        // })
        // builder.addCase(updateTask.rejected, (state, action) => {
        //     state.status = 'rejected';
        //     state.errors = action.payload;
        // })
    }
})
export const {clearErrors, reset, getTaskById} = attemptsSlice.actions;
export default attemptsSlice.reducer;