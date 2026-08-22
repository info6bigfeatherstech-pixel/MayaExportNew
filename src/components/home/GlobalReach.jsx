import { motion } from "framer-motion"
import Container from "../common/Container.jsx"
import SectionHeading from "../common/SectionHeading.jsx"
import Reveal from "../common/Reveal.jsx"

const regions = [
  { name: "Europe", top: "34%", left: "48%" },
  { name: "North America", top: "38%", left: "22%" },
  { name: "Middle East", top: "48%", left: "58%" },
  { name: "Asia", top: "44%", left: "72%" },
  { name: "Africa", top: "60%", left: "50%" },
]

export default function GlobalReach() {
  return (
    <section className="bg-ink py-24 text-ivory md:py-32">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeading
              eyebrow="Global Presence"
              title="From Manufacturing Hubs to Global Markets"
              subtitle="We move garments from trusted production centres to buyers across five continents — reliably and on schedule."
              light
            />
            <Reveal delay={0.1}>
              <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3">
                {regions.map((region) => (
                  <li
                    key={region.name}
                    className="flex items-center gap-2 border-l border-ivory/15 pl-3 text-sm text-ivory/80"
                  >
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-bronze-light" />
                    {region.name}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <div className="relative aspect-[16/10] w-full">
              <img
                src="/images/world-map.png"
                alt="Stylized world map showing global export regions"
                className="h-full w-full object-contain opacity-70"
                loading="lazy"
              />
              {regions.map((region, i) => (
                <motion.span
                  key={region.name}
                  className="absolute flex h-3 w-3 -translate-x-1/2 -translate-y-1/2 items-center justify-center"
                  style={{ top: region.top, left: region.left }}
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.15, duration: 0.5 }}
                >
                  <span className="absolute h-3 w-3 animate-ping rounded-full bg-bronze-light/60" />
                  <span className="h-2 w-2 rounded-full bg-bronze-light" />
                </motion.span>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
