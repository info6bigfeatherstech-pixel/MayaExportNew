import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"

const base =
  "group inline-flex items-center justify-center gap-2 text-xs font-medium uppercase tracking-widest transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none"

const sizes = {
  md: "px-7 py-4",
  sm: "px-5 py-3",
}

const variants = {
  primary:
    "bg-charcoal text-ivory hover:bg-bronze-dark",
  outline:
    "border border-charcoal/25 text-charcoal hover:border-charcoal hover:bg-charcoal hover:text-ivory",
  light:
    "border border-ivory/30 text-ivory hover:bg-ivory hover:text-charcoal",
  ghost:
    "text-charcoal hover:text-bronze px-0 py-0",
}

function Inner({ children, arrow }) {
  return (
    <>
      {children}
      {arrow && (
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      )}
    </>
  )
}

export default function Button({
  children,
  to,
  href,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  arrow = false,
  className = "",
}) {
  const classes = `${base} ${variant === "ghost" ? "" : sizes[size]} ${variants[variant]} ${className}`

  if (to) {
    return (
      <Link to={to} className={classes}>
        <Inner arrow={arrow}>{children}</Inner>
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes}>
        <Inner arrow={arrow}>{children}</Inner>
      </a>
    )
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      <Inner arrow={arrow}>{children}</Inner>
    </button>
  )
}
