import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:5000',
  withCredentials: true, // sends httpOnly cookie for auth
  headers: {
    'Content-Type': 'application/json'
  }
})

// Response interceptor — unwrap data or throw clean errors
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message || 'Something went wrong'
    const status = error.response?.status

    // If 401, could redirect to login later once auth is built
    if (status === 401) {
      window.location.href = '/login'
    }

    return Promise.reject({ message, status })
  }
)

export const get = (url, params) => api.get(url, { params })
export const post = (url, data) => api.post(url, data)
export const put = (url, data) => api.put(url, data)
export const patch = (url, data) => api.patch(url, data)
export const del = (url) => api.delete(url)

export default api