import { storage } from '@/core/storage';
import axios from 'axios'

const httpClient = axios.create({
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
  baseURL: process.env.EXPO_PUBLIC_API_URL,
})

httpClient.interceptors.request.use(
  function (config) {
    config.headers.Authorization = `Bearer ${storage.getString('token')}`;
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
httpClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    return Promise.reject(error)
  }
)

export { httpClient }
