import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.citybik.es/v2/',
});

export default api;
