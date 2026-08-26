import React, { useState } from "react"
import { Compass, Lightbulb, ShieldCheck, Settings, Package, Ship, ChevronLeft, ChevronRight } from 'lucide-react'
import Container from "../common/Container.jsx"
import Reveal from "../common/Reveal.jsx"

// EXACT CONTENT - DO NOT MODIFY
const steps = [
  { no: "01", title: "Sourcing", text: "Identifying the right materials and manufacturers." },
  { no: "02", title: "Product Development", text: "Refining specifications, fit, and samples." },
  { no: "03", title: "Quality Inspection", text: "Checking standards before bulk production." },
  { no: "04", title: "Production", text: "Managing capacity, timelines, and consistency." },
  { no: "05", title: "Packaging", text: "Preparing export-ready packing and labelling." },
  { no: "06", title: "Global Shipping", text: "Coordinating logistics to destination markets." },
]

const icons = [Compass, Lightbulb, ShieldCheck, Settings, Package, Ship]

export default function Process() {
  const [currentPage, setCurrentPage] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(true)
  const [isAnimating, setIsAnimating] = useState(false)

  // Cloning first 3 steps for infinite forward sliding
  const extendedSteps = [...steps, ...steps.slice(0, 3)]
  const extendedIcons = [...icons, ...icons.slice(0, 3)]

  const nextSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)

    if (currentPage === 1) {
      // Slide forward to the cloned first page
      setCurrentPage(2)
      
      // Wait for slide animation to complete (1000ms)
      setTimeout(() => {
        // Instantly snap back to the real first page without transition
        setIsTransitioning(false)
        setCurrentPage(0)
        
        // Re-enable transitions after a tiny DOM delay
        setTimeout(() => {
          setIsTransitioning(true)
          setIsAnimating(false)
        }, 50)
      }, 1000)
    } else {
      setCurrentPage(1)
      setTimeout(() => setIsAnimating(false), 1000)
    }
  }

  const prevSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)

    if (currentPage === 0) {
      // Instantly snap to the clone at the end without transition
      setIsTransitioning(false)
      setCurrentPage(2)
      
      // Then smoothly slide backwards to page 1
      setTimeout(() => {
        setIsTransitioning(true)
        setCurrentPage(1)
        setTimeout(() => setIsAnimating(false), 1000)
      }, 50)
    } else {
      setCurrentPage(0)
      setTimeout(() => setIsAnimating(false), 1000)
    }
  }

  const goToPage = (index) => {
    if (isAnimating || currentPage === index) return
    setIsAnimating(true)
    setCurrentPage(index)
    setTimeout(() => setIsAnimating(false), 1000)
  }

  // Active dot logic (If on clone page '2', show dot '0' as active)
  const activeDot = currentPage === 2 ? 0 : currentPage

  return (
    <section className="overflow-hidden bg-ivory py-24 md:py-32">
      <Container>
        <Reveal>
          <div className="flex flex-col items-start text-left">
            <span className="eyebrow mb-4 text-xs tracking-[0.25em] sm:text-sm">
              How We Work
            </span>
            <h2 className="max-w-2xl font-serif text-4xl font-medium leading-[1.05] text-balance text-charcoal sm:text-5xl lg:text-6xl">
              Our Export Process
            </h2>
            <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-stone-500 md:text-lg">
              A structured, transparent workflow that carries every order from concept to global delivery.
            </p>
          </div>
        </Reveal>

        {/* --- DESKTOP VIEW (Infinite Forward Slider) --- */}
        <div className="hidden md:block relative w-full max-w-6xl mx-auto mt-24">
          
          <div className="w-full overflow-hidden">
            {/* 300% width container because we have 3 "pages" (Original 2 + 1 Clone) */}
            <div 
              className={`flex w-[300%] ${isTransitioning ? 'transition-transform duration-1000 ease-[cubic-bezier(0.65,0,0.35,1)]' : ''}`}
              style={{ transform: `translateX(-${currentPage * (100 / 3)}%)` }}
            >
              
              {/* Extended Wavy SVG Line (Spans across all 9 steps perfectly) */}
              <div className="absolute inset-0 w-full pointer-events-none z-0">
                <svg viewBox="0 0 3000 200" className="w-full h-full" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="lineFade" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0" />
                      <stop offset="2%" stopColor="#0ea5e9" stopOpacity="1" />
                      <stop offset="98%" stopColor="#0ea5e9" stopOpacity="1" />
                      <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  {/* 1. Base Static Line */}
                  <path 
                    d="M 0 100 
                       C 80 150, 120 150, 166.6 150 
                       C 250 150, 350 50, 500 50 
                       C 650 50, 750 150, 833.3 150 
                       C 950 150, 1050 50, 1166.6 50 
                       C 1283 50, 1383 150, 1500 150 
                       C 1616 150, 1716 50, 1833.3 50 
                       C 1950 50, 2050 150, 2166.6 150 
                       C 2283 150, 2383 50, 2500 50 
                       C 2616 50, 2716 150, 2833.3 150 
                       C 2916 150, 2960 100, 3000 100" 
                    stroke="url(#lineFade)" 
                    strokeWidth="3" 
                    strokeOpacity="0.2"
                    fill="none" 
                    vectorEffect="non-scaling-stroke" 
                  />

                  {/* 2. Forward Moving Animated Dashed Line */}
                  <path 
                    d="M 0 100 
                       C 80 150, 120 150, 166.6 150 
                       C 250 150, 350 50, 500 50 
                       C 650 50, 750 150, 833.3 150 
                       C 950 150, 1050 50, 1166.6 50 
                       C 1283 50, 1383 150, 1500 150 
                       C 1616 150, 1716 50, 1833.3 50 
                       C 1950 50, 2050 150, 2166.6 150 
                       C 2283 150, 2383 50, 2500 50 
                       C 2616 50, 2716 150, 2833.3 150 
                       C 2916 150, 2960 100, 3000 100" 
                    stroke="url(#lineFade)" 
                    strokeWidth="3" 
                    strokeDasharray="12 12"
                    fill="none" 
                    vectorEffect="non-scaling-stroke" 
                  >
                    <animate attributeName="stroke-dashoffset" from="24" to="0" dur="1s" repeatCount="indefinite" />
                  </path>
                </svg>
              </div>

              {/* Grid of 9 Items (Original 6 + 3 Clones) */}
              <div className="relative z-10 w-full h-[340px] grid grid-cols-9">
                {extendedSteps.map((step, idx) => {
                  const isTopNode = idx % 2 === 1 
                  const Icon = extendedIcons[idx]
                  // Map background number to correct digit (1-6)
                  const displayNumber = (idx % 6) + 1

                  return (
                    <div key={`${step.no}-${idx}`} className="relative w-full h-full group">
                      <div className={`w-full h-full flex flex-col relative ${isTopNode ? 'justify-end pb-8' : 'justify-start pt-8'}`}>
                        
                        {/* Hexagon Node */}
                        <div 
                          className="absolute left-1/2 -translate-x-1/2 z-20 drop-shadow-[0_12px_24px_rgba(14,165,233,0.3)] transition-transform duration-300 group-hover:-translate-y-1.5"
                          style={{ top: isTopNode ? '25%' : '75%', marginTop: '-32px' }}
                        >
                          <div 
                            className="w-16 h-16 bg-white flex items-center justify-center transition-colors"
                            style={{ clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' }}
                          >
                            <Icon className="w-[26px] h-[26px] text-sky-500" strokeWidth={2.5} />
                          </div>
                        </div>

                        {/* Text Block & Background Number */}
                        <div className="relative z-10 text-center px-4">
                          <span className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-[140px] font-bold text-slate-200/60 -z-10 leading-none select-none transition-transform duration-500 group-hover:scale-105">
                            {displayNumber}
                          </span>
                          
                          <h3 className="text-[1.35rem] font-bold text-slate-900 tracking-tight">
                            {step.title}
                          </h3>
                          
                          <p className="mt-3 text-sm text-slate-500 leading-relaxed max-w-[220px] mx-auto">
                            {step.text}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Slider Navigation Controls */}
          <div className="flex justify-center items-center gap-6 mt-16">
            <button 
              onClick={prevSlide}
              className={`w-12 h-12 rounded-full border border-sky-200 flex items-center justify-center text-sky-500 transition-all duration-300 hover:bg-sky-50 hover:shadow-lg hover:-translate-x-1 ${isAnimating ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isAnimating}
              aria-label="Previous Steps"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            {/* Dots Indicator */}
            <div className="flex gap-3">
              <button 
                onClick={() => goToPage(0)}
                disabled={isAnimating}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${activeDot === 0 ? 'bg-sky-500 scale-125' : 'bg-sky-200 hover:bg-sky-300'} ${isAnimating ? 'cursor-not-allowed' : ''}`} 
              />
              <button 
                onClick={() => goToPage(1)}
                disabled={isAnimating}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${activeDot === 1 ? 'bg-sky-500 scale-125' : 'bg-sky-200 hover:bg-sky-300'} ${isAnimating ? 'cursor-not-allowed' : ''}`} 
              />
            </div>

            <button 
              onClick={nextSlide}
              className={`w-12 h-12 rounded-full border border-sky-200 flex items-center justify-center text-sky-500 transition-all duration-300 hover:bg-sky-50 hover:shadow-lg hover:translate-x-1 ${isAnimating ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isAnimating}
              aria-label="Next Steps"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* --- MOBILE VIEW (Vertical Timeline) --- */}
        <div className="md:hidden relative mt-20 flex flex-col space-y-12 pb-4">
          <div className="absolute left-[39px] top-6 bottom-12 w-[3px] bg-sky-200/50 rounded-full" />
          
          {steps.map((step, i) => {
            const Icon = icons[i]
            return (
              <Reveal key={step.no} delay={i * 0.1}>
                <div className="relative pl-24 pr-4 group">
                  <div className="absolute left-2 top-0 z-20 drop-shadow-[0_8px_16px_rgba(14,165,233,0.3)]">
                    <div className="w-[64px] h-[64px] bg-white flex items-center justify-center" style={{ clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' }}>
                      <Icon className="w-6 h-6 text-sky-500" strokeWidth={2.5} />
                    </div>
                  </div>
                  <div className="relative pt-2">
                    <span className="absolute -top-6 left-0 text-7xl font-bold text-slate-200/60 -z-10 leading-none select-none">
                      {i + 1}
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 tracking-tight">{step.title}</h3>
                    <p className="mt-2 text-sm text-slate-500 leading-relaxed">{step.text}</p>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>

      </Container>
    </section>
  )
}