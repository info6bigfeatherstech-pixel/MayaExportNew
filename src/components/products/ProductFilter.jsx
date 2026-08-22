export default function ProductFilter({ categories, active, onChange }) {
  return (
    <div className="no-scrollbar -mx-6 flex gap-2 overflow-x-auto px-6 md:mx-0 md:flex-wrap md:px-0">
      {categories.map((category) => {
        const isActive = category === active
        return (
          <button
            key={category}
            type="button"
            onClick={() => onChange(category)}
            className={`shrink-0 border px-5 py-2.5 text-xs font-medium uppercase tracking-widest transition-colors duration-300 ${
              isActive
                ? "border-charcoal bg-charcoal text-ivory"
                : "border-charcoal/20 text-charcoal/70 hover:border-charcoal hover:text-charcoal"
            }`}
          >
            {category}
          </button>
        )
      })}
    </div>
  )
}
