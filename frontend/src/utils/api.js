import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:5000/api', // Backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add the JWT token to headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiration/unauthorized errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      // We could dispatch a logout action here if we had access to the store, 
      // but usually the protected route handles redirecting if token is invalid
    }
    return Promise.reject(error);
  }
);

export default api;
