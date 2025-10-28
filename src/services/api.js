import axios from 'axios';

// Use an environment variable for the API URL
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/';

const api = axios.create({
    baseURL: API_URL,
});

export const getExpenses = () => api.get('/expenses');
export const addExpense = (expense) => api.post('/expenses', expense);
export const deleteExpense = (id) => api.delete(`/expenses/${id}`);