import { api } from "./index.js"

const qs = (params = {}) => {
  const p = new URLSearchParams()
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== null && v !== "") p.append(k, v)
  }
  const s = p.toString()
  return s ? `?${s}` : ""
}

export const getCustomers = (params) =>
  api(`/customers${qs(params)}`)

export const getCustomerById = (id) =>
  api(`/customers/${id}`)

export const createCustomer = (data) =>
  api("/customers", { method: "POST", body: JSON.stringify(data) })

export const updateCustomer = (id, data) =>
  api(`/customers/${id}`, { method: "PUT", body: JSON.stringify(data) })

export const deleteCustomer = (id) =>
  api(`/customers/${id}`, { method: "DELETE" })
