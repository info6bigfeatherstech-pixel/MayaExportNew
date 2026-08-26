import Reveal from "./Reveal.jsx"

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  light = false,
  className = "",
}) {
  const alignment = align === "center" ? "items-center text-center" : "items-start text-left"
  return (
    <Reveal>
      <div className={`flex flex-col ${alignment} ${className}`}>
        {eyebrow && <span className="eyebrow mb-4">{eyebrow}</span>}
        <h2
          className={`max-w-2xl font-serif text-4xl font-medium leading-[1.05] text-balance md:text-5xl ${
            light ? "text-ivory" : "text-charcoal"
          }`}
        >
          {title}
        </h2>
        {subtitle && (
          <p
            className={`mt-4 max-w-xl text-pretty leading-relaxed ${
              light ? "text-ivory/70" : "text-stone-500"
            }`}
          >
            {subtitle}
          </p>
        )}
      </div>
    </Reveal>
  )
}
