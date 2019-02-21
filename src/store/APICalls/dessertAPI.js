import axios from 'axios';
import { API_URL } from '../../config';

export const createDessert = (dessert) => {
  return axios.post(`${API_URL}/desserts/`, dessert);
};

export const fetchDesserts = () => {
  return axios.get(`${API_URL}/desserts`);
};

export const updateDessert = ([_id, dessert]) => {
  return axios.patch(`${API_URL}/desserts/${_id}`, dessert);
};

export const deleteDessert = (dessertId) => {
  return axios.delete(`${API_URL}/desserts/${dessertId}`);
};
