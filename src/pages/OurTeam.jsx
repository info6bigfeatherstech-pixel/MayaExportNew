import PageHero from "../components/common/PageHero.jsx"
import Container from "../components/common/Container.jsx"
import SectionHeading from "../components/common/SectionHeading.jsx"

export default function OurTeam() {
  return (
    <>
      <PageHero
        title="Our Team"
        subtitle="Meet the people behind Global Threads — experienced professionals passionate about quality garments and global trade."
        image="/images/hero-about.png"
      />
      <section className="py-20 md:py-28">
        <Container>
          <SectionHeading
            eyebrow="Our People"
            title="The Experts Driving Our Success"
            subtitle="From sourcing specialists to quality controllers, our team brings decades of combined expertise to every order we fulfill."
          />
          <div className="mt-16 flex items-center justify-center rounded-lg border border-charcoal/10 py-24 text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-charcoal/40">
              Team profiles coming soon
            </p>
          </div>
        </Container>
      </section>
    </>
  )
}
