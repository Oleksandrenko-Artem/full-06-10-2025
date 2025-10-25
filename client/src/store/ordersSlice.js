import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createOrder } from "../api";
import { pendingCase, rejectedCase } from "./functions";

export const createOrderThunk = createAsyncThunk('orders/createOrderThunk', async(values, thunkAPI)=> {
    try {
        const response = await createOrder(values);
        return response.data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error?.message);
    }
});

const ordersSlice = createSlice({
    name: 'orders',
    initialState: {
        orders: [],
        error: null,
        isLoading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createOrderThunk.pending, pendingCase);
        builder.addCase(createOrderThunk.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.orders.push(action.payload);
        });
        builder.addCase(createOrderThunk.rejected, rejectedCase);
    },
});

export default ordersSlice.reducer;