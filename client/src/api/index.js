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
export const createCategory = (values) => apiClient.post('/categories', values);
export const updateCategory = (id, values) => apiClient.patch(`/categories/${id}`, values);
export const deleteCategory = (id) => apiClient.delete(`/categories/${id}`);
// products
export const getAllProducts = () => apiClient.get('/products');
export const createProduct = (values) => apiClient.post('/products', values);
export const updateProduct = (id, values) => apiClient.patch(`/products/${id}`, values);
export const deleteProduct = (id) => apiClient.delete(`/products/${id}`);