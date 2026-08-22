import Container from "../common/Container.jsx"
import Button from "../common/Button.jsx"
import Reveal from "../common/Reveal.jsx"

export default function CTASection() {
  return (
    <section className="relative overflow-hidden bg-stone-50 py-24 text-charcoal md:py-32">
      <img
        src="/images/cta.png"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover opacity-65"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-stone-50/90 via-stone-50/50 to-stone-50/10" />
      <Container className="relative z-10">
        <Reveal>
          <div className="max-w-2xl">
            <span className="eyebrow text-bronze">Let&apos;s Work Together</span>
            <h2 className="mt-4 font-serif text-4xl font-medium leading-[1.05] text-balance text-charcoal md:text-5xl">
              Looking for a Reliable Garment Export Partner?
            </h2>
            <p className="mt-5 max-w-xl leading-relaxed text-charcoal/60">
              Let&apos;s discuss your sourcing and export requirements. Our team will help
              you develop the right products for your market.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button
                to="/contact"
                variant="primary"
                arrow
              >
                Send Enquiry
              </Button>
              <Button to="/contact" variant="outline">
                Contact Us
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
