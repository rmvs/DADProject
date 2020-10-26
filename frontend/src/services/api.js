import axios from 'axios';

const api = axios.create({
    baseURL: 'http://104.214.100.215'
});

export default api;