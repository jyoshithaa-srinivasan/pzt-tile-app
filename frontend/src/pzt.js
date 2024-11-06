// frontend/src/pzt.js
import axios from 'axios';

const pzt = axios.create({
    baseURL: 'http://localhost:3000/pzt',
});

pzt.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default pzt;
