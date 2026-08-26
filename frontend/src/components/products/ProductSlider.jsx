import { useState, useRef, useEffect, useCallback } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import ProductCard from "./ProductCard.jsx"

/**
 * Professional infinite-loop carousel using the clone-track technique:
 *
 * Layout:  [ ...clones of last N ] [ real items ] [ ...clones of first N ]
 *
 * We start positioned on the real items. When the track slides into a clone
 * region we instantly (no transition) snap back to the matching real position —
 * the user never sees the jump because it happens on an identical frame.
 */

function getVisible(w) {
  if (w >= 1024) return 4
  if (w >= 640)  return 2
  return 1
}

export default function ProductSlider({ products }) {
  const total       = products.length
  const wrapperRef  = useRef(null)
  const trackRef    = useRef(null)
  const [visible, setVisible]     = useState(4)
  const [index, setIndex]         = useState(0)   // logical index into `products`
  const [transitioning, setTrans] = useState(false)

  // ── Responsive: watch container width ───────────────────────────────────
  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => setVisible(getVisible(e.contentRect.width)))
    ro.observe(el)
    setVisible(getVisible(el.clientWidth))
    return () => ro.disconnect()
  }, [])

  // ── Build cloned track ───────────────────────────────────────────────────
  // We clone `visible` items from each end so the loop feels seamless.
  // clonesBefore = last `visible` items  (prepended)
  // clonesAfter  = first `visible` items (appended)
  const clonesBefore = products.slice(-visible)
  const clonesAfter  = products.slice(0, visible)
  const track        = [...clonesBefore, ...products, ...clonesAfter]

  // The real items start at position `visible` inside `track`
  // translateIndex is what we actually pass to CSS transform
  const translateIndex = index + visible   // offset by the prepended clones

  // ── CSS transform: shift by one card-width at a time ────────────────────
  // Each card is (100 / visible)% wide. Gap is handled by padding trick below.
  const cardPct = 100 / visible

  // ── Navigate ─────────────────────────────────────────────────────────────
  const go = useCallback((dir) => {
    if (transitioning) return
    setTrans(true)
    setIndex((prev) => prev + dir)
  }, [transitioning])

  // ── After transition ends: silent snap if we're in clone territory ───────
  const onTransitionEnd = useCallback(() => {
    setTrans(false)
    setIndex((prev) => {
      if (prev >= total)  return prev - total   // went past end   → snap to start
      if (prev < 0)       return prev + total   // went before start → snap to end
      return prev
    })
  }, [total])

  // When we snap (transitioning becomes false AND index changed), disable
  // transition momentarily so the snap is invisible.
  const isSnapping = !transitioning && (index >= total || index < 0)

  return (
    <div>
      <div ref={wrapperRef} className="overflow-hidden">
        {/* Track — one long flex row of (clones + real + clones) */}
        <div
          ref={trackRef}
          className="flex"
          style={{
            transform:  `translateX(-${translateIndex * cardPct}%)`,
            transition: isSnapping ? "none" : "transform 0.45s cubic-bezier(0.45, 0, 0.2, 1)",
            willChange: "transform",
          }}
          onTransitionEnd={onTransitionEnd}
        >
          {track.map((product, i) => (
            <div
              key={`${product.id}-${i}`}
              style={{ width: `${cardPct}%`, flexShrink: 0, padding: "0 12px" }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>

      {/* Controls — never disabled */}
      <div className="mt-8 flex gap-3">
        <button
          type="button"
          aria-label="Previous products"
          onClick={() => go(-1)}
          className="flex h-12 w-12 items-center justify-center border border-charcoal/20 text-charcoal transition-colors hover:border-charcoal hover:bg-charcoal hover:text-ivory"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          aria-label="Next products"
          onClick={() => go(1)}
          className="flex h-12 w-12 items-center justify-center border border-charcoal/20 text-charcoal transition-colors hover:border-charcoal hover:bg-charcoal hover:text-ivory"
        >
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
