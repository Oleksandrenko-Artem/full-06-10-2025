import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAdminStats } from "../api";
import { pendingCase, rejectedCase } from "./functions";

export const getAdminStatsThunk = createAsyncThunk('admin/getAdminStatsThunk', async (_, thunkAPI) => {
    try {
        const response = await getAdminStats();
        return response.data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error?.message);
    }
})
const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        stats: [],
        error: null,
        isLoading: false,
    },
    reducers: {},
    extraReducers: (builder) => { 
        builder.addCase(getAdminStatsThunk.pending, pendingCase);
        builder.addCase(getAdminStatsThunk.fulfilled, (state, action) => {
            state.stats = action.payload;
            state.error = null;
            state.isLoading = false;
        });
        builder.addCase(getAdminStatsThunk.rejected, rejectedCase);
    },
});

export default adminSlice.reducer;