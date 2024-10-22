import axios from 'axios'

const httpClient = axios.create({
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
  baseURL: process.env.EXPO_PUBLIC_API_URL,
})

axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    config.validateStatus = function (status) {
      return status < 500 // Resolve only if the status code is less than 500
    }
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

    return Promise.reject(error)
  }
)

export { httpClient }
