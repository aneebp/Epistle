import axios from "axios";
import {ACCESS_TOKEN} from './constants'

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/'
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        // Do not add Authorization header for registration or login endpoints
        if (token && !config.url.includes('/register') && !config.url.includes('/login')) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;