import axios from 'axios';

const api = axios.create({
    baseURL: 'https://192.168.70.124:8080/usuario', 
});

export default api;