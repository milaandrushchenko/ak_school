import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axiosClient from "../../axios-client.js";
import {createUser, deleteUser, getUsers, updateUser} from "../user/usersSlice.js";

const initialState = {
    tests: [],
    visibleData: [],
    errors: null,
    isLoading: true,
    status: 'idle',
}

export const createTest = createAsyncThunk(
    "tests/createTest",
    async (payload, {rejectWithValue}) => {
        try {
            console.log(payload);
            const res = await axiosClient.post('/tests', payload);
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

export const getTests = createAsyncThunk(
    "tests/getTests",
    async (_, {rejectWithValue}) => {
        try {
            const res = await axiosClient.get('/tests');
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

const testsSlice = createSlice({
    name: "tests",
    initialState,
    reducers: {
        clearErrors: (state) => {
            state.errors = null;
        },
        reset: (state) => {
            state.tests = [];
            state.visibleData = state.classes;
            state.errors = null;
        },
        searchTest: (state, {payload}) => {
            state.visibleData = state.tests.filter(
                (item) =>
                    item.name.toLowerCase().includes(payload.toLowerCase())
            );
        },
    },
    extraReducers: (builder) => {
        builder.addCase(createTest.pending, (state) => {
            // state.isLoading = true;
        });
        builder.addCase(createTest.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.tests.unshift(action.payload);
            state.visibleData.unshift(action.payload);
        });
        builder.addCase(createTest.rejected, (state, action) => {
            state.status = 'rejected';
            state.errors = action.payload;
        });
        builder.addCase(getTests.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getTests.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.tests = action.payload.data;
            state.visibleData = state.tests;
            state.isLoading = false;
        });
        builder.addCase(getTests.rejected, (state, action) => {
            state.status = 'rejected';
            state.errors = action.payload;
            state.isLoading = false;
        });
    },
});

export const {clearErrors, reset, searchTest} = testsSlice.actions;

export default testsSlice.reducer;