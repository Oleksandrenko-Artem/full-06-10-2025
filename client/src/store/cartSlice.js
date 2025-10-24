import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
    },
    reducers: {
        addToCart(state, action) {
            const product = action.payload;
            const existingItem = state.items.find((item) => item._id === product._id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({ ...product, quantity: 1 });
            }
        },
        removeFromCart(state, action) {
            state.items = state.items.filter((item) => item._id !== action.payload);
        },
        decrementQuantity(state, action) {
            const id = action.payload;
            const item = state.items.find((item) => item._id === id);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
            }
        },
        incrementQuantity(state, action) {
            const id = action.payload;
            const item = state.items.find((item) => item._id === id);
            if (item) {
                item.quantity += 1;
            }
        },
        clearCart(state) {
            state.items = [];
        },
    },
});

export const { addToCart, removeFromCart, decrementQuantity, incrementQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;