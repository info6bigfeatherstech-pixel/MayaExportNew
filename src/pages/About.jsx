import React, { useState, useEffect, useRef } from "react"
import PageHero from "../components/common/PageHero.jsx"
import Container from "../components/common/Container.jsx"
import SectionHeading from "../components/common/SectionHeading.jsx"
import Reveal from "../components/common/Reveal.jsx"
import Button from "../components/common/Button.jsx"

// Custom Component for Counting Animation on Scroll
const AnimatedStat = ({ value }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);

  // Extract number and suffix (e.g., "100K+" -> number: 100, suffix: "K+")
  const match = value.match(/(\d+)(.*)/);
  const targetNumber = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : "";

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let start = 0;
          const duration = 2000; // Animation duration in milliseconds (2 seconds)
          const frameDuration = 1000 / 60; // 60 FPS
          const totalFrames = Math.round(duration / frameDuration);
          const easeOutQuad = t => t * (2 - t); // Smooth easing effect

          let frame = 0;
          const counter = setInterval(() => {
            frame++;
            const progress = easeOutQuad(frame / totalFrames);
            const currentCount = Math.round(targetNumber * progress);

            if (frame === totalFrames) {
              setCount(targetNumber);
              clearInterval(counter);
            } else {
              setCount(currentCount);
            }
          }, frameDuration);

          // Disconnect observer after animation plays once
          observer.disconnect();
        }
      },
      { threshold: 0.5 } // Trigger when 50% of the element is visible
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, [targetNumber]);

  return <span ref={countRef}>{count}{suffix}</span>;
};

const values = [
  { title: "Quality", text: "We maintain uncompromising quality standards at every stage, from careful material selection and manufacturing to final inspection and delivery." },
  { title: "Integrity", text: "We believe lasting business relationships are built on honesty, transparency, and responsible practices in every interaction and transaction." },
  { title: "Reliability", text: "Our customers can depend on us for consistent product quality, timely delivery, clear communication, and dependable service across every order." },
  { title: "Innovation", text: "We continuously improve our products, manufacturing processes, and working methods to deliver smarter solutions and meet the evolving needs of global markets." },
  { title: "Partnership", text: "We build long-term relationships with customers and partners through trust, collaboration, mutual growth, and a commitment to creating value beyond individual transactions." },
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

      {/* 1. Story Section - Trio Apparels Style */}
      <section className="bg-ivory py-24 md:py-32">
        <Container>
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">

            <Reveal>
              <div className="relative mx-auto aspect-square w-full max-w-[340px] sm:max-w-[390px] lg:max-w-[440px]">
                <div className="absolute left-0 top-0 h-[70%] w-[68%] overflow-hidden rounded-[20px] bg-stone-200 shadow-sm">
                  <img
                    src="/images/workers.avif"
                    alt="Garment production floor"
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>

                <div className="absolute bottom-0 right-0 z-10 h-[70%] w-[68%] overflow-hidden rounded-[20px] border-[6px] border-ivory bg-stone-200 shadow-md">
                  <img
                    src="/images/about-story.png"
                    alt="Team reviewing garment quality"
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="flex flex-col justify-center">
                <h2 className="font-serif text-3xl font-medium leading-normal text-charcoal sm:text-4xl md:text-[44px] lg:text-[48px] xl:text-[52px]">
                  A Bridge Between Makers and Markets
                </h2>
                <div className="mt-8 space-y-6 text-[17px] leading-relaxed text-stone-600 md:text-lg">
                  <p>
                    Maya Exports Ltd. was built on a simple vision: to deliver quality products and reliable global trade solutions that businesses can trust. With over 25 years of experience, we have grown into an established manufacturing and export company serving customers across 50+ countries.
                  </p>
                  <p>
                    From product manufacturing and sourcing to quality control, compliance, and global logistics, we manage every stage with precision and professionalism. Our focus is on delivering consistent quality, building strong business relationships, and creating long-term value for our customers worldwide.
                  </p>
                </div>
                <div className="mt-10 h-[2px] w-full bg-bronze/40"></div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* 2. Founder's History Section */}
      <section className="bg-white py-20 md:py-28">
        <Container>
          <div className="flex flex-col items-center text-center">
            <Reveal>
              <h2 className="font-serif text-3xl font-medium text-charcoal md:text-[40px]">
                Founder's History
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-12 max-w-3xl">
                <div className="mx-auto mb-8 h-56 w-44 overflow-hidden rounded-[20px] bg-stone-200 shadow-sm md:h-72 md:w-56">
                  <img
                    src="/images/founder.jpg"
                    alt="Company Founder"
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                    loading="lazy"
                  />
                </div>

                <h3 className="font-serif text-2xl font-medium text-charcoal">Mr. ChimgMing Wing</h3>
                <p className="mt-2 text-xs font-medium uppercase tracking-widest text-bronze">Founder & Chairman</p>

                <div className="mt-8 space-y-4 text-[18px] leading-relaxed text-stone-600">
                  <p>
                    With a profound vision and relentless dedication, our founder established Maya Exports Ltd. over two decades ago. Starting with a small team and a big dream, his leadership has transformed the company into a globally recognized apparel export house.
                  </p>
                  <p>
                    His core philosophy of "Quality First, Integrity Always" continues to guide our operations every day, ensuring that every garment we export reflects our commitment to excellence and sustainable business practices.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* 3. Vision & Mission - Updated to match Reference UI */}
      <section className="relative overflow-hidden bg-[#002152] py-24 text-white md:py-28">
        <Container>
          <div className="mb-16 flex flex-col items-center text-center">
            <Reveal>
              <h2 className="font-serif text-3xl font-medium text-ivory md:text-[40px] lg:text-[44px]">
                Vision and Mission
              </h2>
            </Reveal>
          </div>

          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">

            {/* --- VISION CARD --- */}
            <Reveal>
              <div className="relative bg-white py-8 pl-14 pr-6 sm:py-10 sm:pl-20 sm:pr-10 shadow-sm transition-shadow hover:shadow-md">
                {/* Main Right-Side Border */}
                <div className="absolute inset-y-0 left-12 right-0 border-y-[2px] border-r-[2px] border-bronze sm:left-16"></div>

                {/* Custom Left Brackets for Cutout Effect */}
                <div className="absolute left-8 top-0 h-6 w-4 border-l-[2px] border-t-[2px] border-bronze sm:left-12 sm:h-8"></div>
                <div className="absolute left-4 top-6 h-[2px] w-4 bg-bronze sm:left-8 sm:top-8"></div>

                <div className="absolute bottom-0 left-8 h-6 w-4 border-b-[2px] border-l-[2px] border-bronze sm:left-12 sm:h-8"></div>
                <div className="absolute bottom-6 left-4 h-[2px] w-4 bg-bronze sm:bottom-8 sm:left-8"></div>

                {/* Burgundy Icon */}
                <div className="absolute left-0 top-1/2 flex h-16 w-16 -translate-y-1/2 items-center justify-center bg-white text-[#9b2a3d] sm:left-2 sm:h-20 sm:w-20">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 sm:h-12 sm:w-12">
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="12" r="6" />
                    <circle cx="12" cy="12" r="2" />
                    <path d="M12 2v2m10 8h-2M12 22v-2M2 12h2" />
                    <path d="m22 2-8.5 8.5" />
                    <path d="M16 2h6v6" />
                  </svg>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="uppercase font-serif text-2xl font-medium tracking-wide text-charcoal sm:text-3xl">Vision</h3>
                  <div className="my-3 h-[2px] w-full bg-bronze/40"></div>
                  <p className="text-[17px] leading-relaxed text-stone-600 sm:text-[18px] md:text-[19px]">
                    To be the trusted partner of choice, delivering excellence in men's, women's, and kids' fashion, with consistent quality and timely delivery to global and domestic brands.
                  </p>
                </div>
              </div>
            </Reveal>

            {/* --- MISSION CARD --- */}
            <Reveal delay={0.2}>
              <div className="relative bg-white py-8 pl-14 pr-6 sm:py-10 sm:pl-20 sm:pr-10 shadow-sm transition-shadow hover:shadow-md">
                {/* Main Right-Side Border */}
                <div className="absolute inset-y-0 left-12 right-0 border-y-[2px] border-r-[2px] border-bronze sm:left-16"></div>

                {/* Custom Left Brackets for Cutout Effect */}
                <div className="absolute left-8 top-0 h-6 w-4 border-l-[2px] border-t-[2px] border-bronze sm:left-12 sm:h-8"></div>
                <div className="absolute left-4 top-6 h-[2px] w-4 bg-bronze sm:left-8 sm:top-8"></div>

                <div className="absolute bottom-0 left-8 h-6 w-4 border-b-[2px] border-l-[2px] border-bronze sm:left-12 sm:h-8"></div>
                <div className="absolute bottom-6 left-4 h-[2px] w-4 bg-bronze sm:bottom-8 sm:left-8"></div>

                {/* Burgundy Icon */}
                <div className="absolute left-0 top-1/2 flex h-16 w-16 -translate-y-1/2 items-center justify-center bg-white text-[#9b2a3d] sm:left-2 sm:h-20 sm:w-20">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 sm:h-12 sm:w-12">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                    <path d="m14 10-6 6" />
                    <path d="M9 10h5v5" />
                  </svg>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="uppercase font-serif text-2xl font-medium tracking-wide text-charcoal sm:text-3xl">Mission</h3>
                  <div className="my-3 h-[2px] w-full bg-bronze/40"></div>
                  <p className="text-[17px] leading-relaxed text-stone-600 sm:text-[18px] md:text-[19px]">
                    To invest in the right talent, technology, and systems, delivering garments that exceed customer expectations through innovation and prompt delivery.
                  </p>
                </div>
              </div>
            </Reveal>

          </div>
        </Container>
      </section>

      {/* 4. Values - Updated Design */}
      <section className="bg-ivory py-24 md:py-32">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
            
            {/* Left Side: Image graphic */}
            <Reveal>
              <div className="relative h-full min-h-[400px] w-full overflow-hidden rounded-[20px] shadow-sm md:min-h-[500px]">
                {/* Temporary placeholder image - Replace src when ready */}
                <img
                  src="./images/partnership.png"
                  alt="Our core values in manufacturing"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  loading="lazy"
                />
              </div>
            </Reveal>

            {/* Right Side: Values List */}
            <div>
              <Reveal>
                <SectionHeading eyebrow="What Guides Us" title="Our Core Values" align="left" />
              </Reveal>
              
              <div className="mt-10 space-y-6 md:mt-14">
                {values.map((value, i) => (
                  <Reveal key={value.title} delay={i * 0.1}>
                    <div className="group flex items-start gap-5 sm:gap-6">
                      
                      {/* Number/Icon Indicator */}
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-bronze/10 text-bronze transition-colors duration-300 group-hover:bg-bronze group-hover:text-white sm:h-14 sm:w-14">
                        <span className="font-serif text-lg font-bold sm:text-xl">
                          0{i + 1}
                        </span>
                      </div>
                      
                      {/* Value Content */}
                      <div>
                        <h3 className="font-serif text-xl font-medium text-charcoal sm:text-2xl">
                          {value.title}
                        </h3>
                        <p className="mt-2 text-[15px] leading-relaxed text-stone-600 sm:text-base">
                          {value.text}
                        </p>
                      </div>
                      
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
            
          </div>
        </Container>
      </section>

      {/* 5. Stats - Now with CountUp Animation */}
      <section className="bg-ink py-20 text-ivory md:py-24">
        <Container>
          <div className="grid grid-cols-2 gap-y-12 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <Reveal key={stat.label} delay={(i % 4) * 0.08}>
                <div className="text-center">
                  <div className="font-serif text-5xl font-medium text-bronze-light md:text-6xl">
                    {/* AnimatedStat is replacing static text here */}
                    <AnimatedStat value={stat.value} />
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