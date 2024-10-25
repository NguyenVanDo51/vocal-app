import { deleteCookie, getCookie } from '@/lib/utils'
import axios from 'axios'

const httpClient = axios.create({
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getCookie('jwt')}`
  },
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

httpClient.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    config.validateStatus = function (status) {
      return status < 500 // Resolve only if the status code is less than 500
    }
    console.log(getCookie('jwt'))
    config.headers.Authorization = `Bearer ${getCookie('jwt')}`
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

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
    if (error.response?.status === 401 || error.response?.status === 403) {
      deleteCookie('jwt');
      window.location.href = '/sign-in'
    }

    return Promise.reject(error)
  }
)

export { httpClient }
