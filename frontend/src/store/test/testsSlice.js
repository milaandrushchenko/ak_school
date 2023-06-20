import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axiosClient from "../../axios-client.js";
import {createUser, deleteUser, getUsers, updateUser} from "../user/usersSlice.js";
import {deleteClass} from "../class/classesSlice.js";
import {da} from "date-fns/locale";

const initialState = {
    test: {},
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
            const res = await axiosClient.post('/tests/create', payload);
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

export const updateTest = createAsyncThunk(
    "tests/updateTest",
    async ({id, formData}, {rejectWithValue}) => {
        try {
            const res = await axiosClient.put(`/tests/${id}`, formData);
            console.log(res.data);
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

export const deleteTest = createAsyncThunk(
    "tests/deleteTest",
    async ({id, test}, {rejectWithValue}) => {
        try {
            const res = await axiosClient.delete(`/tests/${id}`);
            console.log(res);
            return test;
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
            console.log(res.data);
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

export const getTestBySlug = createAsyncThunk(
    "tests/getTestBySlug",
    async ({slug}, {rejectWithValue}) => {
        try {
            const res = await axiosClient.get(`tests/get-by-slug/${slug}`);
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


export const changeTestStatus = createAsyncThunk(
    "tests/changeTestStatus",
    async ({id}, {rejectWithValue}) => {
        try {
            const res = await axiosClient.post(`/tests/${id}/changeTestStatus`);
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

export const addQuestion = createAsyncThunk(
    "tests/addQuestion",
    async ({test_id, values}, {rejectWithValue}) => {
        try {
            console.log(values);
            const res = await axiosClient.post(`/tests/add-questions/${test_id}`, values);
            console.log(res.data);
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

export const updateQuestion = createAsyncThunk(
    "tests/updateQuestion",
    async ({question_id, values}, {rejectWithValue}) => {
        try {
            console.log(values);
            const res = await axiosClient.put(`/tests/update-questions/${question_id}`, values);
            console.log(res.data);
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


export const createAnswer = createAsyncThunk(
    "tests/createAnswer",
    async (payload, {rejectWithValue}) => {
        try {
            console.log(payload);
            const res = await axiosClient.post('/answers', payload);
            console.log(res.data);
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

export const deleteQuestion = createAsyncThunk(
    "tests/deleteQuestion",
    async ({id, question}, {rejectWithValue}) => {
        try {
            const res = await axiosClient.delete(`/tests/delete-questions/${id}`);
            return question;
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

export const changeScoreForQuestion = createAsyncThunk(
    "tests/changeScoreForQuestion",
    async ({answerId, data}, {rejectWithValue}) => {
        try {
            console.log(answerId);
            const res = await axiosClient.put(`/answers/changeScore/${answerId}`, data);
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
                    item.title.toLowerCase().includes(payload.toLowerCase())
            );
        },
        getTestById: (state, {payload}) => {
            state.test = state.visibleData.find(test => test.id === parseInt(payload));
        },
    },
    extraReducers: (builder) => {

        //  tests //
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
        builder.addCase(updateTest.pending, (state) => {
            // state.isLoading = true;
        });
        builder.addCase(updateTest.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.tests = state.tests.map(test => test.id === action.payload.id ? action.payload : test)
            state.test = action.payload;
        });
        builder.addCase(updateTest.rejected, (state, action) => {
            state.status = 'rejected';
            state.errors = action.payload;
        });
        builder.addCase(deleteTest.pending, (state) => {
            //state.isLoading = true;
        });
        builder.addCase(deleteTest.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.tests = state.tests.filter(test => test.id !== action.payload.id);
            state.visibleData = state.tests;
        });
        builder.addCase(deleteTest.rejected, (state, action) => {
            state.status = 'rejected';
            state.errors = action.payload;
        });
        builder.addCase(changeTestStatus.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.test = {...state.test, is_active: !state.test.is_active};
        });
        builder.addCase(changeTestStatus.rejected, (state, action) => {
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
        builder.addCase(getTestBySlug.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getTestBySlug.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.test = action.payload.data;
            state.isLoading = false;
        });
        builder.addCase(getTestBySlug.rejected, (state, action) => {
            state.status = 'rejected';
            state.errors = action.payload;
            state.isLoading = false;
        });


        //  questions //
        builder.addCase(addQuestion.pending, (state) => {
            // state.isLoading = true;
        });
        builder.addCase(addQuestion.fulfilled, (state, action) => {
            state.status = 'succeeded';
            console.log(action.payload);
            state.test.questions.push(action.payload);
        });
        builder.addCase(addQuestion.rejected, (state, action) => {
            state.status = 'rejected';
            state.errors = action.payload;
        });
        builder.addCase(updateQuestion.pending, (state) => {
            // state.isLoading = true;
        });
        builder.addCase(updateQuestion.fulfilled, (state, action) => {
            state.status = 'succeeded';
            console.log(action.payload);
            state.test.questions = state.test.questions.map(question => question.id === action.payload.id ? action.payload : question);
        });
        builder.addCase(updateQuestion.rejected, (state, action) => {
            state.status = 'rejected';
            state.errors = action.payload;
        });
        builder.addCase(deleteQuestion.pending, (state) => {
            //state.isLoading = true;
        });
        builder.addCase(deleteQuestion.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.test.questions = state.test.questions.filter(question => question.id !== action.payload.id);
            // state.visibleData = state.tests;
        });
        builder.addCase(deleteQuestion.rejected, (state, action) => {
            state.status = 'rejected';
            state.errors = action.payload;
        });


        // answers //
        builder.addCase(createAnswer.pending, (state) => {
            // state.isLoading = true;
        });
        builder.addCase(createAnswer.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.tests = state.tests.map(test => test.id === action.payload.id ? action.payload : test)
            state.test = action.payload;
        });
        builder.addCase(createAnswer.rejected, (state, action) => {
            state.status = 'rejected';
            state.errors = action.payload;
        });
        builder.addCase(changeScoreForQuestion.pending, (state) => {
            // state.isLoading = true;
        });
        builder.addCase(changeScoreForQuestion.fulfilled, (state, action) => {
            state.status = 'succeeded';
            console.log(action.payload);
            const {answer, question} = action.payload;
            state.test.results = state.test.results.map(result => result.id === answer.id ? answer : result)
            state.test.questions = state.test.questions.map(item => item.id === question.id ? question : item)
            // state.test = action.payload;
        });
        builder.addCase(changeScoreForQuestion.rejected, (state, action) => {
            state.status = 'rejected';
            console.log(action.payload);
            // state.errors = action.payload;
        });
    },
});

export const {clearErrors, reset, searchTest, getTestById} = testsSlice.actions;


export default testsSlice.reducer;
