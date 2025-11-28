import axios from 'axios'
import type { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import { eventHub } from '@/utils/eventHub'
const baseUrl = 'http://localhost:3001'
const instance: AxiosInstance = axios.create({ baseURL: baseUrl, withCredentials: true })
instance.interceptors.request.use((conf: InternalAxiosRequestConfig) => { eventHub.emit('beforeRequest'); const token = localStorage.getItem('token'); if (token && conf.headers) { conf.headers['x-user-id'] = token } return conf }, (error: AxiosError) => { eventHub.emit('requestError'); return Promise.reject(error) })
instance.interceptors.response.use((response: AxiosResponse) => { eventHub.emit('afterResponse'); return response }, (error: AxiosError) => { eventHub.emit('responseError'); return Promise.reject(error) })
export default instance