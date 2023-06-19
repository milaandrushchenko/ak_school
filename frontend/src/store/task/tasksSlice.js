import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axiosClient from "../../axios-client.js";

const initialState = {
    task: {},
    tasks: [],
    visibleData: [],
    errors: null,
    isLoading: true,
    status: 'idle',
}

export const getTasks = createAsyncThunk(
    "tasks/getTasks",
    async (_, {rejectWithValue}) => {
        try {
            const res = await axiosClient.get('/tasks');
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
)

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        clearErrors: (state) => {
            state.errors = null;
        },
        reset: (state) => {
            state.tasks = [];
            state.visibleData = state.tasks;
            state.errors = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getTasks.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getTasks.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.tasks = action.payload.data;
            state.visibleData = state.tasks;
            state.isLoading = false;
        });
        builder.addCase(getTasks.rejected, (state, action) => {
            state.status = 'rejected';
            state.errors = action.payload;
            state.isLoading = false;
        });
    }
})

export const {clearErrors, reset} = tasksSlice.actions;
export default tasksSlice.reducer