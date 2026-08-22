import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { categories } from "../../data/categories.js"

/**
 * Editorial staggered product showcase.
 *
 * Layout system: FLEXBOX (converted from CSS Grid).
 *
 * Each category row is an independent flex row:
 *   Even (0,2,4) → flex-row        : text | image
 *   Odd  (1,3)   → flex-row-reverse: text | image (visually: image | text)
 *
 * The stagger is reproduced with:
 *   - lg:-mt-24 on rows after the first  (vertical interlock between rows)
 *   - pt-16 / pt-24 on the text column   (vertical offset within each row)
 *
 * Text and image columns use flex-basis so widths are explicit and
 * independent of sibling content length.
 */

const fadeIn = (dir = 0) => ({
  hidden: { opacity: 0, x: dir },
  show: {
    opacity: 1, x: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
})

export default function Categories() {
  return (
    <section className="overflow-hidden bg-ivory">

      {/* ── Section header ── */}
      <div className="mx-auto max-w-[1280px] px-6 pt-20 pb-4 lg:px-16">
        <div className="border-b border-charcoal/10 pb-8">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-bronze">
            What We Produce
          </span>
          <h2 className="mt-3 font-serif text-4xl font-medium text-charcoal md:text-5xl">
            Product Categories
          </h2>
        </div>
      </div>

      {/* ── Category rows ── */}
      <div className="mx-auto max-w-[1280px] px-6 pb-24 lg:px-16">
        {categories.map((cat, i) => {
          const isEven = i % 2 === 0 // even → text left, image right

          return (
            <div
              key={cat.slug}
              // Negative top margin produces the vertical interlock / stagger.
              // Applied only on desktop (lg:) — mobile stacks cleanly.
              className={`relative ${i > 0 ? "lg:-mt-24" : ""}`}
            >
              {/*
               * FLEX ROW — the core layout unit.
               *
               * flex-row         → even: [text][image]
               * flex-row-reverse → odd:  [image][text]  (DOM order stays text-first
               *                          so tab/read order is always title → image)
               *
               * On mobile (below lg) we always stack vertically with flex-col,
               * and for odd rows we reverse back so image comes first visually.
               */}
              <div
                className={[
                  "flex items-start gap-0",
                  // Mobile: single column
                  "flex-col",
                  // Desktop: two-column flex row, direction depends on even/odd
                  isEven ? "lg:flex-row" : "lg:flex-row-reverse",
                ].join(" ")}
              >

                {/* ── TEXT BLOCK ── */}
                <motion.div
                  variants={fadeIn(isEven ? -28 : 28)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-80px" }}
                  // flex-basis: ~42% of the row width (mirrors the old col-span-5/12)
                  // align-self: flex-start so it never stretches to image height
                  // pt-16 / pt-24: vertical offset to float text mid-image (stagger)
                  // py-10 on mobile only
                  style={{ flexBasis: "42%", flexShrink: 0 }}
                  className={[
                    "flex flex-col justify-start self-start",
                    "py-10",                          // mobile top+bottom padding
                    isEven
                      ? "lg:py-0 lg:pt-16 lg:pr-12"  // text-left col: offset down + right gap
                      : "lg:py-0 lg:pt-16 lg:pl-16",  // text-right col: offset down + left gap
                  ].join(" ")}
                >
                  {/* Ghost index number */}
                  <span
                    aria-hidden="true"
                    className="font-serif text-[96px] font-bold leading-none text-charcoal/[0.04] select-none"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <span className="-mt-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-bronze">
                    Category {String(i + 1).padStart(2, "0")}
                  </span>

                  <h3 className="mt-3 font-serif text-3xl font-medium leading-[1.06] text-charcoal md:text-4xl xl:text-5xl">
                    {cat.name}
                  </h3>

                  <div className="mt-5 h-px w-10 bg-bronze" />

                  <p className="mt-5 max-w-xs text-sm leading-relaxed text-stone-500 md:text-base">
                    {cat.description}
                  </p>

                  <Link
                    to="/products"
                    className="group mt-8 inline-flex w-fit items-center gap-2 text-sm font-semibold uppercase tracking-wider text-charcoal transition-colors duration-200 hover:text-bronze"
                  >
                    Explore
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </motion.div>

                {/* ── IMAGE BLOCK ── */}
                <motion.div
                  variants={fadeIn(isEven ? 28 : -28)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-80px" }}
                  // flex-basis: ~58% — slightly wider than text (mirrors old col-span-6/12)
                  // align-self: flex-start so image sits at the top of the row
                  style={{ flexBasis: "58%", flexShrink: 0 }}
                  className="self-start w-full"
                >
                  <Link to="/products" className="group block">
                    <div
                      className={[
                        "relative overflow-hidden rounded-xl",
                        "shadow-[0_8px_40px_rgba(0,0,0,0.12)]",
                        "w-full max-w-[480px]",
                        // Even: right-align image within its column (text is on the left)
                        // Odd:  left-align  image within its column (text is on the right)
                        isEven ? "ml-auto" : "mr-auto",
                      ].join(" ")}
                      style={{ aspectRatio: "5/5" }}
                    >
                      <img
                        src={cat.image}
                        alt={cat.name}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-[1.04]"
                      />
                      {/* Subtle vignette */}
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/20 via-transparent to-transparent" />
                      {/* Category badge */}
                      <div className="absolute bottom-4 right-4 bg-white/90 px-3 py-1.5 backdrop-blur-sm">
                        <span className="text-[10px] font-semibold uppercase tracking-widest text-charcoal">
                          {cat.name}
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>

              </div>
            </div>
          )
        })}
      </div>

    </section>
  )
}
