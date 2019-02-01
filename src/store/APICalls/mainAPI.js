import axios from 'axios';
import { API_URL } from '../../config';

export const createMain = (main) => {
  return axios.post(`${API_URL}/mains`, main);
};

export const fetchMain = (mainId) => {
  return axios.get(`${API_URL}/mains/${mainId}`);
};

export const fetchMains = () => {
  return axios.get(`${API_URL}/mains`);
};

export const updateMain = (main) => {
  return axios.patch(`${API_URL}/mains/${main._id}`, main);
};

export const deleteMain = (mainId) => {
  return axios.delete(`${API_URL}/mains/${mainId}`);
};
