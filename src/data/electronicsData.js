// ─────────────────────────────────────────────────────────────────────────────
// Electronics & Appliances Subcategory Data
// Subcategory: Home Appliances
// ─────────────────────────────────────────────────────────────────────────────

export const electronicsSubcategories = [
  {
    slug: "home-appliances",
    label: "Home Appliances",
    shortLabel: "Home Appliances",
    description:
      "Export-grade home appliances engineered for global retail and wholesale programs — durable, certified, and built to international standards.",
    image: "https://picsum.photos/seed/home-appliances-hero/800/1000",
  },
]

export const electronicsProducts = {
  "home-appliances": [
    {
      id: "HA-001",
      name: "Automatic Washing Machine",
      category: "Electronics & Appliances",
      subcategory: "home-appliances",
      productType: "Washing Machine",
      description:
        "7 kg fully automatic front-load washing machine with multiple wash programs and energy-saving motor, developed for global residential and hospitality markets.",
      fabric: "Steel Drum, ABS Body",
      colors: ["White", "Silver"],
      sizes: ["7 kg", "8 kg", "10 kg"],
      moq: "50 Units",
      export: "Worldwide",
      image: "https://picsum.photos/seed/auto-washing-machine/800/1000",
    },
    {
      id: "HA-002",
      name: "Split Air Conditioner",
      category: "Electronics & Appliances",
      subcategory: "home-appliances",
      productType: "Air Conditioner",
      description:
        "Inverter split AC with 5-star energy rating, auto-clean filter and smart cooling technology — suitable for residential and commercial export programs.",
      fabric: "High-Density Polymer Body, Copper Coil",
      colors: ["White"],
      sizes: ["1 Ton", "1.5 Ton", "2 Ton"],
      moq: "30 Units",
      export: "Worldwide",
      image: "https://picsum.photos/seed/split-air-conditioner/800/1000",
    },
    {
      id: "HA-003",
      name: "No-Frost Refrigerator",
      category: "Electronics & Appliances",
      subcategory: "home-appliances",
      productType: "Refrigerator",
      description:
        "350 L double-door no-frost refrigerator with a digital display and multi-airflow cooling — engineered for international home appliance retail programs.",
      fabric: "Steel Interior, ABS Exterior",
      colors: ["Silver", "Graphite", "White"],
      sizes: ["250 L", "350 L", "450 L"],
      moq: "20 Units",
      export: "Worldwide",
      image: "https://picsum.photos/seed/nofrost-refrigerator/800/1000",
    },
    {
      id: "HA-004",
      name: "Microwave Oven",
      category: "Electronics & Appliances",
      subcategory: "home-appliances",
      productType: "Microwave Oven",
      description:
        "30 L solo and grill microwave oven with 10 power levels and pre-set cooking programs — a high-volume item for consumer electronics wholesale programs.",
      fabric: "ABS Body, Stainless Steel Interior",
      colors: ["Black", "Silver", "White"],
      sizes: ["20 L", "25 L", "30 L"],
      moq: "100 Units",
      export: "Worldwide",
      image: "https://picsum.photos/seed/microwave-oven-ha/800/1000",
    },
    {
      id: "HA-005",
      name: "Electric Water Heater",
      category: "Electronics & Appliances",
      subcategory: "home-appliances",
      productType: "Water Heater",
      description:
        "25 L storage water heater with multi-function safety valve and enamel-coated inner tank, developed for residential and hospitality export programs.",
      fabric: "Enamel Coated Steel Tank, ABS Outer Shell",
      colors: ["White", "Ivory"],
      sizes: ["15 L", "25 L", "35 L", "50 L"],
      moq: "80 Units",
      export: "Worldwide",
      image: "https://picsum.photos/seed/electric-water-heater/800/1000",
    },
    {
      id: "HA-006",
      name: "Tower Air Purifier",
      category: "Electronics & Appliances",
      subcategory: "home-appliances",
      productType: "Air Purifier",
      description:
        "HEPA + activated carbon 3-stage tower air purifier covering 50 m², with real-time air quality display — suited for health-conscious consumer markets worldwide.",
      fabric: "ABS Body, HEPA Filter",
      colors: ["White", "Black"],
      sizes: ["Up to 30 m²", "Up to 50 m²"],
      moq: "60 Units",
      export: "Worldwide",
      image: "https://picsum.photos/seed/tower-air-purifier/800/1000",
    },
  ],
}

export function getElectronicsSubcategory(slug) {
  return electronicsSubcategories.find((s) => s.slug === slug) || null
}

export function getElectronicsProducts(slug) {
  return electronicsProducts[slug] || []
}

export function getElectronicsProductById(id) {
  for (const key of Object.keys(electronicsProducts)) {
    const found = electronicsProducts[key].find((p) => p.id === id)
    if (found) return found
  }
  return null
}
