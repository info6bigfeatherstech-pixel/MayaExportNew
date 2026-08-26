import { Link, useParams, Navigate } from "react-router-dom"
import { ArrowLeft, Check } from "lucide-react"
import Container from "../components/common/Container.jsx"
import Button from "../components/common/Button.jsx"
import ProductCard from "../components/products/ProductCard.jsx"
import Reveal from "../components/common/Reveal.jsx"
import {
  getGarmentGender,
  getSubcategory,
  getGarmentProductById,
  getGarmentProducts,
} from "../data/garments.js"

export default function GarmentProductDetail() {
  const { gender, subcategory, id } = useParams()

  const genderData = getGarmentGender(gender)
  const subcatData = getSubcategory(gender, subcategory)
  const product = getGarmentProductById(id)

  // 404 guard
  if (!genderData || !subcatData || !product) {
    return (
      <section className="flex min-h-[70vh] items-center justify-center bg-ivory pt-24">
        <Container className="text-center">
          <span className="eyebrow">404</span>
          <h1 className="mt-4 font-serif text-4xl font-medium text-charcoal">
            Product Not Found
          </h1>
          <p className="mx-auto mt-4 max-w-md text-stone-500">
            The product you are looking for is no longer available or the
            reference is incorrect.
          </p>
          <div className="mt-8 flex justify-center">
            <Button to="/products" variant="outline" arrow>
              Back to Products
            </Button>
          </div>
        </Container>
      </section>
    )
  }

  // Related products from the same subcategory
  const related = getGarmentProducts(gender, subcategory)
    .filter((p) => p.id !== product.id)
    .slice(0, 4)
    .map((p) => ({
      ...p,
      linkTo: `/products/garments/${gender}/${subcategory}/${p.id}`,
    }))

  const specs = [
    { label: "Product ID", value: product.id },
    { label: "Category", value: product.category },
    { label: "Subcategory", value: subcatData.label },
    { label: "Fabric", value: product.fabric },
    { label: "Minimum Order (MOQ)", value: product.moq },
    { label: "Export Availability", value: product.export },
  ]

  const backTo = `/products/garments/${gender}/${subcategory}`
  const backLabel = subcatData.label

  return (
    <>
      <section className="bg-ivory pt-28 md:pt-36">
        <Container>
          {/* Back link */}
          <Link
            to={backTo}
            className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-stone-500 transition-colors hover:text-charcoal"
          >
            <ArrowLeft className="h-4 w-4" />
            {backLabel}
          </Link>

          {/* Breadcrumb */}
          <nav className="mt-3 flex flex-wrap items-center gap-2" aria-label="Breadcrumb">
            {[
              { label: "Products", to: "/products" },
              { label: "Garments", to: "/products" },
              { label: genderData.label, to: `/products/garments/${gender}` },
              { label: subcatData.shortLabel, to: backTo },
              { label: product.name },
            ].map((item, i, arr) => {
              const isLast = i === arr.length - 1
              return (
                <span key={i} className="flex items-center gap-2">
                  {isLast ? (
                    <span className="text-xs font-medium uppercase tracking-widest text-charcoal/70">
                      {item.label}
                    </span>
                  ) : (
                    <>
                      <Link
                        to={item.to}
                        className="text-xs font-medium uppercase tracking-widest text-stone-400 transition-colors hover:text-charcoal"
                      >
                        {item.label}
                      </Link>
                      <span className="text-stone-300 text-xs">›</span>
                    </>
                  )}
                </span>
              )
            })}
          </nav>

          {/* Product layout — identical structure to existing ProductDetails.jsx */}
          <div className="mt-8 grid gap-10 pb-24 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <div className="aspect-[4/5] overflow-hidden bg-stone-100">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              </div>
            </Reveal>

            <div className="flex flex-col">
              <span className="text-xs font-medium tracking-widest text-bronze">
                {product.id}
              </span>
              <h1 className="mt-3 font-serif text-4xl font-medium leading-tight text-charcoal md:text-5xl">
                {product.name}
              </h1>

              {/* Category badges */}
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="border border-charcoal/15 px-3 py-1 text-[11px] font-medium uppercase tracking-widest text-charcoal/60">
                  {product.category}
                </span>
                <span className="border border-bronze/30 px-3 py-1 text-[11px] font-medium uppercase tracking-widest text-bronze">
                  {subcatData.label}
                </span>
              </div>

              <p className="mt-6 leading-relaxed text-stone-500">
                {product.description}
              </p>

              {/* Colors */}
              <div className="mt-8">
                <h3 className="text-xs font-medium uppercase tracking-widest text-charcoal/50">
                  Available Colors
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <span
                      key={color}
                      className="border border-charcoal/15 px-3 py-1.5 text-sm text-charcoal/80"
                    >
                      {color}
                    </span>
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div className="mt-6">
                <h3 className="text-xs font-medium uppercase tracking-widest text-charcoal/50">
                  Available Sizes
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <span
                      key={size}
                      className="flex h-10 min-w-[2.75rem] items-center justify-center border border-charcoal/15 px-2 text-sm text-charcoal/80"
                    >
                      {size}
                    </span>
                  ))}
                </div>
              </div>

              {/* Specs table */}
              <dl className="mt-8 border-t border-charcoal/10">
                {specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="flex items-center justify-between gap-4 border-b border-charcoal/10 py-4"
                  >
                    <dt className="text-xs font-medium uppercase tracking-widest text-stone-500">
                      {spec.label}
                    </dt>
                    <dd className="text-right text-sm font-medium text-charcoal">
                      {spec.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-8 flex items-center gap-2 text-sm text-stone-500">
                <Check className="h-4 w-4 text-bronze" />
                Customization and private-label options available on request.
              </div>

              <div className="mt-8">
                <Button
                  to="/contact"
                  variant="primary"
                  size="md"
                  arrow
                  className="w-full sm:w-auto"
                >
                  Request Product Enquiry
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Related products */}
      {related.length > 0 && (
        <section className="border-t border-charcoal/10 bg-stone-50 py-20 md:py-24">
          <Container>
            <h2 className="font-serif text-3xl font-medium text-charcoal md:text-4xl">
              More in {subcatData.label}
            </h2>
            <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  )
}
