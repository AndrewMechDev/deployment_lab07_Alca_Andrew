import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '/api';

// Creamos una instancia de axios configurada
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
