import axios from 'axios'
import { API_BASE_URL } from 'app-constants'

export function useRequest() {
  const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json'
    }
  })

  async function get(endPoint, options = {}) {
    const res = axiosInstance.get(endPoint, options)

    return res
  }

  async function post(endPoint, data, options = {}) {
    const res = await axiosInstance.post(endPoint, data, options)

    return res
  }

  async function put(endPoint, data, options = {}) {
    const res = await axiosInstance.put(endPoint, data, options)

    return res
  }

  async function remove(endPoint, data, options = {}) {
    const res = await axiosInstance.delete(endPoint, data, options)

    return res
  }

  return {
    get,
    post,
    put,
    remove
  }
}
