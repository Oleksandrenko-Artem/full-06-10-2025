import axios from 'axios';
import CONSTANTS from '../constants';

const apiClient = axios.create({
    baseURL: CONSTANTS.BASE_URL,
});

// categories
export const getAllCategories = () => apiClient.get('/categories');