import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from './categoriesSlice';
import authReducer from './authSlice';
import productsReducer from './productsSlice';
import cartReducer from './cartSlice';
import ordersReducer from './ordersSlice';
import adminReducer from './adminSlice';

const store = configureStore({
    reducer: {
        categories: categoriesReducer,
        auth: authReducer,
        products: productsReducer,
        cart: cartReducer,
        orders: ordersReducer,
        admin: adminReducer,
    },
});

export default store;