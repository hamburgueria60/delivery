import { get, post, patch } from 'axios'
import { H60_API_URL } from './constants'

export const baseUrl = H60_API_URL

export function apiGet(url, options) {
  return get(url, { ...options })
}

export function apiPost(url, data, options = {}) {
  return post(url, data, { ...options })
}

export function apiPatch(url, data, options = {}) {
  return patch(url, data, { ...options })
}

export function apiChangeStream(url) {
  return new EventSource(`${url}/change-stream?_format=event-stream`)
}
