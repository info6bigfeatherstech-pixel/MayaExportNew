import { motion } from "framer-motion"
import Container from "../common/Container.jsx"
import Reveal from "../common/Reveal.jsx"

const regions = [
  { name: "Europe", top: "34%", left: "48%" },
  { name: "North America", top: "38%", left: "22%" },
  { name: "Middle East", top: "48%", left: "58%" },
  { name: "Asia", top: "44%", left: "72%" },
  { name: "Africa", top: "60%", left: "50%" },
  { name: "South America", top: "60%", left: "34%" },
]

export default function GlobalReach() {
  return (
    <section className="relative overflow-hidden bg-[#002152] py-24 text-white md:py-32">
      {/* ══ Ambient background lighting & glows ══ */}
      <div className="pointer-events-none absolute -left-20 top-1/4 h-96 w-96 rounded-full bg-sky-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-1/4 h-96 w-96 rounded-full bg-blue-600/15 blur-3xl" />

      {/* ══ Subtle gradient edge blend ══ */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/20 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/20 to-transparent" />

      <Container className="relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16 xl:gap-20">
          {/* ── Left Column: Section Details ── */}
          <div>
            <Reveal>
              <div className="flex flex-col items-start text-left">
                <span className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-sky-400 sm:text-sm">
                  Global Presence
                </span>
                <h2 className="max-w-2xl font-serif text-4xl font-medium leading-[1.05] text-balance text-ivory sm:text-5xl lg:text-6xl">
                  From Manufacturing Hubs to Global Markets
                </h2>
                <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-slate-200/90 md:text-lg">
                  We connect trusted manufacturing centres with buyers across five continents. With 25+ years of manufacturing and export experience, Maya Exports delivers quality products to 50+ countries worldwide, ensuring reliable sourcing, consistent standards, and timely international shipments.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-10">
                <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {regions.map((region) => (
                    <li
                      key={region.name}
                      className="flex items-center gap-2.5 rounded-lg border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-sm font-medium text-slate-200 backdrop-blur-sm transition-colors duration-200 hover:border-sky-400/40 hover:bg-sky-500/10 hover:text-white"
                    >
                      <span className="h-2 w-2 shrink-0 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
                      <span>{region.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          {/* ── Right Column: World Map Presentation ── */}
          <Reveal delay={0.15}>
            <div className="relative overflow-hidden border border-white/10 bg-white/[0.03] shadow-2xl backdrop-blur-md">
              {/* Internal glow */}
              <div className="pointer-events-none absolute inset-0 bg-radial from-sky-500/10 via-transparent to-transparent" />

              <div className="relative aspect-[16/10] h-full w-full">
                <img
                  src="/images/world-map.png"
                  alt="Stylized world map showing global export regions"
                  className="h-full w-full object-cover opacity-90 drop-shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
                  loading="lazy"
                />

                {/* Pins and Animations */}
                {regions.map((region, i) => (
                  <motion.span
                    key={region.name}
                    className="group absolute flex h-4 w-4 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center"
                    style={{ top: region.top, left: region.left }}
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.12, duration: 0.5 }}
                  >
                    {/* Pulsing ring */}
                    <span className="absolute h-4 w-4 animate-ping rounded-full bg-sky-400/60" />
                    {/* Core pin dot */}
                    <span className="relative h-2.5 w-2.5 rounded-full border border-white bg-sky-300 shadow-[0_0_10px_rgba(56,189,248,1)]" />

                    {/* Region tooltip on hover */}
                    <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-white/15 bg-slate-900/90 px-2 py-1 text-[11px] font-semibold text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100">
                      {region.name}
                    </span>
                  </motion.span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
