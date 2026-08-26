/**
 * Central API client.
 * All requests go through the Vite proxy to http://localhost:5000
 * so no cross-origin issues in development.
 */
const BASE = "/api"

/**
 * @param {string} path  - e.g. "/products"
 * @param {RequestInit} [opts]
 * @returns {Promise<any>} parsed JSON response data
 * @throws {Error} with message from server on non-2xx responses
 */
export async function api(path, opts = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: opts.body instanceof FormData
      ? {}                                          // let browser set multipart Content-Type
      : { "Content-Type": "application/json", ...opts.headers },
    ...opts,
  })
  

  const json = await res.json().catch(() => ({}))

  if (!res.ok) {
    throw new Error(json.message || `Request failed: ${res.status}`)
  }

  return json.data ?? json
}
