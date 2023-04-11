import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axiosClient from "../../axios-client.js";
import {loginUser} from "./currentUserSlice.js";
import {getComparator, stableSort} from "../../utils/filtering.js";

const initialState = {
    users: [],
    visibleData: [],
    meta: [],
    errors: null,
    isLoading: false,
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
            const {errors} = error.response.data;
            return rejectWithValue(errors);
        }

    }
);

export const getUsers = createAsyncThunk(
    "users/getUsers",
    async (_, {rejectWithValue}) => {
        try {
            const res = await axiosClient.get(`/users`);
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
// export const getUsers = createAsyncThunk(
//     "users/getUsers",
//     async ({page,perPage}, {rejectWithValue}) => {
//         try {
//             const res = await axiosClient.get(`/users?page=${page}&per_page=${perPage}`);
//             return res.data;
//         } catch (error) {
//             if (!error.response) {
//                 // Якщо немає відповіді від сервера
//                 return rejectWithValue("Не вдалося з'єднатися з сервером.");
//             }
//             const {errors} = error.response.data;
//             return rejectWithValue(errors);
//         }
//
//     }
// );

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        clearErrors: (state) => {
            state.errors = null;
        },
        searchUsers: (state, {payload}) => {
            state.visibleData = state.users.filter(
                (item) =>
                    item.first_name.toLowerCase().includes(payload.toLowerCase()) ||
                    item.second_name.toLowerCase().includes(payload.toLowerCase()) ||
                    item.login.toLowerCase().includes(payload.toLowerCase())
            );
        },
        sortUsers: (state, {payload}) => {
            state.visibleData = stableSort(
                state.visibleData,
                getComparator(payload.order, payload.orderBy),
            );
        },
    },
    extraReducers: (builder) => {
        builder.addCase(createUser.pending, (state) => {
            //state.isLoading = true;
        });
        builder.addCase(createUser.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.users.push(action.payload);
            state.visibleData.push(action.payload);
            //state.isLoading = false;
        });
        builder.addCase(createUser.rejected, (state, action) => {
            state.status = 'rejected';
            state.errors = action.payload;
            //state.isLoading = false;
        });
        builder.addCase(getUsers.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getUsers.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.users = action.payload.data;
            state.visibleData = action.payload.data;
            state.meta = action.payload.meta;
            state.isLoading = false;
        });
        builder.addCase(getUsers.rejected, (state, action) => {
            state.status = 'rejected';
            state.errors = action.payload;
            state.isLoading = false;
        });
    },
});

export const {clearErrors, searchUsers,sortUsers} = usersSlice.actions;

export default usersSlice.reducer;