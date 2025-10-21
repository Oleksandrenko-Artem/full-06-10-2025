import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from './categoriesSlice';
import authReducer from './authSlice';
import productsReducer from './productsSlice';

const store = configureStore({
    reducer: {
        categories: categoriesReducer,
        auth: authReducer,
        products: productsReducer,
    },
});

export default store;