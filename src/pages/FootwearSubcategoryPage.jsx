import { useParams, Navigate, Link } from "react-router-dom"
import Container from "../components/common/Container.jsx"
import ProductGrid from "../components/products/ProductGrid.jsx"
import {
  getFootwearGender,
  getFootwearSubcategory,
  getFootwearProducts,
} from "../data/footwearData.js"

export default function FootwearSubcategoryPage() {
  const { gender, subcategory } = useParams()

  const genderData = getFootwearGender(gender)
  const subcatData = getFootwearSubcategory(gender, subcategory)
  const products = getFootwearProducts(gender, subcategory)

  if (!genderData || !subcatData) {
    return <Navigate to="/products" replace />
  }

  const breadcrumbs = [
    { label: "Products", to: "/products" },
    { label: "Footwear", to: "/products" },
    { label: genderData.label, to: `/products/footwear/${gender}` },
    { label: subcatData.shortLabel },
  ]

  const remappedProducts = products.map((p) => ({
    ...p,
    linkTo: `/products/footwear/${gender}/${subcategory}/${p.id}`,
  }))

  return (
    <>
      {/* ── Compact Hero / Page Header ─────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-ink pb-14 pt-40 md:pb-20 md:pt-52">
        <img
          src={subcatData.image}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/50 to-ink/30" />

        <Container className="relative z-10">
          {/* Breadcrumb */}
          <nav className="mb-6 flex flex-wrap items-center gap-2" aria-label="Breadcrumb">
            {breadcrumbs.map((item, i) => {
              const isLast = i === breadcrumbs.length - 1
              return (
                <span key={i} className="flex items-center gap-2">
                  {isLast ? (
                    <span className="text-xs font-medium uppercase tracking-widest text-ivory/80">
                      {item.label}
                    </span>
                  ) : (
                    <>
                      <Link
                        to={item.to}
                        className="text-xs font-medium uppercase tracking-widest text-ivory/40 transition-colors hover:text-ivory"
                      >
                        {item.label}
                      </Link>
                      <span className="text-xs text-ivory/25">›</span>
                    </>
                  )}
                </span>
              )
            })}
          </nav>

          <span className="text-xs font-medium uppercase tracking-widest text-bronze-light">
            Footwear — {genderData.label}
          </span>
          <h1 className="mt-3 font-serif text-4xl font-medium leading-tight text-ivory md:text-5xl">
            {genderData.label}'s {subcatData.shortLabel}
          </h1>
          <p className="mt-4 max-w-xl leading-relaxed text-ivory/60">
            {subcatData.description}
          </p>
        </Container>
      </section>

      {/* ── Product Grid ───────────────────────────────────────────────────── */}
      <section className="bg-ivory py-16 md:py-20">
        <Container>
          <div className="flex flex-col gap-6 border-b border-charcoal/10 pb-8 md:flex-row md:items-center md:justify-between">
            <span className="text-xs font-medium uppercase tracking-widest text-stone-500">
              {genderData.label} / {subcatData.shortLabel}
            </span>
            <span className="shrink-0 text-xs font-medium uppercase tracking-widest text-stone-500">
              {remappedProducts.length}{" "}
              {remappedProducts.length === 1 ? "Product" : "Products"}
            </span>
          </div>

          <div className="mt-12">
            <ProductGrid products={remappedProducts} />
          </div>
        </Container>
      </section>
    </>
  )
}
