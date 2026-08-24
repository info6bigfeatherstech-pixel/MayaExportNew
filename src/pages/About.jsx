import PageHero from "../components/common/PageHero.jsx"
import Container from "../components/common/Container.jsx"
import SectionHeading from "../components/common/SectionHeading.jsx"
import Reveal from "../components/common/Reveal.jsx"
import Button from "../components/common/Button.jsx"

const values = [
  { title: "Quality", text: "Uncompromising standards from fabric to finished garment." },
  { title: "Integrity", text: "Transparent, honest dealing in every transaction." },
  { title: "Reliability", text: "Consistent delivery buyers can plan their business around." },
  { title: "Innovation", text: "Continuous improvement in products and processes." },
  { title: "Partnership", text: "Relationships built to last, not single transactions." },
]

const stats = [
  { value: "50+", label: "Countries Served" },
  { value: "50+", label: "Global Buyers" },
  { value: "100K+", label: "Units Exported" },
  { value: "25+", label: "Years Experience" },
]

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="Our Company"
        title="About Our Company"
        subtitle="Connecting skilled garment manufacturers with international buyers through reliable, quality-driven export solutions."
        image="/images/manufacturinggar.avif"
      />

      {/* Story */}
      <section className="bg-ivory py-24 md:py-32">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <div className="aspect-[4/5] overflow-hidden bg-stone-100">
                <img
                  src="/images/about-story.png"
                  alt="Team reviewing garment production quality on the factory floor"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            </Reveal>
            <div>
              <SectionHeading eyebrow="Company Story" title="A Bridge Between Makers and Markets" />
              <div className="mt-6 space-y-4 leading-relaxed text-stone-500">
                <p>
                  Maya Exports Ltd. was built on a simple vision: to deliver quality products and reliable global trade solutions that businesses can trust. With over 25 years of experience, we have grown into an established manufacturing and export company serving customers across 50+ countries.
                </p>
                <p>
                  From product manufacturing and sourcing to quality control, compliance, and global logistics, we manage every stage with precision and professionalism. Our focus is on delivering consistent quality, building strong business relationships, and creating long-term value for our customers worldwide.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Mission & Vision */}
      <section className="bg-stone-50 py-24 md:py-28">
        <Container>
          <div className="grid gap-px overflow-hidden border border-charcoal/10 bg-charcoal/10 md:grid-cols-2">
            <Reveal>
              <div className="h-full bg-ivory p-10 md:p-14">
                <span className="eyebrow">Our Mission</span>
                <p className="mt-5 font-serif text-2xl font-medium leading-snug text-charcoal md:text-3xl">
                  To provide reliable, high-quality garment sourcing and export solutions
                  that help fashion businesses grow with confidence.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="h-full bg-ivory p-10 md:p-14">
                <span className="eyebrow">Our Vision</span>
                <p className="mt-5 font-serif text-2xl font-medium leading-snug text-charcoal md:text-3xl">
                  To become a trusted global partner in the international fashion supply
                  chain, known for quality and integrity.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="bg-ivory py-24 md:py-32">
        <Container>
          <SectionHeading eyebrow="What Guides Us" title="Our Values" align="center" className="mx-auto" />
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {values.map((value, i) => (
              <Reveal key={value.title} delay={(i % 5) * 0.06}>
                <div className="border-t-2 border-bronze pt-6">
                  <h3 className="font-serif text-xl font-medium text-charcoal">{value.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-stone-500">{value.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Stats */}
      <section className="bg-ink py-20 text-ivory md:py-24">
        <Container>
          <div className="grid grid-cols-2 gap-y-12 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <Reveal key={stat.label} delay={(i % 4) * 0.08}>
                <div className="text-center">
                  <div className="font-serif text-5xl font-medium text-bronze-light md:text-6xl">
                    {stat.value}
                  </div>
                  <div className="mt-3 text-xs font-medium uppercase tracking-widest text-ivory/60">
                    {stat.label}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-16 flex justify-center">
            <Button to="/contact" variant="light" arrow>
              Partner With Us
            </Button>
          </div>
        </Container>
      </section>
    </>
  )
}
