import { Link } from "react-router-dom"
import { ArrowUpRight } from "lucide-react"

// Editorial catalog card: image on top, information below (no text over image).
// Accepts an optional `linkTo` override on the product object for nested routes.
export default function ProductCard({ product }) {
  const href = product.linkTo || `/products/${product.id}`
  return (
    <Link to={href} className="group flex flex-col">
      <div className="relative aspect-[4/5] overflow-hidden bg-stone-100">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
        />
        <div className="absolute right-4 top-4 flex h-10 w-10 translate-y-2 items-center justify-center bg-ivory text-charcoal opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight className="h-4 w-4" />
        </div>
      </div>
      <div className="flex flex-1 flex-col pt-5">
        <span className="text-[11px] font-medium tracking-widest text-bronze">
          {product.id}
        </span>
        <h3 className="mt-2 font-serif text-xl font-medium leading-snug text-charcoal">
          {product.name}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-stone-500">
          {product.description}
        </p>
        <span className="mt-4 text-[11px] font-medium uppercase tracking-widest text-charcoal/50">
          {product.category}
        </span>
        {product.productType && (
          <span className="mt-1 text-[11px] font-medium uppercase tracking-widest text-bronze/70">
            {product.productType}
          </span>
        )}
      </div>
    </Link>
  )
}
