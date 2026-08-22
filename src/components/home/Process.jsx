import Container from "../common/Container.jsx"
import SectionHeading from "../common/SectionHeading.jsx"
import Reveal from "../common/Reveal.jsx"

const steps = [
  { no: "01", title: "Sourcing", text: "Identifying the right materials and manufacturers." },
  { no: "02", title: "Product Development", text: "Refining specifications, fit, and samples." },
  { no: "03", title: "Quality Inspection", text: "Checking standards before bulk production." },
  { no: "04", title: "Production", text: "Managing capacity, timelines, and consistency." },
  { no: "05", title: "Packaging", text: "Preparing export-ready packing and labelling." },
  { no: "06", title: "Global Shipping", text: "Coordinating logistics to destination markets." },
]

export default function Process() {
  return (
    <section className="bg-ivory py-24 md:py-32">
      <Container>
        <SectionHeading
          eyebrow="How We Work"
          title="Our Export Process"
          subtitle="A structured, transparent workflow that carries every order from concept to global delivery."
        />

        <div className="mt-14 grid grid-cols-1 border-t border-charcoal/15 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, i) => (
            <Reveal key={step.no} delay={(i % 3) * 0.06}>
              <div className="group flex h-full flex-col border-b border-charcoal/15 px-1 py-8 transition-colors sm:px-6">
                <span className="font-serif text-3xl text-bronze">{step.no}</span>
                <h3 className="mt-5 font-serif text-2xl font-medium text-charcoal">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-500">{step.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
