import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllCategories } from '../api';
import { pendingCase, rejectedCase } from './functions';

export const getAllCategoriesThunk = createAsyncThunk('categories/getAllCategoriesThunk', async (_, thunkAPI) => {
    try {
        const response = await getAllCategories();
        return response.data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error?.message);
    }
});

const categoriesSlice = createSlice({
    name: 'categories',
    initialState: {
        categories: [],
        error: null,
        isLoading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllCategoriesThunk.pending, pendingCase);
        builder.addCase(getAllCategoriesThunk.fulfilled, (state, action) => {
            state.categories = action.payload;
            state.error = null;
            state.isLoading = false;
        });
        builder.addCase(getAllCategoriesThunk.rejected, rejectedCase);
    },
});

export default categoriesSlice.reducer;