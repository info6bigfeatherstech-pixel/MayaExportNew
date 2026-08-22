import { motion } from "framer-motion"
import Container from "./Container.jsx"

// Consistent inner-page hero with an optional background image.
export default function PageHero({ eyebrow, title, subtitle, image }) {
  return (
    <section className="relative overflow-hidden bg-ink pb-16 pt-36 text-ivory md:pb-24 md:pt-48">
      {image && (
        <>
          <img
            src={image}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/40" />
        </>
      )}
      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          {eyebrow && (
            <span className="text-xs font-medium uppercase tracking-widest text-bronze-light">
              {eyebrow}
            </span>
          )}
          <h1 className="mt-5 font-serif text-5xl font-medium leading-[1.02] text-balance md:text-6xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-5 max-w-xl text-pretty leading-relaxed text-ivory/70">
              {subtitle}
            </p>
          )}
        </motion.div>
      </Container>
    </section>
  )
}
