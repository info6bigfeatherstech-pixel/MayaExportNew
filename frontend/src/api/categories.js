import { api } from "./index.js"

/**
 * Build query string from a params object, skipping null/undefined values.
 */
const qs = (params = {}) => {
  const p = new URLSearchParams()
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== null && v !== "") p.append(k, v)
  }
  const s = p.toString()
  return s ? `?${s}` : ""
}

// ── Categories ────────────────────────────────────────────────────────────────

export const getCategories = (params) =>
  api(`/categories${qs(params)}`)

export const getCategoryById = (id) =>
  api(`/categories/${id}`)

/**
 * Create category — supports optional image upload.
 * @param {object} data - category fields
 * @param {File} [imageFile] - optional image file
 */
export const createCategory = (data, imageFile) => {
  if (imageFile) {
    const fd = new FormData()
    fd.append("image", imageFile)
    Object.entries(data).forEach(([k, v]) => {
      if (Array.isArray(v)) {
        v.forEach((item) => fd.append(k, item))
      } else if (v !== undefined && v !== null) {
        fd.append(k, v)
      }
    })
    return api("/categories", { method: "POST", body: fd })
  }
  return api("/categories", { method: "POST", body: JSON.stringify(data) })
}

export const updateCategory = (id, data, imageFile) => {
  if (imageFile) {
    const fd = new FormData()
    fd.append("image", imageFile)
    Object.entries(data).forEach(([k, v]) => {
      if (Array.isArray(v)) {
        v.forEach((item) => fd.append(k, item))
      } else if (v !== undefined && v !== null) {
        fd.append(k, v)
      }
    })
    return api(`/categories/${id}`, { method: "PUT", body: fd })
  }
  return api(`/categories/${id}`, { method: "PUT", body: JSON.stringify(data) })
}

export const deleteCategory = (id) =>
  api(`/categories/${id}`, { method: "DELETE" })
