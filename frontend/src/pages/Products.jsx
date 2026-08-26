import { useEffect, useMemo, useState } from "react"
import PageHero from "../components/common/PageHero.jsx"
import Container from "../components/common/Container.jsx"
import ProductFilter from "../components/products/ProductFilter.jsx"
import ProductGrid from "../components/products/ProductGrid.jsx"
import { getProducts } from "../api/products.js"
import { getCategories } from "../api/categories.js"
import { products as initialProducts, productCategories as initialCategories } from "../data/products.js"

export default function Products() {
  const [active, setActive] = useState("All")
  const [allProducts, setAllProducts] = useState(initialProducts)
  const [categoriesList, setCategoriesList] = useState(initialCategories)

  useEffect(() => {
    let isMounted = true
    Promise.all([
      getProducts({ status: "Active", limit: 100 }).catch(() => null),
      getCategories({ status: "Active" }).catch(() => null),
    ]).then(([prodsRes, catsRes]) => {
      if (!isMounted) return

      const fetchedProds = Array.isArray(prodsRes) ? prodsRes : prodsRes?.data
      if (fetchedProds && fetchedProds.length > 0) {
        setAllProducts(
          fetchedProds.map((p) => ({
            ...p,
            id: p.displayId || p._id || p.id,
            fabric: p.details || p.fabric,
            image: p.images?.[0] || p.image || "/placeholder.jpg",
          }))
        )
      }

      const fetchedCats = Array.isArray(catsRes) ? catsRes : catsRes?.data
      if (fetchedCats && fetchedCats.length > 0) {
        setCategoriesList(["All", ...fetchedCats.map((c) => c.name)])
      }
    })

    return () => {
      isMounted = false
    }
  }, [])

  const filtered = useMemo(
    () => (active === "All" ? allProducts : allProducts.filter((p) => p.category === active)),
    [active, allProducts],
  )

  return (
    <>
      <PageHero
        eyebrow="Catalog"
        title="Our Products"
        subtitle="Explore our range of garments developed for global fashion markets — ready for wholesale and export."
        image="/images/hero-products.png"
      />

      <section className="bg-ivory py-16 md:py-20">
        <Container>
          <div className="flex flex-col gap-6 border-b border-charcoal/10 pb-8 md:flex-row md:items-center md:justify-between">
            <ProductFilter
              categories={categoriesList}
              active={active}
              onChange={setActive}
            />
            <span className="shrink-0 text-xs font-medium uppercase tracking-widest text-stone-500">
              {filtered.length} {filtered.length === 1 ? "Product" : "Products"}
            </span>
          </div>

          <div className="mt-12">
            <ProductGrid products={filtered} />
          </div>
        </Container>
      </section>
    </>
  )
}
