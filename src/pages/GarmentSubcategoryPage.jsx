import { useParams, Navigate } from "react-router-dom"
import Container from "../components/common/Container.jsx"
import Breadcrumb from "../components/common/Breadcrumb.jsx"
import ProductGrid from "../components/products/ProductGrid.jsx"
import Reveal from "../components/common/Reveal.jsx"
import {
  getGarmentGender,
  getSubcategory,
  getGarmentProducts,
} from "../data/garments.js"

// Reuses the *exact* existing ProductGrid + ProductCard.
// The only difference is that the product link inside ProductCard uses product.id,
// so we patch each product's id to encode the full path via a custom linkTo prop.
// We extend ProductCard via a thin wrapper below, keeping the original untouched.

export default function GarmentSubcategoryPage() {
  const { gender, subcategory } = useParams()

  const genderData = getGarmentGender(gender)
  const subcatData = getSubcategory(gender, subcategory)
  const products = getGarmentProducts(gender, subcategory)

  if (!genderData || !subcatData) {
    return <Navigate to="/products" replace />
  }

  // Build breadcrumb
  const breadcrumbs = [
    { label: "Products", to: "/products" },
    { label: "Garments", to: "/products" },
    { label: genderData.label, to: `/products/garments/${gender}` },
    { label: subcatData.shortLabel },
  ]

  // Remap product links so ProductCard navigates to the garment detail route
  const remappedProducts = products.map((p) => ({
    ...p,
    // ProductCard uses: /products/${product.id}
    // We override the id to encode the full nested path as a param
    // that GarmentProductDetail will decode.
    // Simpler: we override the `linkTo` field; ProductCard will use it if present.
    linkTo: `/products/garments/${gender}/${subcategory}/${p.id}`,
  }))

  return (
    <>
      {/* ── Compact Hero / Page Header ─────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-ink pb-14 pt-40 md:pb-20 md:pt-52">
        {/* Background image from subcategory */}
        <img
          src={subcatData.image}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/50 to-ink/30" />

        <Container className="relative z-10">
          {/* Breadcrumb */}
          <div className="mb-6">
            <nav className="flex flex-wrap items-center gap-2">
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
                        <a
                          href={item.to}
                          className="text-xs font-medium uppercase tracking-widest text-ivory/40 transition-colors hover:text-ivory"
                        >
                          {item.label}
                        </a>
                        <span className="text-ivory/25 text-xs">›</span>
                      </>
                    )}
                  </span>
                )
              })}
            </nav>
          </div>

          <span className="text-xs font-medium uppercase tracking-widest text-bronze-light">
            Garments — {genderData.label}
          </span>
          <h1 className="mt-3 font-serif text-4xl font-medium leading-tight text-ivory md:text-5xl">
            {subcatData.label}
          </h1>
          <p className="mt-4 max-w-xl leading-relaxed text-ivory/60">
            {subcatData.description}
          </p>
        </Container>
      </section>

      {/* ── Product Grid ─────────────────────────────────────────────────── */}
      <section className="bg-ivory py-16 md:py-20">
        <Container>
          {/* Meta row — same as existing Products page */}
          <div className="flex flex-col gap-6 border-b border-charcoal/10 pb-8 md:flex-row md:items-center md:justify-between">
            <div>
              <span className="text-xs font-medium uppercase tracking-widest text-stone-500">
                {subcatData.label}
              </span>
            </div>
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
