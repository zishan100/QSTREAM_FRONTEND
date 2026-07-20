import axios from 'axios';
import { hostAddress } from '../../Utils/Const'

const axiosInstances = axios.create({
  baseURL: `${hostAddress}/v1`,
  headers: {
    "Content-Type": "application/json"
  },
})

axiosInstances.interceptors.request.use((config) => {
  const token = JSON.parse(localStorage.getItem('userToken')) || null;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default axiosInstances;