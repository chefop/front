import axios from 'axios';
import { API_URL } from '../../config';

export const createDrink = (drink) => {
  return axios.post(`${API_URL}/drinks/`, drink);
};

export const fetchDrinks = () => {
  return axios.get(`${API_URL}/drinks/`);
};

export const updateDrink = ({ _id, ...drink }) => {
  return axios.patch(`${API_URL}/drinks/${_id}`, drink);
};

export const deleteDrink = (drinkId) => {
  return axios.delete(`${API_URL}/drinks/${drinkId}`);
};
