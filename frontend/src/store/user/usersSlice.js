import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axiosClient from "../../axios-client.js";

const initialState = {
    users: [],
    status: 'idle',
}

export const createUser = createAsyncThunk(
    "users/createUser",
    async (payload, thunkAPI) => {
        try {
            const res = await axiosClient.post('/users', payload);
            return res.data;
        } catch (err) {
            console.log(err);
            return thunkAPI.rejectWithValue(err);
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
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createUser.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.users.push(action.payload);
        })
    },
});

// export const { addItemToCart, toggleForm, toggleFormType, removeItemToCart } =
//     userSlice.actions;

export default usersSlice.reducer;