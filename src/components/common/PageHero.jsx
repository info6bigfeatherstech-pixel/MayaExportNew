import { motion } from "framer-motion"
import Container from "./Container.jsx"

// Consistent inner-page hero with an optional background image.
export default function PageHero({ eyebrow, title, subtitle, image }) {
  return (
    <section className="relative flex min-h-[55vh] items-center overflow-hidden bg-ink pb-24 pt-40 text-ivory md:min-h-[74vh] md:pb-32 md:pt-52">
      {image && (
        <>
          <img
            src={image}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover object-top opacity-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent" />
        </>
      )}
      <Container className="relative z-10 w-full">
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
