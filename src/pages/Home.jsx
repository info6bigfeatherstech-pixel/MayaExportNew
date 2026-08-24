import Hero from "../components/home/Hero.jsx"
import AboutPreview from "../components/home/AboutPreview.jsx"
import FeaturedProducts from "../components/home/FeaturedProducts.jsx"
import Categories from "../components/home/Categories.jsx"
import WhyChooseUs from "../components/home/WhyChooseUs.jsx"
import GlobalReach from "../components/home/GlobalReach.jsx"
import Process from "../components/home/Process.jsx"
import CTASection from "../components/home/CTASection.jsx"

export default function Home() {
  return (
    <>
      <Hero />
      <AboutPreview />
      {/* <FeaturedProducts /> */}
      <Categories />
      <WhyChooseUs />
      <Process />
      <GlobalReach />
      <CTASection />
    </>
  )
}
