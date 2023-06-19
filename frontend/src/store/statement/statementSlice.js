import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axiosClient from "../../axios-client.js";

const initialState = {
    statements: [],
    visibleData: [],
    errors: null,
    isLoading: true,
    status: 'idle',
}
export const getStatements = createAsyncThunk("statements/getStatements",
    async (_, {rejectWithValue}) => {
        try {
            const res = await axiosClient.get('/statements');
            // console.log(res.data)
            return res.data;
        } catch (error) {
            if (!error.response) {
                return rejectWithValue("Не вдалося з'єднатися з сервером.");
            }
            const {errors} = error.response.data;
            return rejectWithValue(errors);
        }

    }
)
export const createStatement = createAsyncThunk("statements/createStatement",
    async (values, {rejectWithValue}) => {
        try {
            console.log(values)
            const res = await axiosClient.post('/statement/create', {
                subject_id: values.subject_id,
                semester: values.semester,
                year: values.year
            });
            return res.data;
        } catch (error) {
            if (!error.response) {
                return rejectWithValue("Не вдалося з'єднатися з сервером.");
            }
            const {errors} = error.response.data;
            return rejectWithValue(errors);
        }

    }
)

export const createSessionScore = createAsyncThunk("sessionScore/createSessionScore",
    async ({values, statement_id}, {rejectWithValue}) => {
        try {
            const res = await axiosClient.post(`/session-score/create/${statement_id}`, values);
            return res.data;
        } catch (error) {
            if (!error.response) {
                return rejectWithValue("Не вдалося з'єднатися з сервером.");
            }
            const {errors} = error.response.data;
            return rejectWithValue(errors);
        }

    }
)
export const updateSessionScore = createAsyncThunk("sessionScore/updateSessionScore",
    async (values, {rejectWithValue}) => {
        try {
            const res = await axiosClient.put('/session-score/update/'+values.id, {
                score: values.score
            });
            return res.data;
        } catch (error) {
            if (!error.response) {
                return rejectWithValue("Не вдалося з'єднатися з сервером.");
            }
            const {errors} = error.response.data;
            return rejectWithValue(errors);
        }
    }
)

const statementSlice = createSlice({
    name: "statements",
    initialState,
    reducers: {
        clearErrors: (state) => {
            state.errors = null;
        },
        reset: (state) => {
            state.statements = [];
            state.visibleData = state.statements;
            state.errors = null;
        },

    },
    extraReducers: (builder) => {
        builder.addCase(getStatements.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getStatements.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.statements = action.payload.data;
            state.visibleData = state.statements;
            state.isLoading = false;
        });
        builder.addCase(getStatements.rejected, (state, action) => {
            state.status = 'rejected';
            state.errors = action.payload;
            state.isLoading = false;
        });

        builder.addCase(createStatement.pending, state => {})
        builder.addCase(createStatement.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.statements.push(action.payload);
        })
        builder.addCase(createStatement.rejected, (state, action) => {
            state.status = 'rejected';
            state.errors = action.payload;
        })

        builder.addCase(createSessionScore.pending, state => {})
        builder.addCase(createSessionScore.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.statements.find(s => s.id === action.payload.statement_id).session_scores.push(action.payload)
            // state.statements.push(action.payload);
        })
        builder.addCase(createSessionScore.rejected, (state, action) => {
            state.status = 'rejected';
            state.errors = action.payload;
        })

        builder.addCase(updateSessionScore.pending, state => {})
        builder.addCase(updateSessionScore.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.statements.find(s => s.id === action.payload.statement_id).session_scores.find(score => score.id === action.payload.id).score = action.payload.score
        })
        builder.addCase(updateSessionScore.rejected, (state, action) => {
            state.status = 'rejected';
            state.errors = action.payload;
        })
    }
})

export const {clearErrors, reset} = statementSlice.actions;
export default statementSlice.reducer;