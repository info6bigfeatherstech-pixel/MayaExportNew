import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
import { getProducts } from "../api/products.js"

const ProductCatalogContext = createContext(null)

export const toPublicProduct = (product) => ({
  ...product,
  id: product.displayId || product._id || product.id,
  fabric: product.details || product.fabric || "",
  colors: product.colors || [],
  sizes: product.sizes || [],
  images: product.images?.length ? product.images : product.image ? [product.image] : [],
  image: product.images?.[0] || product.image || "/placeholder.jpg",
})

export function ProductCatalogProvider({ children }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const refresh = useCallback(async () => {
    setLoading(true)
    try {
      const response = await getProducts({ status: "Active", limit: 1000 })
      const list = Array.isArray(response) ? response : response?.data || []
      setProducts(list.map(toPublicProduct))
      setError("")
    } catch (err) {
      setError(err.message || "Unable to load products.")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refresh()
    const onChanged = () => refresh()
    const onFocus = () => refresh()
    window.addEventListener("products:changed", onChanged)
    window.addEventListener("focus", onFocus)
    return () => {
      window.removeEventListener("products:changed", onChanged)
      window.removeEventListener("focus", onFocus)
    }
  }, [refresh])

  const value = useMemo(() => ({ products, loading, error, refresh }), [products, loading, error, refresh])
  return <ProductCatalogContext.Provider value={value}>{children}</ProductCatalogContext.Provider>
}

export function useProductCatalog() {
  const value = useContext(ProductCatalogContext)
  if (!value) throw new Error("useProductCatalog must be used within ProductCatalogProvider")
  return value
}
