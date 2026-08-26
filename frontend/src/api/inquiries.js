import { api } from "./index.js"

const qs = (params = {}) => {
  const p = new URLSearchParams()
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== null && v !== "") p.append(k, v)
  }
  const s = p.toString()
  return s ? `?${s}` : ""
}

export const getInquiries = (params) =>
  api(`/inquiries${qs(params)}`)

export const getInquiryById = (id) =>
  api(`/inquiries/${id}`)

export const createInquiry = (data) =>
  api("/inquiries", { method: "POST", body: JSON.stringify(data) })

export const updateInquiry = (id, data) =>
  api(`/inquiries/${id}`, { method: "PUT", body: JSON.stringify(data) })

export const updateInquiryStatus = (id, status) =>
  api(`/inquiries/${id}/status`, { method: "PATCH", body: JSON.stringify({ status }) })

export const deleteInquiry = (id) =>
  api(`/inquiries/${id}`, { method: "DELETE" })
