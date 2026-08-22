import Container from "../common/Container.jsx"
import Reveal from "../common/Reveal.jsx"
import { ArrowRight, Globe, ShieldCheck } from "lucide-react"
import { Link } from "react-router-dom"

const stats = [
  { value: "25+", label: "Years Experience" },
  { value: "40+", label: "Countries Served" },
]

const features = [
  {
    icon: ShieldCheck,
    title: "Uncompromising Quality",
    desc: "Every product is rigorously inspected to meet international standards before export.",
  },
  {
    icon: Globe,
    title: "Global Reach",
    desc: "We deliver to 40+ countries, managing end-to-end logistics with trusted partners worldwide.",
  },
]

export default function AboutPreview() {
  return (
    <section className="bg-ivory py-24 md:py-32">
      <Container>
        {/* Switch to a wider left column: 55% image / 45% content */}
        <div className="grid items-center gap-16 lg:grid-cols-[1.2fr_1fr] lg:gap-20">

          {/* ── LEFT: Image with stat badge ── */}
          <Reveal>
            <div className="relative pb-10 pr-4 md:pr-12">
              {/* Image — wider aspect, stronger presence, soft shadow */}
              <div className="relative overflow-hidden rounded-2xl aspect-[4/5] w-full bg-stone-100 shadow-[0_12px_48px_rgba(0,0,0,0.12)]">
                <img
                  src="/images/about-preview.png"
                  alt="Maya Exports team reviewing garment samples and fabric swatches"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Stat badge */}
              <div className="absolute bottom-0 right-0 bg-charcoal px-9 py-7 shadow-xl rounded-tl-2xl">
                <div className="flex items-end gap-10">
                  {stats.map((s) => (
                    <div key={s.value} className="flex flex-col">
                      <span className="font-serif text-5xl font-semibold leading-none text-bronze-light">
                        {s.value}
                      </span>
                      <span className="mt-2 text-xs font-medium uppercase tracking-widest text-ivory/60">
                        {s.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          {/* ── RIGHT: Content ── */}
          <div className="lg:pl-4">
            <Reveal>
              {/* Eyebrow */}
              <span className="text-base font-semibold uppercase tracking-[0.22em] text-bronze">
                About Our Company
              </span>

              {/* Heading */}
              <h2 className="mt-4 font-serif text-5xl font-medium leading-[1.06] text-balance text-charcoal md:text-6xl lg:text-[4rem]">
                Maya Exports Limited
              </h2>

              {/* Divider */}
              <div className="mt-6 h-px w-14 bg-bronze" />

              {/* Body */}
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-stone-500 md:text-xl">
                With over two decades of excellence in the export industry,{" "}
                Maya Exports Ltd has
                established itself as a trusted global partner for premium quality products.
                Our commitment to quality, reliability, and customer satisfaction has made us
                the preferred choice for clients across 40+ countries.
              </p>
            </Reveal>

            {/* Feature columns */}
            <Reveal delay={0.12}>
              <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
                {features.map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="flex flex-col gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-bronze/30 text-bronze">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-base font-semibold uppercase tracking-wider text-charcoal">
                      {title}
                    </h3>
                    <p className="text-base leading-relaxed text-stone-500">{desc}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* CTA button */}
            <Reveal delay={0.2}>
              <Link
                to="/about"
                className="group mt-10 inline-flex items-center gap-2.5 rounded-md border border-charcoal bg-charcoal px-8 py-4 text-base font-semibold uppercase tracking-wider text-ivory transition-all duration-300 hover:bg-bronze hover:border-bronze"
              >
                More About Maya Exports
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>

        </div>
      </Container>
    </section>
  )
}
