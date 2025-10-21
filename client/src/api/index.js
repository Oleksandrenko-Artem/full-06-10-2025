import axios from 'axios';
import CONSTANTS from '../constants';

const apiClient = axios.create({
    baseURL: CONSTANTS.BASE_URL,
});
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
});
// auth
export const registerUser = (values) => apiClient.post('/users/register', values);
export const loginUser = (values) => apiClient.post('/users/login', values);
export const getAccount = () => apiClient.get('/users/account');
// categories
export const getAllCategories = () => apiClient.get('/categories');
// products
export const getAllProducts = () => apiClient.get('/products');