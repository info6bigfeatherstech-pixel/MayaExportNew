import { useMemo, useState } from "react"
import PageHero from "../components/common/PageHero.jsx"
import Container from "../components/common/Container.jsx"
import ProductFilter from "../components/products/ProductFilter.jsx"
import ProductGrid from "../components/products/ProductGrid.jsx"
import { products, productCategories } from "../data/products.js"

export default function Products() {
  const [active, setActive] = useState("All")

  const filtered = useMemo(
    () => (active === "All" ? products : products.filter((p) => p.category === active)),
    [active],
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
              categories={productCategories}
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
