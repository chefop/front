import axios from 'axios';
import { API_URL } from '../../config';

export const createMainCourse = (mainCourse) => {
  return axios.post(`${API_URL}/mainCourses`, mainCourse);
};

export const fetchMainCourse = (mainCourseId) => {
  return axios.get(`${API_URL}/mainCourses/${mainCourseId}`);
};

export const fetchMainCourses = () => {
  return axios.get(`${API_URL}/mainCourses`);
};

export const updateMainCourse = (mainCourse) => {
  return axios.patch(`${API_URL}/mainCourses/${mainCourse._id}`, mainCourse);
};

export const deleteMainCourse = (mainCourseId) => {
  return axios.delete(`${API_URL}/mainCourses/${mainCourseId}`);
};
