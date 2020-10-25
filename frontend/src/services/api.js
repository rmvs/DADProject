import axios from 'axios';

const api = axios.create({
    baseURL: 'http://13.72.77.48'
});

export default api;