import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllProducts, createProduct, updateProduct, deleteProduct } from '../api';
import { pendingCase, rejectedCase } from "./functions";

export const getAllProductsThunk = createAsyncThunk('products/getAllProducts', async (values, thunkAPI) => {
    try {
        const response = await getAllProducts();
        return response.data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error?.message);
    }
});

export const createProductThunk = createAsyncThunk('products/createProductThunk', async (values, thunkAPI) => {
    try {
        const response = await createProduct(values);
        return response.data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error?.message);
    }
});

export const updateProductThunk = createAsyncThunk('products/updateProductThunk', async ({ id, values }, thunkAPI) => {
    try {
        const response = await updateProduct(id, values);
        return response.data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error?.message);
    }
});

export const deleteProductThunk = createAsyncThunk('products/deleteProductThunk', async (id, thunkAPI) => {
    try {
        const response = await deleteProduct(id);
        return response.data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error?.message);
    }
});

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        error: null,
        isLoading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllProductsThunk.pending, pendingCase);
        builder.addCase(createProductThunk.pending, pendingCase);
        builder.addCase(updateProductThunk.pending, pendingCase);
        builder.addCase(deleteProductThunk.pending, pendingCase);
        builder.addCase(getAllProductsThunk.fulfilled, (state, action) => {
            state.products = action.payload;
            state.error = null;
            state.isLoading = false;
        });
        builder.addCase(createProductThunk.fulfilled, (state, action) => {
            state.products.push(action.payload);
            state.error = null;
            state.isLoading = false;
        });
        builder.addCase(updateProductThunk.fulfilled, (state, action) => {
            const index = state.products.findIndex((product) => product._id === action.payload._id);
            if (index !== -1) {
                state.products[index] = action.payload;
            }
            state.error = null;
            state.isLoading = false;
        });
        builder.addCase(deleteProductThunk.fulfilled, (state, action) => {
            state.products = state.products.filter((product) => product._id !== action.payload._id);
            state.error = null;
            state.isLoading = false;
        });
        builder.addCase(getAllProductsThunk.rejected, rejectedCase);
        builder.addCase(createProductThunk.rejected, rejectedCase);
        builder.addCase(updateProductThunk.rejected, rejectedCase);
        builder.addCase(deleteProductThunk.rejected, rejectedCase);
    },
});

export default productsSlice.reducer;