import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// User API calls
export const registerUser = (data) => api.post('http://localhost:5000/api/user/register', data);
export const loginUser = (data) => api.post('http://localhost:5000/api/user/login', data);
export const verifyOTP = (data) => api.post('http://localhost:5000/api/user/verify-otp', data);
export const getApartments = () => api.get('http://localhost:5000/api/user/apartments');
export const bookInspection = (data) => api.post('http://localhost:5000/api/user/book-inspection', data);
export const makePayment = (data) => api.post('http://localhost:5000/api/user/pay', data);
export const reportApartment = (data) => api.post('http://localhost:5000/api/user/report', data);

// Agent API calls

export const registerAgent = (data) => api.post('http://localhost:5000/api/agent/register', data);
export const loginAgent = (data) => api.post('http://localhost:5000/api/user/login', data); // Same endpoint, different role
export const postApartment = (data) => api.post('http://localhost:5000/api/agent/apartments', data);
export const editApartment = (data) => api.put('http://localhost:5000/api/agent/apartments', data);
export const deleteApartment = (id) => api.delete(`http://localhost:5000/api/agent/apartments/${id}`);
export const updateAgentProfile = (data) => api.put('http://localhost:5000/api/agent/profile', data);
export const deleteAgentAccount = () => api.delete('http://localhost:5000/api/agent/account');

// Admin API calls
export const createAdmin = (data) => api.post('http://localhost:5000/api/admin/create-admin', data);
export const loginAdmin = (data) => api.post('http://localhost:5000/api/user/login', data); // Same endpoint, different role
export const validateAgent = (data) => api.post('http://localhost:5000/api/admin/secret-admin-route/validate-agent', data);
export const getAllAgents = () => api.get('http://localhost:5000/api/admin/secret-admin-route/agents');

export const getAllUsers = () => api.get('http://localhost:5000/api/admin/secret-admin-route/users');
export const deactivateUser = (id) => api.put(`http://localhost:5000/api/admin/secret-admin-route/deactivate-user/${id}`);
export const deleteAdminApartment = (id) => api.delete(`http://localhost:5000/api/admin/secret-admin-route/delete-apartment/${id}`);
export const getAllReports = () => api.get('http://localhost:5000/api/admin/secret-admin-route/reports');
export const resolveReport = (id) => api.put(`http://localhost:5000/api/admin/secret-admin-route/resolve-report/${id}`);


// New Property Detail API call

export const getApartmentById = (id) => api.get(`http://localhost:5000/api/agent/apartments/${id}`);