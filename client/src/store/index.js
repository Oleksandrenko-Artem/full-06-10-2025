import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from './categoriesSlice';
import authReducer from './authSlice';
import productsReducer from './productsSlice';
import cartReducer from './cartSlice';

const store = configureStore({
    reducer: {
        categories: categoriesReducer,
        auth: authReducer,
        products: productsReducer,
        cart: cartReducer,
    },
});

export default store;