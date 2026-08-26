import { api } from "./index.js"

const qs = (params = {}) => {
  const p = new URLSearchParams()
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== null && v !== "") p.append(k, v)
  }
  const s = p.toString()
  return s ? `?${s}` : ""
}

export const getProducts = (params) =>
  api(`/products${qs(params)}`)

export const getProductById = (id) =>
  api(`/products/${id}`)

export const createProduct = (data, imageFiles) => {
  if (imageFiles && imageFiles.length > 0) {
    const fd = new FormData()
    Array.from(imageFiles).forEach((f) => fd.append("images", f))
    Object.entries(data).forEach(([k, v]) => {
      if (Array.isArray(v)) {
        v.forEach((item) => fd.append(k, item))
      } else if (v !== undefined && v !== null) {
        fd.append(k, v)
      }
    })
    return api("/products", { method: "POST", body: fd })
  }
  return api("/products", { method: "POST", body: JSON.stringify(data) })
}

export const updateProduct = (id, data, imageFiles) => {
  if (imageFiles && imageFiles.length > 0) {
    const fd = new FormData()
    Array.from(imageFiles).forEach((f) => fd.append("images", f))
    Object.entries(data).forEach(([k, v]) => {
      if (Array.isArray(v)) {
        v.forEach((item) => fd.append(k, item))
      } else if (v !== undefined && v !== null) {
        fd.append(k, v)
      }
    })
    return api(`/products/${id}`, { method: "PUT", body: fd })
  }
  return api(`/products/${id}`, { method: "PUT", body: JSON.stringify(data) })
}

export const deleteProduct = (id) =>
  api(`/products/${id}`, { method: "DELETE" })
