import {
  BadgeCheck,
  Globe2,
  Truck,
  Layers,
  MapPinned,
  Handshake,
} from "lucide-react"
import Container from "../common/Container.jsx"
import SectionHeading from "../common/SectionHeading.jsx"
import Reveal from "../common/Reveal.jsx"

const features = [
  {
    icon: BadgeCheck,
    title: "Quality First",
    description: "Strict quality checks from sourcing through to final shipment.",
  },
  {
    icon: Globe2,
    title: "Global Standards",
    description: "Products developed to meet exacting international buyer requirements.",
  },
  {
    icon: Truck,
    title: "Reliable Supply",
    description: "Consistent production capacity and dependable shipment processes.",
  },
  {
    icon: Layers,
    title: "Flexible Sourcing",
    description: "Multiple garment categories with full customization options.",
  },
  {
    icon: MapPinned,
    title: "Global Reach",
    description: "Serving international fashion, retail, and wholesale markets.",
  },
  {
    icon: Handshake,
    title: "Long-Term Partnerships",
    description: "Building lasting relationships with buyers and manufacturing partners.",
  },
]

export default function WhyChooseUs() {
  return (
    <section className="bg-stone-50 py-24 md:py-32">
      <Container>
        <SectionHeading
          eyebrow="Our Advantage"
          title="Why Global Buyers Choose Us"
          subtitle="A dependable partner engineered around quality, consistency, and long-term trust."
        />

        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden border border-charcoal/10 bg-charcoal/10 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <Reveal key={feature.title} delay={(i % 3) * 0.06}>
              <div className="group h-full bg-ivory p-8 transition-colors duration-300 hover:bg-white">
                <feature.icon className="h-7 w-7 text-bronze" strokeWidth={1.4} />
                <h3 className="mt-6 font-serif text-2xl font-medium text-charcoal">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-stone-500">
                  {feature.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
