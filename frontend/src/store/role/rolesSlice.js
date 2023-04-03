import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axiosClient from "../../axios-client.js";

const initialState = {
    roles: [],
    status: 'idle',
}

export const getRoles = createAsyncThunk(
    "roles/getRoles",
    async (_, thunkAPI) => {
        try {
            const res = await axiosClient.get('/roles');
            //console.log(res.data.roles);
            return res.data.roles;
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

const rolesSlice = createSlice({
    name: "role",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getRoles.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.roles=(action.payload);
        })
    },
});

// export const { addItemToCart, toggleForm, toggleFormType, removeItemToCart } =
//     userSlice.actions;

export default rolesSlice.reducer;