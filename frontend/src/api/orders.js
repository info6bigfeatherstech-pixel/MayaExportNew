import { api } from "./index.js"

const qs = (params = {}) => {
  const p = new URLSearchParams()
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== null && v !== "") p.append(k, v)
  }
  const s = p.toString()
  return s ? `?${s}` : ""
}

export const getOrders = (params) =>
  api(`/orders${qs(params)}`)

export const getOrderById = (id) =>
  api(`/orders/${id}`)

export const createOrder = (data) =>
  api("/orders", { method: "POST", body: JSON.stringify(data) })

export const updateOrder = (id, data) =>
  api(`/orders/${id}`, { method: "PUT", body: JSON.stringify(data) })

export const updateOrderStatus = (id, status) =>
  api(`/orders/${id}/status`, { method: "PATCH", body: JSON.stringify({ status }) })

export const deleteOrder = (id) =>
  api(`/orders/${id}`, { method: "DELETE" })
