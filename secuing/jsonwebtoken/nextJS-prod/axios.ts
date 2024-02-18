// create config/axios.ts

import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { useSession } from "next-auth/react";

const API_URL = 'http://localhost:5000';

// Create a new Axios instance
const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_URL,
});

// Get the session token
const getSessionToken = () => {
  const { data: session } = useSession();
  return session?.token || null;
};

// Add request interceptor
axiosInstance.interceptors.request.use(
  async (config: any) => {
    const token = getSessionToken();

    // Modify the config object to include the token in the request headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;