import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const employeeAPI = {
  getAll: () => axios.get(`${API_URL}/employees`),
  create: (data) => axios.post(`${API_URL}/employees`, data),
  update: (id, data) => axios.put(`${API_URL}/employees/${id}`, data),
  delete: (id) => axios.delete(`${API_URL}/employees/${id}`),
};

export const attendanceAPI = {
  getAll: () => axios.get(`${API_URL}/attendance`),
  create: (data) => axios.post(`${API_URL}/attendance`, data),
};

export const leaveAPI = {
  getAll: () => axios.get(`${API_URL}/leave`),
  create: (data) => axios.post(`${API_URL}/leave`, data),
  update: (id, data) => axios.put(`${API_URL}/leave/${id}`, data),
};

export const payrollAPI = {
  getAll: () => axios.get(`${API_URL}/payroll`),
  create: (data) => axios.post(`${API_URL}/payroll`, data),
};