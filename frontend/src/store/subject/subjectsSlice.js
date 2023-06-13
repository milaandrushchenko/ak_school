import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axiosClient from "../../axios-client.js";

const initialState = {
    subjects: [],
    subject: {},
    visibleData: [],
    errors: null,
    isLoading: true,
    status: 'idle',
}

//           П Р Е Д М Е Т И
export const getSubjects = createAsyncThunk("subjects/getSubjects",
    async (_, {rejectWithValue}) => {
        try {
            const res = await axiosClient.get('/subjects');
            // console.log(res.data)
            return res.data;
        } catch (error) {
            if (!error.response) {
                return rejectWithValue("Не вдалося з'єднатися з сервером.");
            }
            const {errors} = error.response.data;
            return rejectWithValue(errors);
        }

    });
export const createSubject = createAsyncThunk("subjects/createSubject",
    async (payload, {rejectWithValue}) => {
        try {
            // console.log(payload)
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

    });
export const updateSubject = createAsyncThunk("subjects/updateSubject",
    async ({id, values}, {rejectWithValue}) => {
        try {
            // console.log(values)
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

    });
export const deleteSubject = createAsyncThunk("subjects/deleteSubject",
    async ({id, subjectItem}, {rejectWithValue}) => {
        try {
            const res = await axiosClient.delete(`/subjects/${id}`);
            // console.log(res);
            return subjectItem;
        } catch (error) {
            if (!error.response) {
                // Якщо немає відповіді від сервера
                return rejectWithValue("Не вдалося з'єднатися з сервером.");
            }
            const {errors} = error.response.data;
            return rejectWithValue(errors);
        }

    });


//           З А В Д А Н Н Я
export const getAttempts = createAsyncThunk('tasks/getTasks',
    async (_, {rejectWithValue}) => {
        try {
            const res = await axiosClient.get('/tasks');
            // console.log(res.data)
            return res.data;
        } catch (error) {
            if (!error.response) {
                return rejectWithValue("Не вдалося з'єднатися з сервером.");
            }
            const {errors} = error.response.data;
            return rejectWithValue(errors);
        }
    });
export const createTask = createAsyncThunk("tasks/createTask",
    async ({subject_id, values}, {rejectWithValue}) => {
        try {
            const res = await axiosClient.post(`/subjects/create-task/${subject_id}`, values);
            console.log(res.data)
            return res.data;
        } catch (error) {
            if (!error.response) {
                // Якщо немає відповіді від сервера
                return rejectWithValue("Не вдалося з'єднатися з сервером.");
            }
            const {errors} = error.response.data;
            return rejectWithValue(errors);
        }
    });
export const updateTask = createAsyncThunk("tasks/updateTask",
    async ({task_id, values}, {rejectWithValue}) => {
        try {
            const res = await axiosClient.put(`/subjects/update-task/${task_id}`, values);
            console.log(res.data);
            return res.data;
        } catch (error) {
            if (!error.response) {
                return rejectWithValue("Не вдалося з'єднатися з сервером.");
            }
            const {errors} = error.response.data;
            return rejectWithValue(errors);
        }
    })
export const deleteTask = createAsyncThunk("tasks/deleteTask",
    async ({task_id, task}, {rejectWithValue}) => {
        try {
            await axiosClient.delete(`/subjects/delete-task/${task_id}`, task);
            return task;
        } catch (error) {
            if (!error.response) return rejectWithValue("Не вдалося з'єднатися з сервером.");
            const {errors} = error.response.data;
            return rejectWithValue(errors);
        }
    })


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
        getSubjectById: (state, {payload}) => {
            state.subject = state.visibleData.find(subj => subj.id === parseInt(payload))
        }
    },
    extraReducers: (builder) => {
        //           П Р Е Д М Е Т И
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


//           З А В Д А Н Н Я
        builder.addCase(createTask.pending, (state) =>{
            // state.isLoading = true;
        });
        builder.addCase(createTask.fulfilled, (state, action) =>{
            state.status = 'succeeded';
            state.subject.tasks.push(action.payload);
        });
        builder.addCase(createTask.rejected, (state, action) => {
            state.status = 'rejected';
            state.errors = action.payload;
        });
        builder.addCase(updateTask.pending, (state) => {})
        builder.addCase(updateTask.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.subject.tasks = state.subject.tasks.map(task => task.id === action.payload.id ? action.payload : task);
        })
        builder.addCase(updateTask.rejected, (state, action) => {
            state.status = 'rejected';
            state.errors = action.payload;
        })
        builder.addCase(deleteTask.pending, (state) => {})
        builder.addCase(deleteTask.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.subject.tasks = state.subject.tasks.filter(task => task.id !== action.payload.id);
        })
        builder.addCase(deleteTask.rejected, (state, action) => {
            state.status = 'rejected';
            state.errors = action.payload;
        })



    }
})
export const {clearErrors, reset, searchSubject, getSubjectById} = subjectsSlice.actions;
export default subjectsSlice.reducer;