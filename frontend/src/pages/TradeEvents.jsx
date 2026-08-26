import PageHero from "../components/common/PageHero.jsx"
import Container from "../components/common/Container.jsx"
import SectionHeading from "../components/common/SectionHeading.jsx"

export default function TradeEvents() {
  return (
    <>
      <PageHero
        title="Trade Events"
        subtitle="Connect with us at leading international textile and garment trade fairs around the world."
        image="/images/hero-services.png"
      />
      <section className="py-20 md:py-28">
        <Container>
          <SectionHeading
            eyebrow="Events"
            title="Where You Can Find Us"
            subtitle="We participate in major trade exhibitions across Asia, Europe, and North America. Visit our booth to discuss your sourcing needs directly with our team."
          />
          <div className="mt-16 flex items-center justify-center rounded-lg border border-charcoal/10 py-24 text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-charcoal/40">
              Upcoming events coming soon
            </p>
          </div>
        </Container>
      </section>
    </>
  )
}
