import PageHero from "../components/common/PageHero.jsx"
import Container from "../components/common/Container.jsx"
import SectionHeading from "../components/common/SectionHeading.jsx"

export default function Career() {
  return (
    <>
      <PageHero
        title="Career"
        subtitle="Join a growing team that is shaping the future of garment exports. We are always looking for talented individuals."
        image="/images/hero-contact.png"
      />
      <section className="py-20 md:py-28">
        <Container>
          <SectionHeading
            eyebrow="Opportunities"
            title="Build Your Career With Us"
            subtitle="At Global Threads, we believe our people are our greatest asset. Explore open positions and become part of a team driven by quality, integrity, and global ambition."
          />
          <div className="mt-16 flex items-center justify-center rounded-lg border border-charcoal/10 py-24 text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-charcoal/40">
              Open positions coming soon
            </p>
          </div>
        </Container>
      </section>
    </>
  )
}
