import axios from "axios";

export const API = axios.create({
    baseURL: 'http://localhost:8000/api',
    withCredentials: true,
});

API.interceptors.request.use((config)=>{
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    config.headers.uid = localStorage.getItem('uid');
    return config;
})