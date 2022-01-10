import axios from 'axios';

const instance = axios.create();

// Set the AUTH token for any request
instance.interceptors.request.use(function (config) {
    const token = localStorage.getItem('jwt');
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
});

export default instance;