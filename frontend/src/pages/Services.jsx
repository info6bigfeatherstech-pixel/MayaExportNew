import PageHero from "../components/common/PageHero.jsx"
import Container from "../components/common/Container.jsx"
import Reveal from "../components/common/Reveal.jsx"
import Button from "../components/common/Button.jsx"
import { services } from "../data/services.js"

export default function Services() {
  return (
    <>
      <PageHero
        eyebrow="What We Do"
        title="Our Services"
        subtitle="End-to-end garment export services — from first concept to final delivery in your market."
        image="/images/hero-services.png"
      />

      <section className="bg-ivory py-24 md:py-32">
        <Container>
          <div className="grid grid-cols-1 gap-px overflow-hidden border border-charcoal/10 bg-charcoal/10 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <Reveal key={service.title} delay={(i % 3) * 0.06}>
                <div className="group flex h-full flex-col bg-ivory p-8 transition-colors duration-300 hover:bg-white md:p-10">
                  <div className="flex h-14 w-14 items-center justify-center border border-charcoal/15 text-bronze transition-colors duration-300 group-hover:border-bronze group-hover:bg-bronze group-hover:text-ivory">
                    <service.icon className="h-6 w-6" strokeWidth={1.4} />
                  </div>
                  <h3 className="mt-7 font-serif text-2xl font-medium text-charcoal">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-stone-500">
                    {service.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-ink py-24 text-ivory md:py-28">
        <img
          src="/images/cta.png"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-20"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/50" />
        <Container className="relative z-10">
          <Reveal>
            <div className="max-w-2xl">
              <span className="eyebrow text-bronze-light">Ready to Start</span>
              <h2 className="mt-4 font-serif text-4xl font-medium leading-[1.05] text-balance md:text-5xl">
                Let&apos;s Develop Your Next Collection
              </h2>
              <p className="mt-5 max-w-xl leading-relaxed text-ivory/70">
                Tell us about your sourcing requirements and we&apos;ll build a tailored
                export plan around your products, timelines, and markets.
              </p>
              <div className="mt-10">
                <Button
                  to="/contact"
                  variant="light"
                  className="border-transparent bg-ivory text-charcoal hover:bg-bronze-light"
                  arrow
                >
                  Get in Touch
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  )
}
