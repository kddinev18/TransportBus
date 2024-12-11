import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use(config => {
    const token = localStorage.getItem('authToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});


const apiService = {
    get(endpoint, params) {
        return apiClient.get(endpoint, { params });
    },
    post(endpoint, data) {
        return apiClient.post(endpoint, data);
    },
    put(endpoint, data) {
        return apiClient.put(endpoint, data);
    },
    delete(endpoint) {
        return apiClient.delete(endpoint);
    },
};

export default apiService;
