import axios from 'axios';
import { API_URL } from '../../config';

export const createTable = (table) => {
  return axios.post(`${API_URL}/tables/`, table);
};

export const fetchTables = () => {
  return axios.get(`${API_URL}/tables/`);
};

export const updateTable = ({ _id, ...drink }) => {
  return axios.patch(`${API_URL}/tables/${_id}`, drink);
};

export const deleteTable = (tableId) => {
  return axios.delete(`${API_URL}/tables/${tableId}`);
};
