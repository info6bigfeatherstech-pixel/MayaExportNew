import Container from "../common/Container.jsx"
import Button from "../common/Button.jsx"
import Reveal from "../common/Reveal.jsx"

export default function CTASection() {
  return (
    <section className="relative flex min-h-[60vh] items-center overflow-hidden bg-stone-50 py-28 text-charcoal md:min-h-[82vh] md:py-40">
      {/* Fixed/Stationary Background Image Layer */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-fixed bg-cover opacity-65"
        style={{
          backgroundImage: "url('/images/partnershiphands2.png')",
          backgroundPosition: "center 25%",
        }}
      />
      
      {/* Existing Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-stone-50/90 via-stone-50/50 to-stone-50/10" />

      {/* Foreground Content (Scrolls normally) */}
      <Container className="relative z-10 w-full">
        <Reveal>
          <div className="max-w-2xl">
            <span className="eyebrow text-bronze">Let&apos;s Work Together</span>
            <h2 className="mt-4 font-serif text-4xl font-medium leading-[1.05] text-balance text-charcoal md:text-6xl">
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