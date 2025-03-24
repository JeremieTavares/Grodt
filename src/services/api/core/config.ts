import axios from 'axios';

// Create axios instance with default config
export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'https://money-pie-2.fly.dev/',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add response interceptor for error handling
apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        return Promise.reject(error);
    }
); 