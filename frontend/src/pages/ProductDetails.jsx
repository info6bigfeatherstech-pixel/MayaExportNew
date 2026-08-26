import { Link, useParams } from "react-router-dom"
import { useProductCatalog } from "../catalog/ProductCatalog.jsx"
import { ArrowLeft, Check } from "lucide-react"
import Container from "../components/common/Container.jsx"
import Button from "../components/common/Button.jsx"
import ProductCard from "../components/products/ProductCard.jsx"
import Reveal from "../components/common/Reveal.jsx"
import { useState } from "react"

export default function ProductDetails() {
  const { id } = useParams()
  const { products, loading, error } = useProductCatalog()
  const product = products.find((item) => item.id === id || item._id === id || item.displayId === id)

  /* ── image gallery state (guarantees 4 thumbnails on all products) ── */
  const rawImages = product?.images?.length
    ? product.images
    : product?.image
    ? [product.image]
    : ["/placeholder.jpg"]

  const galleryImages =
    rawImages.length >= 4
      ? rawImages.slice(0, 4)
      : [
          rawImages[0],
          rawImages[1] || rawImages[0],
          rawImages[2] || rawImages[0],
          rawImages[3] || rawImages[1] || rawImages[0],
        ]

  const [selectedIndex, setSelectedIndex] = useState(0)
  const displayedImage = galleryImages[selectedIndex] || galleryImages[0]

  if (loading) return <section className="flex min-h-[70vh] items-center justify-center bg-ivory pt-24 text-stone-500">Loading product…</section>

  if (!product || error) {
    return (
      <section className="flex min-h-[70vh] items-center justify-center bg-ivory pt-24">
        <Container className="text-center">
          <span className="eyebrow">404</span>
          <h1 className="mt-4 font-serif text-4xl font-medium text-charcoal">
            Product Not Found
          </h1>
          <p className="mx-auto mt-4 max-w-md text-stone-500">
            The product you are looking for is no longer available or the reference is
            incorrect.
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

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)
  const relatedList = (related.length ? related : products.filter((p) => p.id !== product.id)).slice(0, 4)

  const specs = [
    { label: "Product ID", value: product.id },
    { label: "Category", value: product.category },
    { label: "Fabric", value: product.fabric },
    { label: "Minimum Order (MOQ)", value: product.moq },
    { label: "Export Availability", value: product.export },
  ]

  return (
    <>
      <section className="bg-ivory pt-28 md:pt-36">
        <Container>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-stone-500 transition-colors hover:text-charcoal"
          >
            <ArrowLeft className="h-4 w-4" />
            All Products
          </Link>

          <div className="mt-8 grid gap-10 pb-24 lg:grid-cols-2 lg:gap-16">
            {/* ── Product image gallery ── */}
            <Reveal>
              <div className="flex gap-2.5 sm:gap-4">
                {/* 4 Vertical Thumbnails on Left Side */}
                <div className="flex flex-col justify-between gap-2 sm:gap-3 w-[18%] sm:w-[20%] shrink-0">
                  {galleryImages.map((img, idx) => {
                    const isActive = selectedIndex === idx
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedIndex(idx)}
                        aria-label={`View product image ${idx + 1}`}
                        className={`group relative overflow-hidden bg-stone-100 transition-all duration-200 aspect-[4/5] w-full rounded-none text-left p-0 cursor-pointer ${
                          isActive
                            ? "ring-2 ring-bronze ring-offset-1 ring-offset-ivory opacity-100"
                            : "opacity-70 hover:opacity-100 ring-1 ring-charcoal/10"
                        }`}
                      >
                        <img
                          src={img}
                          alt={`${product.name} thumbnail ${idx + 1}`}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </button>
                    )
                  })}
                </div>

                {/* Main Large Image */}
                <div className="relative flex-1 aspect-[4/5] min-w-0 overflow-hidden bg-stone-100">
                  <img
                    key={displayedImage + selectedIndex}
                    src={displayedImage}
                    alt={product.name}
                    className="h-full w-full object-cover transition-opacity duration-300"
                  />
                </div>
              </div>
            </Reveal>

            <div className="flex flex-col">
              <span className="text-xs font-medium tracking-widest text-bronze">
                {product.id}
              </span>
              <h1 className="mt-3 font-serif text-4xl font-medium leading-tight text-charcoal md:text-5xl">
                {product.name}
              </h1>
              <span className="mt-4 w-fit border border-charcoal/15 px-3 py-1 text-[11px] font-medium uppercase tracking-widest text-charcoal/60">
                {product.category}
              </span>
              <p className="mt-6 leading-relaxed text-stone-500">{product.description}</p>

              <div className="mt-8">
                <h3 className="text-xs font-medium uppercase tracking-widest text-charcoal/50">
                  Available Colors
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {(product.colors || []).map((color) => (
                    <span
                      key={color}
                      className="border border-charcoal/15 px-3 py-1.5 text-sm text-charcoal/80"
                    >
                      {color}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-xs font-medium uppercase tracking-widest text-charcoal/50">
                  Available Sizes
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {(product.sizes || []).map((size) => (
                    <span
                      key={size}
                      className="flex h-10 min-w-[2.75rem] items-center justify-center border border-charcoal/15 px-2 text-sm text-charcoal/80"
                    >
                      {size}
                    </span>
                  ))}
                </div>
              </div>

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
                <Button to="/contact" variant="primary" size="md" arrow className="w-full sm:w-auto">
                  Request Product Enquiry
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-charcoal/10 bg-stone-50 py-20 md:py-24">
        <Container>
          <h2 className="font-serif text-3xl font-medium text-charcoal md:text-4xl">
            Related Products
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {relatedList.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
