import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from './categoriesSlice';
import authReducer from './authSlice';

const store = configureStore({
    reducer: {
        categories: categoriesReducer,
        auth: authReducer,
    },
});

export default store;