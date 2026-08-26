import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import {
  Package,
  Weight,
  Users,
  Globe2,
  ArrowRight,
} from "lucide-react"
import { Link } from "react-router-dom"
import Container from "../common/Container.jsx"
import Reveal from "../common/Reveal.jsx"

/* ──────────────────────────────────────────────
   Animated Counter – counts from 0 to `end`
   when the element scrolls into view
   ────────────────────────────────────────────── */
function AnimatedCounter({ end, duration = 2 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return
    let start = 0
    const step = end / (duration * 60)
    let raf
    function tick() {
      start += step
      if (start >= end) {
        setCount(end)
        return
      }
      setCount(Math.floor(start))
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [isInView, end, duration])

  return <span ref={ref}>{count.toLocaleString()}</span>
}

/* ──────────────────────────────────────────────
   Statistics data
   ────────────────────────────────────────────── */
const stats = [
  {
    icon: Package,
    value: 6000,
    suffix: "+",
    label: "Delivered Packages",
  },
  {
    icon: Weight,
    value: 1000,
    suffix: "+",
    label: "Tons of Goods",
  },
  {
    icon: Users,
    value: 700,
    suffix: "+",
    label: "Satisfied Customers",
  },
  {
    icon: Globe2,
    value: 50,
    suffix: "+",
    label: "Countries Covered",
  },
]

/* ──────────────────────────────────────────────
   Image card data
   ────────────────────────────────────────────── */
const imageCards = [
  {
    image: "/images/why-crane-bw.jpg",
    alt: "Shipping crane at port loading containers",
    text: "With 25+ years of experience, we handle cargo operations with precision—from port handling and loading to complete shipment preparation for international markets.",
  },
  {
    image: "/images/why-container-ship.jpg",
    alt: "Container ship loaded with cargo sailing on the ocean",
    text: "Our global shipping network reaches 50+ countries, handling containerized cargo across garments, footwear, home textiles, fabrics, and electronics. We ensure reliable delivery whether you need small consignments or full container loads.",
  },
]

/* ──────────────────────────────────────────────
   Main Section Component
   ────────────────────────────────────────────── */
export default function WhyChooseUs() {
  return (
    <>
      {/* ═══════════════════════════════════════════
          SECTION 1 – Image Cards with Cyan Overlays
          ═══════════════════════════════════════════ */}
      <section className="bg-ivory py-20 md:py-0">
        <Container>
          {/* Section Title */}
          <Reveal>
            <div className="mb-16 text-center">
              <h2 className="font-serif text-4xl font-bold uppercase tracking-wide text-charcoal md:text-5xl">
                Why Choose Us
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-stone-500 md:text-lg">
                With 25+ years of experience in manufacturing and international trade, we deliver quality products across garments, footwear, home textiles, fabrics, and electronics to 50+ countries worldwide.
              </p>
            </div>
          </Reveal>

          {/* Image Cards Grid */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
            {imageCards.map((card, i) => (
              <Reveal key={i} delay={i * 0.12}>
                <div className="group relative overflow-hidden rounded-sm shadow-lg">
                  {/* Image */}
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={card.image}
                      alt={card.alt}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  {/* Cyan overlay text box */}
                  <div className="absolute bottom-0 right-0 w-[70%] sm:w-[60%]">
                    <motion.div
                      initial={{ x: 40, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.6,
                        delay: 0.2 + i * 0.15,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="bg-[#00bcd4] p-5 text-sm font-medium leading-relaxed text-white sm:p-6 sm:text-base md:p-7"
                    >
                      {card.text}
                    </motion.div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Description Paragraphs */}
          <Reveal>
            <div className="mx-auto mt-16 max-w-4xl space-y-5 text-base leading-relaxed text-stone-600 md:mt-20 md:text-[17px]">
              <p>
                 Maya Exports LTD brings over 25 years of expertise in international trade and manufacturing. We specialize in five key categories: garments, footwear, home textiles, fabrics, and electronics & appliances. As both manufacturers and exporters, we understand the complete supply chain from production to final delivery, ensuring consistent quality and professional handling at every stage.
              </p>
              <p>
                 Our strength lies in sourcing and manufacturing quality products while managing all export requirements for international buyers. We handle documentation, logistics, compliance, and shipping with complete professionalism—working with businesses of all sizes, from small orders to bulk container shipments.
              </p>
              <p>
                 Exporting to over 50 countries worldwide, Maya Exports LTD has built lasting relationships based on quality products, timely delivery, and transparent communication. We focus on understanding your specific requirements and delivering solutions that meet international standards. From initial inquiry to final delivery, we are committed to making international trade simple and reliable for our clients.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 2 – Our Statistics
          ═══════════════════════════════════════════ */}
      <section className="bg-ivory pb-0">
        {/* White-background heading */}
        <Reveal>
          <div className="py-12 text-center md:py-16">
            <h2 className="font-serif text-4xl font-bold uppercase tracking-wide text-charcoal md:text-5xl">
              Our Statistics
            </h2>
          </div>
        </Reveal>

        {/* Dark overlay stats bar with port background */}
        <div className="relative overflow-hidden">
          <img
            src="/images/why-stats-bg.jpg"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-charcoal/75" />

          <div className="relative z-10 py-16 md:py-20">
            <Container>
              <div className="grid grid-cols-2 gap-y-12 lg:grid-cols-4">
                {stats.map((stat, i) => (
                  <Reveal key={stat.label} delay={i * 0.1}>
                    <div className="flex flex-col items-center text-center text-white">
                      {/* Icon */}
                      <stat.icon
                        className="mb-4 h-10 w-10 text-white/80 md:h-12 md:w-12"
                        strokeWidth={1.2}
                      />
                      {/* Number */}
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-bold md:text-5xl lg:text-6xl">
                          <AnimatedCounter end={stat.value} />
                        </span>
                        <span className="text-3xl font-bold text-white/80 md:text-4xl">
                          {stat.suffix}
                        </span>
                      </div>
                      {/* Label */}
                      <span className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/70 md:text-sm">
                        {stat.label}
                      </span>
                    </div>
                  </Reveal>
                ))}
              </div>
            </Container>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 3 – CTA Banner
          ═══════════════════════════════════════════ */}
      <section className="bg-[#00bcd4]">
        <Container>
          <div className="flex flex-col items-start justify-between gap-6 py-8 md:flex-row md:items-center md:py-10">
            {/* CTA Text */}
            <Reveal>
              <h3 className="max-w-2xl text-lg font-bold leading-snug text-white md:text-xl lg:text-2xl">
                Not sure where to find reliable, high-quality products for your global market? Let’s help you source better.
              </h3>
            </Reveal>

            {/* CTA Button */}
            <Reveal delay={0.15}>
              <Link
                to="/contact"
                className="group inline-flex items-center gap-3 whitespace-nowrap border-2 border-white bg-transparent px-7 py-3 text-xs font-bold uppercase tracking-widest text-white transition-all duration-300 hover:bg-white hover:text-[#00bcd4]"
              >
                Contact Now
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  )
}
