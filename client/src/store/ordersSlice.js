import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createOrder, getAccountOrders, getOneOrderById, getOrdersAmount, getOrdersForAdmin, updateOrderStatus } from "../api";
import { pendingCase, rejectedCase } from "./functions";

export const getOrdersAmountThunk = createAsyncThunk('orders/getOrdersAmountThunk', async (_, thunkAPI) => {
    try {
        const response = await getOrdersAmount();
        return response.data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error?.message);
    }
});

export const getOneOrderByIdThunk = createAsyncThunk('orders/getOneOrderByIdThunk', async (id, thunkAPI) => {
    try {
        const response = await getOneOrderById(id);
        return response.data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error?.message);
    }
});

export const getAccountOrdersThunk = createAsyncThunk('orders/getAccountOrdersThunk', async (_, thunkAPI) => {
    try {
        const response = await getAccountOrders();
        return response.data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error?.message);
    }
});

export const getOrdersForAdminThunk = createAsyncThunk('orders/getOrdersForAdminThunk', async (options, thunkAPI) => {
    try {
        const response = await getOrdersForAdmin(options);
        return response.data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error?.message);
    }
});

export const updateOrderStatusThunk = createAsyncThunk('orders/updateOrderStatusThunk', async ({ id, status }, thunkAPI) => {
    try {
        const response = await updateOrderStatus(id, status);
        return response.data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error?.response?.data?.errors[0]);
    }
});

export const createOrderThunk = createAsyncThunk('orders/createOrderThunk', async(values, thunkAPI)=> {
    try {
        const response = await createOrder(values);
        return response.data.data;
    } catch (error) {
        const msg = error?.response?.data?.errors[0];
        return thunkAPI.rejectWithValue(msg);
    }
});

const initialState = {
    orders: [],
    totalOrders: 0,
    ordersAccount: [],
    selectedOrder: null,
    error: null,
    isLoading: false,
}

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        resetOrders: () => initialState,
    },
    extraReducers: (builder) => {
        builder.addCase(createOrderThunk.pending, pendingCase);
        builder.addCase(updateOrderStatusThunk.pending, pendingCase);
        builder.addCase(getOrdersForAdminThunk.pending, pendingCase);
        builder.addCase(getAccountOrdersThunk.pending, pendingCase);
        builder.addCase(getOneOrderByIdThunk.pending, pendingCase);
        builder.addCase(getOrdersAmountThunk.pending, pendingCase);
        builder.addCase(createOrderThunk.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.orders.push(action.payload);
        });
        builder.addCase(updateOrderStatusThunk.fulfilled, (state, action) => {
            const index = state.orders.findIndex((order) => order._id === action.payload._id);
            if (index !== -1) {
                state.orders[index] = action.payload;
            }
            state.error = null;
            state.isLoading = false;
        });
        builder.addCase(getOrdersForAdminThunk.fulfilled, (state, action) => {
            state.orders = action.payload;
            state.error = null;
            state.isLoading = false;
        });
        builder.addCase(getAccountOrdersThunk.fulfilled, (state, action) => {
            state.ordersAccount = action.payload;
            state.error = null;
            state.isLoading = false;
        });
        builder.addCase(getOneOrderByIdThunk.fulfilled, (state, action) => {
            state.selectedOrder = action.payload;
            state.error = null;
            state.isLoading = false;
        });
        builder.addCase(getOrdersAmountThunk.fulfilled, (state, action) => {
            state.totalOrders = action.payload;
            state.error = null;
            state.isLoading = false;
        });
        builder.addCase(createOrderThunk.rejected, rejectedCase);
        builder.addCase(updateOrderStatusThunk.rejected, rejectedCase);
        builder.addCase(getOrdersForAdminThunk.rejected, rejectedCase);
        builder.addCase(getAccountOrdersThunk.rejected, rejectedCase);
        builder.addCase(getOneOrderByIdThunk.rejected, rejectedCase);
        builder.addCase(getOrdersAmountThunk.rejected, rejectedCase);
    },
});

export const { resetOrders } = ordersSlice.actions;

export default ordersSlice.reducer;