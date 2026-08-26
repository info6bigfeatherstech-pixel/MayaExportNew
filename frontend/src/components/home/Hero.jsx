import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useRef, useState, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Container from "../common/Container.jsx"
import Button from "../common/Button.jsx"

const slides = [
  {
    src: "/images/hero.png",
    alt: "Garment manufacturing floor with rolls of premium fabric",
  },
  {
    src: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1920&q=80&fit=crop",
    alt: "Modern textile manufacturing facility with industrial looms",
  },
  {
    src: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=1920&q=80&fit=crop",
    alt: "Premium fashion garment export warehouse",
  },
]

const AUTOPLAY_MS = 3000

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}
const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
}

export default function Hero() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1) // 1 = forward (right→left), -1 = backward
  const timerRef = useRef(null)

  const goTo = useCallback((index, dir) => {
    setDirection(dir)
    setCurrent(index)
  }, [])

  const next = useCallback(() => {
    goTo((current + 1) % slides.length, 1)
  }, [current, goTo])

  const prev = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length, -1)
  }, [current, goTo])

  // Autoplay — reset timer whenever current changes or user clicks
  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setCurrent((c) => {
        setDirection(1)
        return (c + 1) % slides.length
      })
    }, AUTOPLAY_MS)
  }, [])

  useEffect(() => {
    resetTimer()
    return () => clearInterval(timerRef.current)
  }, [resetTimer])

  const handleNext = () => {
    next()
    resetTimer()
  }

  const handlePrev = () => {
    prev()
    resetTimer()
  }

  const handleDot = (i) => {
    goTo(i, i > current ? 1 : -1)
    resetTimer()
  }

  const slideVariants = {
    enter: (dir) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1, transition: { duration: 0.85, ease: [0.45, 0, 0.2, 1] } },
    exit: (dir) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0, transition: { duration: 0.85, ease: [0.45, 0, 0.2, 1] } }),
  }

  return (
    <section className="relative flex min-h-[95svh] items-center overflow-hidden bg-ink">

      {/* Slider images */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.img
          key={current}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          src={slides[current].src}
          alt={slides[current].alt}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </AnimatePresence>

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/20" />
      <div className="absolute inset-0 bg-ink/25" />

      {/* Hero content */}
      <Container className="relative z-10 py-24 md:py-32">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="mx-auto max-w-4xl pl-0 text-center md:mx-0 md:max-w-3xl md:pl-8 md:text-left lg:pl-12"
        >
          {/* Eyebrow */}
          <motion.span
            variants={item}
            className="inline-block text-sm font-semibold uppercase tracking-[0.25em] text-bronze-light"
          >
            Since 2000
          </motion.span>

          {/* Heading */}
          <motion.h1
            variants={item}
            className="mt-5 font-serif text-6xl font-medium leading-[1.05] text-balance text-ivory md:text-7xl lg:text-8xl"
          >
            Premium Products
            <br className="hidden sm:block" />
            <span className="text-bronze-light"> Global Standards</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={item}
            className="mt-6 max-w-lg text-pretty text-lg leading-relaxed text-ivory/75 md:text-xl"
          >
            Maya Exports Ltd — Your trusted partner for quality exports with 25+ years of excellence in global trade.
          </motion.p>

          {/* Buttons */}
          <motion.div variants={item} className="mt-10 flex flex-wrap justify-center gap-4 md:justify-start">
            <Button to="/products" variant="light" arrow>
              Explore Now
            </Button>
            <Button
              to="/contact"
              variant="light"
              className="border-ivory/40 bg-transparent text-ivory hover:bg-ivory hover:text-charcoal"
            >
              Get in Touch
            </Button>
          </motion.div>
        </motion.div>
      </Container>

      {/* Prev / Next arrows */}
      <button
        onClick={handlePrev}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 z-20 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-ivory/30 bg-ink/40 text-ivory backdrop-blur-sm transition-all duration-200 hover:bg-ivory/20 md:left-6 lg:left-10"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={handleNext}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 z-20 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-ivory/30 bg-ink/40 text-ivory backdrop-blur-sm transition-all duration-200 hover:bg-ivory/20 md:right-6 lg:right-10"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Pagination dots */}
      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2.5">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => handleDot(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`transition-all duration-300 rounded-full ${
              i === current
                ? "w-7 h-2 bg-bronze-light"
                : "w-2 h-2 bg-ivory/40 hover:bg-ivory/70"
            }`}
          />
        ))}
      </div>

    </section>
  )
}
