import axios from 'axios';
import { API_URL } from '../../config';

export const createStarter = (starter) => {
  return axios.post(`${API_URL}/starters`, starter);
};

export const fetchStarter = (starterId) => {
  return axios.get(`${API_URL}/starters${starterId}`);
};

export const fetchStarters = () => {
  return axios.get(`${API_URL}/starters`);
};

export const updateStarter = (starter) => {
  return axios.patch(`${API_URL}/starters/${starter._id}`, starter);
};

export const deleteStarter = (starterId) => {
  return axios.delete(`${API_URL}/starters/${starterId}`);
};
