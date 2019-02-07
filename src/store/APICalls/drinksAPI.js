import axios from 'axios';
import { API_URL } from '../../config';

export const deleteDrink = (drinkId) => {
  return axios.delete(`${API_URL}/drinks/${drinkId}`);
};
