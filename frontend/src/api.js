import { Axios } from "axios";
import { API_BASE_URL, ACCESS_TOKEN, REFRESH_TOKEN } from "./constants";

const api = Axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
},
    (error) => {
        return Promise.reject(error);
    }
);

    export default api;