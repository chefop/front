import axios from 'axios';
import { API_URL } from '../../config';

export const createVolume = (volume) => {
  return axios.post(`${API_URL}/volumes`, volume);
};

export const fetchVolume = (volumeId) => {
  return axios.get(`${API_URL}/volumes${volumeId}`);
};

export const fetchVolumes = () => {
  return axios.get(`${API_URL}/volumes`);
};

export const updateVolume = ({ _id, ...volume }) => {
  return axios.patch(`${API_URL}/volumes/${_id}`, volume);
};

export const deleteVolume = (volumeId) => {
  return axios.delete(`${API_URL}/volumes/${volumeId}`);
};
