import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_REST_API_URL,
});

export default axiosInstance;
