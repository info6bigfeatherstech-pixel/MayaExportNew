import { Link } from "react-router-dom"
import { ChevronRight } from "lucide-react"

/**
 * Reusable breadcrumb nav.
 * items = [{ label, to }]  — last item is the current page (no link, visually distinct).
 */
export default function Breadcrumb({ items = [] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5">
      {items.map((item, i) => {
        const isLast = i === items.length - 1
        return (
          <span key={i} className="flex items-center gap-1.5">
            {isLast ? (
              <span
                className="text-xs font-medium uppercase tracking-widest text-charcoal"
                aria-current="page"
              >
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
                <ChevronRight className="h-3 w-3 shrink-0 text-stone-300" aria-hidden="true" />
              </>
            )}
          </span>
        )
      })}
    </nav>
  )
}
