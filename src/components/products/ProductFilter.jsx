import { useRef, useState, useEffect, useCallback } from "react"
import { createPortal } from "react-dom"
import { useNavigate } from "react-router-dom"
import { ChevronDown, ChevronRight } from "lucide-react"

// ─── Per-category dropdown configs ───────────────────────────────────────────
const DROPDOWN_CONFIGS = {
  Garments: {
    label: "Garments",
    items: [
      { label: "Men", to: "/products/garments/men" },
      { label: "Women", to: "/products/garments/women" },
      { label: "Children", to: "/products/garments/children" },
      { label: "Kids", to: "/products/garments/kids" },
    ],
  },
  Footwear: {
    label: "Footwear",
    items: [
      {
        label: "Men",
        to: "/products/footwear/men",
        subItems: [
          { label: "Sports & Casual Shoes", to: "/products/footwear/men/sports-casual-shoes" },
          { label: "Slippers & Sandals", to: "/products/footwear/men/slippers-sandals" },
          { label: "Office Shoes", to: "/products/footwear/men/office-shoes" },
        ],
      },
      {
        label: "Women",
        to: "/products/footwear/women",
        subItems: [
          { label: "Sports & Casual Shoes", to: "/products/footwear/women/sports-casual-shoes" },
          { label: "Slippers & Sandals", to: "/products/footwear/women/slippers-sandals" },
          { label: "Flats & Heels", to: "/products/footwear/women/flats-heels" },
          { label: "Boots", to: "/products/footwear/women/boots" },
        ],
      },
      {
        label: "Children",
        to: "/products/footwear/children",
        subItems: [
          { label: "Sports & Casual Shoes", to: "/products/footwear/children/sports-casual-shoes" },
          { label: "Slippers & Sandals", to: "/products/footwear/children/slippers-sandals" },
          { label: "Flats & Heels", to: "/products/footwear/children/flats-heels" },
          { label: "Boots", to: "/products/footwear/children/boots" },
        ],
      },
      {
        label: "Kids",
        to: "/products/footwear/kids",
        subItems: [
          { label: "Sports & Casual Shoes", to: "/products/footwear/kids/sports-casual-shoes" },
          { label: "Slippers & Sandals", to: "/products/footwear/kids/slippers-sandals" },
          { label: "Flats & Heels", to: "/products/footwear/kids/flats-heels" },
          { label: "Boots", to: "/products/footwear/kids/boots" },
        ],
      },
    ],
  },
  Fabrics: {
    label: "Fabrics",
    items: [
      { label: "Garments Fabrics", to: "/products/fabrics/garments-fabrics" },
      { label: "Home Textile Fabrics", to: "/products/fabrics/home-textile-fabrics" },
    ],
  },
  "Home Textile": {
    label: "Home Textile",
    items: [
      { label: "Blankets", to: "/products/home-textile/blankets" },
    ],
  },
  "Electronics & Appliances": {
    label: "Electronics & Appliances",
    items: [
      { label: "Home Appliances", to: "/products/electronics/home-appliances" },
    ],
  },
}

// ─── Dropdown Item with optional Flyout Submenu ──────────────────────────────
function DropdownItem({ item, onClose, navigate }) {
  const [hovered, setHovered] = useState(false)
  const hasSub = Boolean(item.subItems && item.subItems.length > 0)
  const subTimerRef = useRef(null)

  function handleItemEnter() {
    clearTimeout(subTimerRef.current)
    setHovered(true)
  }

  function handleItemLeave() {
    subTimerRef.current = setTimeout(() => setHovered(false), 120)
  }

  return (
    <div
      className="relative"
      onMouseEnter={handleItemEnter}
      onMouseLeave={handleItemLeave}
    >
      <button
        type="button"
        onMouseDown={(e) => {
          e.preventDefault()
          onClose()
          navigate(item.to)
        }}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          padding: "12px 16px",
          background: hovered ? "rgba(160,129,69,0.15)" : "transparent",
          border: "none",
          cursor: "pointer",
          fontSize: "13px",
          fontWeight: 500,
          color: hovered ? "#C0A063" : "#F6F4EF",
          textAlign: "left",
          transition: "background 0.15s, color 0.15s",
        }}
      >
        <span>{item.label}</span>
        {hasSub ? (
          <ChevronRight
            style={{
              width: "14px",
              height: "14px",
              color: "#A08145",
              transition: "transform 0.15s",
              transform: hovered ? "translateX(2px)" : "none",
            }}
          />
        ) : (
          <span style={{ color: "#A08145", fontSize: "12px" }}>→</span>
        )}
      </button>

      {/* Flyout Submenu */}
      {hasSub && hovered && (
        <div
          onMouseEnter={handleItemEnter}
          onMouseLeave={handleItemLeave}
          style={{
            position: "absolute",
            top: 0,
            left: "100%",
            marginLeft: "2px",
            minWidth: "220px",
            background: "#1A1A18",
            boxShadow: "0 8px 32px rgba(0,0,0,0.36)",
            border: "1px solid rgba(255,255,255,0.08)",
            overflow: "hidden",
            zIndex: 10000,
          }}
        >
          {/* Submenu Header */}
          <div
            style={{
              padding: "8px 16px",
              fontSize: "9px",
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#A08145",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {item.label} Categories
          </div>

          {/* Submenu Items */}
          {item.subItems.map((sub) => (
            <button
              key={sub.to}
              type="button"
              onMouseDown={(e) => {
                e.preventDefault()
                onClose()
                navigate(sub.to)
              }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                padding: "11px 16px",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                fontSize: "12.5px",
                fontWeight: 500,
                color: "#F6F4EF",
                textAlign: "left",
                transition: "background 0.15s, color 0.15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(160,129,69,0.2)"
                e.currentTarget.style.color = "#C0A063"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent"
                e.currentTarget.style.color = "#F6F4EF"
              }}
            >
              <span>{sub.label}</span>
              <span style={{ color: "#A08145", fontSize: "12px" }}>→</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Generic dropdown filter button ──────────────────────────────────────────
function CategoryDropdownButton({ category, isActive, onClick }) {
  const config = DROPDOWN_CONFIGS[category]
  const [open, setOpen] = useState(false)
  const [pos, setPos] = useState({ top: 0, left: 0 })
  const buttonRef = useRef(null)
  const timerRef = useRef(null)
  const navigate = useNavigate()

  const updatePos = useCallback(() => {
    if (!buttonRef.current) return
    const rect = buttonRef.current.getBoundingClientRect()
    setPos({
      top: rect.bottom + window.scrollY + 6,
      left: rect.left + window.scrollX,
    })
  }, [])

  function handleMouseEnter() {
    clearTimeout(timerRef.current)
    updatePos()
    setOpen(true)
  }

  function handleMouseLeave() {
    timerRef.current = setTimeout(() => setOpen(false), 180)
  }

  function handleDropdownEnter() {
    clearTimeout(timerRef.current)
  }

  function handleDropdownLeave() {
    timerRef.current = setTimeout(() => setOpen(false), 180)
  }

  // Close on scroll or resize
  useEffect(() => {
    if (!open) return
    const close = () => setOpen(false)
    window.addEventListener("scroll", close, { passive: true })
    window.addEventListener("resize", close, { passive: true })
    return () => {
      window.removeEventListener("scroll", close)
      window.removeEventListener("resize", close)
    }
  }, [open])

  const dropdown = open
    ? createPortal(
        <div
          onMouseEnter={handleDropdownEnter}
          onMouseLeave={handleDropdownLeave}
          style={{
            position: "absolute",
            top: pos.top,
            left: pos.left,
            zIndex: 9999,
            minWidth: "200px",
          }}
        >
          {/* Arrow pointer */}
          <div
            style={{
              position: "absolute",
              top: "-6px",
              left: "20px",
              width: 0,
              height: 0,
              borderLeft: "6px solid transparent",
              borderRight: "6px solid transparent",
              borderBottom: "6px solid #1A1A18",
            }}
          />
          {/* Panel */}
          <div
            style={{
              background: "#1A1A18",
              boxShadow: "0 8px 32px rgba(0,0,0,0.28)",
              border: "1px solid rgba(255,255,255,0.06)",
              overflow: "visible",
            }}
          >
            {/* Section header */}
            <div
              style={{
                padding: "8px 16px",
                fontSize: "9px",
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#A08145",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {config.label}
            </div>

            {/* Items */}
            {config.items.map((item) => (
              <DropdownItem
                key={item.to}
                item={item}
                onClose={() => setOpen(false)}
                navigate={navigate}
              />
            ))}
          </div>
        </div>,
        document.body
      )
    : null

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={onClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`flex shrink-0 items-center gap-1.5 border px-5 py-2.5 text-xs font-medium uppercase tracking-widest transition-colors duration-300 ${
          isActive
            ? "border-charcoal bg-charcoal text-ivory"
            : "border-charcoal/20 text-charcoal/70 hover:border-charcoal hover:text-charcoal"
        }`}
      >
        {category}
        <ChevronDown
          className={`h-3 w-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {dropdown}
    </>
  )
}

// ─── Main ProductFilter ───────────────────────────────────────────────────────
export default function ProductFilter({ categories, active, onChange }) {
  return (
    <div className="no-scrollbar -mx-6 flex gap-2 overflow-x-auto px-6 md:mx-0 md:flex-wrap md:px-0">
      {categories.map((category) => {
        const isActive = category === active

        // Categories that have a hover dropdown
        if (DROPDOWN_CONFIGS[category]) {
          return (
            <CategoryDropdownButton
              key={category}
              category={category}
              isActive={isActive}
              onClick={() => onChange(category)}
            />
          )
        }

        // All other categories — plain button
        return (
          <button
            key={category}
            type="button"
            onClick={() => onChange(category)}
            className={`shrink-0 border px-5 py-2.5 text-xs font-medium uppercase tracking-widest transition-colors duration-300 ${
              isActive
                ? "border-charcoal bg-charcoal text-ivory"
                : "border-charcoal/20 text-charcoal/70 hover:border-charcoal hover:text-charcoal"
            }`}
          >
            {category}
          </button>
        )
      })}
    </div>
  )
}
