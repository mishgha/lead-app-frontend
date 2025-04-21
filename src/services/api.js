import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/lead';

const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const createLead = (leadData) => API.post('/', leadData);
export const getLeads = () => API.get('/');
export const deleteLead = (leadId) => API.delete(`/${leadId}`);
