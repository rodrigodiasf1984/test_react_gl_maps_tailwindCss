import axios from 'axios';

const api = axios.create({
  baseURL: 'http://api.citybik.es/v2/',
});

export default api;
