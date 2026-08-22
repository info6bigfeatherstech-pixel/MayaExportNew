import ProductCard from "./ProductCard.jsx"
import Reveal from "../common/Reveal.jsx"

export default function ProductGrid({ products }) {
  if (!products.length) {
    return (
      <p className="py-20 text-center text-stone-500">
        No products found in this category.
      </p>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product, i) => (
        <Reveal key={product.id} delay={(i % 4) * 0.08}>
          <ProductCard product={product} />
        </Reveal>
      ))}
    </div>
  )
}
