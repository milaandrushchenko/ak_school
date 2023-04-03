import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axiosClient from "../../axios-client.js";

const initialState = {
    users: [],
    errors: null,
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
            const { errors } = error.response.data;
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

const usersSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        clearErrors: (state) => {
            state.errors = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(createUser.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.users.push(action.payload);
        });
        builder.addCase(createUser.rejected, (state, action) => {
            state.status = 'rejected';
            state.errors = action.payload;
        });
    },
});

export const {clearErrors} = usersSlice.actions;

export default usersSlice.reducer;