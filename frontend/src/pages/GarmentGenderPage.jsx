import { useParams, Link, Navigate } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import Container from "../components/common/Container.jsx"
import Breadcrumb from "../components/common/Breadcrumb.jsx"
import Reveal from "../components/common/Reveal.jsx"
import {
  getGarmentGender,
  getSubcategoriesByGender,
} from "../data/garments.js"

// ─── Subcategory card ─────────────────────────────────────────────────────────
function SubcategoryCard({ sub, genderSlug, index }) {
  return (
    <Reveal delay={index * 0.07}>
      <Link
        to={`/products/garments/${genderSlug}/${sub.slug}`}
        className="group relative block overflow-hidden"
        aria-label={sub.label}
      >
        {/* Image */}
        <div className="aspect-[3/4] overflow-hidden bg-stone-100">
          <img
            src={sub.image}
            alt={sub.label}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/10 to-transparent transition-opacity duration-500 group-hover:opacity-90" />
        </div>

        {/* Text overlay */}
        <div className="absolute inset-x-0 bottom-0 p-6">
          <h3 className="font-serif text-xl font-medium leading-snug text-ivory md:text-2xl">
            {sub.label}
          </h3>
          <p className="mt-1.5 max-w-[22ch] text-[13px] leading-relaxed text-ivory/70 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 translate-y-2">
            {sub.description}
          </p>
          <div className="mt-4 flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-bronze-light opacity-0 transition-all duration-500 group-hover:opacity-100">
            Explore
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    </Reveal>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function GarmentGenderPage() {
  const { gender } = useParams()
  const genderData = getGarmentGender(gender)
  const subcategories = getSubcategoriesByGender(gender)

  if (!genderData) return <Navigate to="/products" replace />

  const breadcrumbs = [
    { label: "Products", to: "/products" },
    { label: "Garments", to: "/products" },
    { label: genderData.label },
  ]

  return (
    <>
      {/* ── Hero Banner ────────────────────────────────────────────────────── */}
      <section className="relative flex min-h-[60vh] items-end overflow-hidden bg-ink pb-16 pt-40 md:min-h-[80vh] md:pb-24 md:pt-52">
        <img
          src={genderData.heroImage}
          alt={genderData.title}
          className="absolute inset-0 h-full w-full object-cover object-top opacity-65"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent" />

        <Container className="relative z-10 w-full">
          {/* Breadcrumb */}
          <div className="mb-8">
            <nav className="flex flex-wrap items-center gap-2">
              <Link
                to="/products"
                className="text-xs font-medium uppercase tracking-widest text-ivory/50 transition-colors hover:text-ivory"
              >
                Products
              </Link>
              <span className="text-ivory/30 text-xs">›</span>
              <Link
                to="/products"
                className="text-xs font-medium uppercase tracking-widest text-ivory/50 transition-colors hover:text-ivory"
              >
                Garments
              </Link>
              <span className="text-ivory/30 text-xs">›</span>
              <span className="text-xs font-medium uppercase tracking-widest text-ivory/80">
                {genderData.label}
              </span>
            </nav>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <span className="text-xs font-medium uppercase tracking-widest text-bronze-light">
              Garments — {genderData.label}
            </span>
            <h1 className="mt-4 font-serif text-5xl font-medium leading-[1.02] text-balance text-ivory md:text-7xl">
              {genderData.title}
            </h1>
            <p className="mt-6 max-w-xl text-pretty leading-relaxed text-ivory/65 md:text-lg">
              {genderData.tagline}
            </p>
          </motion.div>
        </Container>
      </section>

      {/* ── Intro Section ──────────────────────────────────────────────────── */}
      <section className="bg-ivory py-16 md:py-20">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <span className="text-xs font-medium uppercase tracking-widest text-bronze">
                Maya Exports — {genderData.label}'s Range
              </span>
              <h2 className="mt-4 font-serif text-3xl font-medium leading-snug text-charcoal md:text-4xl">
                Premium Apparel, Export-Ready
              </h2>
              <p className="mt-5 leading-relaxed text-stone-500">
                {genderData.intro}
              </p>
            </Reveal>
          </div>

          {/* Divider */}
          <Reveal>
            <div className="mx-auto mt-12 flex items-center gap-4">
              <div className="h-px flex-1 bg-charcoal/10" />
              <span className="shrink-0 text-[10px] font-medium uppercase tracking-widest text-stone-400">
                Browse Categories
              </span>
              <div className="h-px flex-1 bg-charcoal/10" />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── Subcategory Grid ───────────────────────────────────────────────── */}
      <section className="bg-ivory pb-20 md:pb-28">
        <Container>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {subcategories.map((sub, i) => (
              <SubcategoryCard
                key={sub.slug}
                sub={sub}
                genderSlug={gender}
                index={i}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* ── CTA Strip ─────────────────────────────────────────────────────── */}
      <section className="border-t border-charcoal/10 bg-stone-50 py-16 md:py-20">
        <Container>
          <Reveal>
            <div className="flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
              <div>
                <h3 className="font-serif text-2xl font-medium text-charcoal md:text-3xl">
                  Looking for a custom program?
                </h3>
                <p className="mt-2 text-stone-500">
                  Our team works directly with buyers to develop tailored collections and private-label ranges.
                </p>
              </div>
              <Link
                to="/contact"
                className="group inline-flex shrink-0 items-center gap-2 bg-charcoal px-8 py-4 text-xs font-medium uppercase tracking-widest text-ivory transition-colors hover:bg-bronze"
              >
                Enquire Now
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  )
}
