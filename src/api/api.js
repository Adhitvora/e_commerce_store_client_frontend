import axios from 'axios'
import { api_url } from '../utils/config'

const api = axios.create({
    baseURL: `${api_url}/api`,
})

const retryableStatuses = [408, 425, 429, 500, 502, 503, 504]
const maxGetRetries = 2

const isTokenExpired = (token) => {
    try {
        const base64Payload = token.split('.')[1]
        if (!base64Payload) return true

        const normalized = base64Payload.replace(/-/g, '+').replace(/_/g, '/')
        const padded = normalized + '='.repeat((4 - (normalized.length % 4)) % 4)
        const payload = JSON.parse(atob(padded))
        if (!payload?.exp) return false
        return payload.exp * 1000 <= Date.now()
    } catch (error) {
        return true
    }
}

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('customerToken')
    if (token) {
        if (isTokenExpired(token)) {
            localStorage.removeItem('customerToken')
        } else {
            config.headers = config.headers || {}
            config.headers.authorization = `Bearer ${token}`
        }
    }
    return config
})

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error?.config
        if (!originalRequest) {
            return Promise.reject(error)
        }

        const method = (originalRequest.method || 'get').toLowerCase()
        const status = error?.response?.status
        const isNetworkError = !error?.response
        const retryCount = originalRequest.__retryCount || 0
        const shouldRetry =
            method === 'get' &&
            retryCount < maxGetRetries &&
            (isNetworkError || retryableStatuses.includes(status))

        if (!shouldRetry) {
            return Promise.reject(error)
        }

        originalRequest.__retryCount = retryCount + 1
        const waitTime = 600 * (2 ** retryCount)
        await new Promise((resolve) => setTimeout(resolve, waitTime))
        return api(originalRequest)
    }
)

export default api
