import axios from 'axios';
import { API_URL } from '../../config';

export const createAllergen = (allergen) => {
  return axios.post(`${API_URL}/allergens`, allergen);
};

export const fetchAllergen = (allergenId) => {
  return axios.get(`${API_URL}/allergens${allergenId}`);
};

export const fetchAllergens = () => {
  return axios.get(`${API_URL}/allergens`);
};

export const updateAllergen = ({ _id, ...allergen }) => {
  return axios.patch(`${API_URL}/allergens/${_id}`, allergen);
};

export const deleteAllergen = (allergenId) => {
  return axios.delete(`${API_URL}/allergens/${allergenId}`);
};
