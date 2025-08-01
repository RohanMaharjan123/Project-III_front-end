// lib/axios.ts
import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use((config) => {
    const token = Cookies.get('access_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Do not attempt to refresh token for login or register failures,
        // as a 401 here means invalid credentials, not an expired token.
        if (error.response?.status === 401 && (originalRequest.url.endsWith('/auth/login/') || originalRequest.url.endsWith('/auth/register/'))) {
            return Promise.reject(error);
        }

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = Cookies.get('refresh_token');
                const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/token/refresh/`, {
                    refresh: refreshToken
                });

                const { access } = response.data;
                Cookies.set('access_token', access, { expires: 1 });

                return api(originalRequest);
            } catch (refreshError) {
                Cookies.remove('access_token');
                Cookies.remove('refresh_token');
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;