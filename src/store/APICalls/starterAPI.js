import axios from 'axios';
import { API_URL } from '../../config';

export const createStarter = (starter) => {
  return axios.post(`${API_URL}/starters`, starter);
};
