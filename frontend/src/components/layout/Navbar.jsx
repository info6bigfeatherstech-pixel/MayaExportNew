import { useEffect, useState } from "react"
import { Link, NavLink, useLocation } from "react-router-dom"
import { Menu, X } from "lucide-react"
import Container from "../common/Container.jsx"

const navItems = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Products", to: "/products" },
  { label: "Our Team", to: "/our-team" },
  { label: "Trade Events", to: "/trade-events" },
  { label: "Career", to: "/career" },
  { label: "Contact", to: "/contact" },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  // Pages that have a dark hero at the top — navbar text should be light when not scrolled
  const darkHeroPages = ["/"]
  const hasDarkHero = darkHeroPages.includes(location.pathname)
  const isTransparent = !scrolled && hasDarkHero

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-charcoal/10 bg-ivory/95 shadow-sm backdrop-blur-md"
          : hasDarkHero
          ? "border-b border-white/10 bg-ink/60 backdrop-blur-sm"
          : "border-b border-charcoal/10 bg-ivory/95 backdrop-blur-md"
      }`}
    >
      <Container>
        <div
          className={`flex items-center justify-between transition-all duration-300 ${
            scrolled ? "h-24" : "h-28 md:h-32"
          }`}
        >
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="/images/logo.png"
              alt="Global Threads Exports"
              className="h-20 w-auto transition-all duration-300 md:h-24"
              style={{ filter: "brightness(1.2) contrast(1.05)" }}
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-7 xl:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  `link-underline text-sm font-medium uppercase tracking-wider transition-colors duration-300 ${
                    isActive
                      ? "text-bronze"
                      : isTransparent
                      ? "text-ivory hover:text-bronze-light"
                      : "text-charcoal/70 hover:text-charcoal"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Enquire Now CTA */}
          <div className="hidden xl:block">
            <Link
              to="/contact"
              className={`group inline-flex items-center gap-2 px-6 py-3 text-sm font-medium uppercase tracking-wider transition-colors duration-300 ${
                isTransparent
                  ? "bg-ivory text-charcoal hover:bg-bronze hover:text-ivory"
                  : "bg-charcoal text-ivory hover:bg-bronze"
              }`}
            >
              Enquire Now
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className={`flex h-10 w-10 items-center justify-center xl:hidden transition-colors duration-300 ${
              isTransparent ? "text-ivory" : "text-charcoal"
            }`}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </Container>

      {/* Mobile menu */}
      <div
        className={`fixed inset-x-0 top-24 z-40 origin-top overflow-hidden border-t border-charcoal/10 bg-ivory transition-all duration-300 xl:hidden ${
          open ? "max-h-[90vh] opacity-100" : "pointer-events-none max-h-0 opacity-0"
        }`}
      >
        <Container>
          <nav className="flex flex-col py-4">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  `border-b border-charcoal/10 py-4 text-sm font-medium uppercase tracking-widest ${
                    isActive ? "text-bronze" : "text-charcoal"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <Link
              to="/contact"
              className="mt-6 inline-flex items-center justify-center bg-charcoal px-6 py-4 text-xs font-medium uppercase tracking-widest text-ivory"
            >
              Enquire Now
            </Link>
          </nav>
        </Container>
      </div>
    </header>
  )
}
