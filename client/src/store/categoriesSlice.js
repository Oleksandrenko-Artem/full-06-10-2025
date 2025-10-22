import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllCategories, createCategory, updateCategory, deleteCategory } from '../api';
import { pendingCase, rejectedCase } from './functions';

export const getAllCategoriesThunk = createAsyncThunk('categories/getAllCategoriesThunk', async (_, thunkAPI) => {
    try {
        const response = await getAllCategories();
        return response.data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error?.message);
    }
});

export const createCategoryThunk = createAsyncThunk('categories/createCategoryThunk', async (values, thunkAPI) => {
    try {
        const response = await createCategory(values);
        return response.data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error?.message);
    }
});

export const updateCategoryThunk = createAsyncThunk('categories/updateCategoryThunk', async ({ id, values }, thunkAPI) => {
    try {
        const response = await updateCategory(id, values);
        return response.data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error?.message);
    }
});

export const deleteCategoryThunk = createAsyncThunk('categories/deleteCategoryThunk', async (id, thunkAPI) => {
    try {
        const response = await deleteCategory(id);
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
        builder.addCase(createCategoryThunk.pending, pendingCase);
        builder.addCase(updateCategoryThunk.pending, pendingCase);
        builder.addCase(deleteCategoryThunk.pending, pendingCase);
        builder.addCase(getAllCategoriesThunk.fulfilled, (state, action) => {
            state.categories = action.payload;
            state.error = null;
            state.isLoading = false;
        });
        builder.addCase(createCategoryThunk.fulfilled, (state, action) => {
            state.categories.push(action.payload);
            state.error = null;
            state.isLoading = false;
        });
        builder.addCase(updateCategoryThunk.fulfilled, (state, action) => {
            const index = state.categories.findIndex((category) => category._id === action.payload._id);
            if (index !== -1) {
                state.categories[index] = action.payload;
            }
            state.error = null;
            state.isLoading = false;
        });
        builder.addCase(deleteCategoryThunk.fulfilled, (state, action) => {
            state.categories = state.categories.filter((category) => category._id !== action.payload._id);
            state.error = null;
            state.isLoading = false;
        });
        builder.addCase(getAllCategoriesThunk.rejected, rejectedCase);
        builder.addCase(createCategoryThunk.rejected, rejectedCase);
        builder.addCase(updateCategoryThunk.rejected, rejectedCase);
        builder.addCase(deleteCategoryThunk.rejected, rejectedCase);
    },
});

export default categoriesSlice.reducer;