// ─────────────────────────────────────────────────────────────────────────────
// Footwear Hierarchy Data
// Structure: genders → subcategories → products
// Product shape mirrors src/data/products.js and src/data/garments.js for full compatibility.
// ─────────────────────────────────────────────────────────────────────────────

// ─── GENDER INDEX ────────────────────────────────────────────────────────────
export const footwearGenders = [
  {
    slug: "men",
    label: "Men",
    title: "Men's Footwear Collection",
    tagline: "Precision-engineered footwear built for durability, comfort, and international wholesale markets.",
    intro:
      "From high-performance sports and casual shoes to handcrafted office formals and comfortable lounge sandals, our men's footwear range combines ergonomic design with global export standards.",
    heroImage: "/images/shoes2.jpg",
    accentColor: "#A08145",
  },
  {
    slug: "women",
    label: "Women",
    title: "Women's Footwear Collection",
    tagline: "Contemporary, elegant, and versatile footwear designed for global retail and fashion programs.",
    intro:
      "Combining trend-conscious silhouettes with all-day comfort — our women's footwear collection covers sneakers, sandals, stylish flats & heels, and seasonal boots tailored for international buyers.",
    heroImage: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=1600&q=80&fit=crop",
    accentColor: "#A08145",
  },
  {
    slug: "children",
    label: "Children",
    title: "Children's Footwear Collection",
    tagline: "Safe, supportive, and durable footwear engineered for growing feet.",
    intro:
      "Engineered with flexible non-slip soles, non-toxic materials, and playful designs that comply with rigorous international child safety standards for global wholesale programs.",
    heroImage: "https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=1600&q=80&fit=crop",
    accentColor: "#A08145",
  },
  {
    slug: "kids",
    label: "Kids",
    title: "Kids' Footwear Collection",
    tagline: "Vibrant, flexible, and robust kids' footwear for international retail.",
    intro:
      "Bold colors, cushioned footbeds, and easy-wear closures — designed for retail buyers seeking high-appeal, premium quality footwear for juniors and teens.",
    heroImage: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=1600&q=80&fit=crop",
    accentColor: "#A08145",
  },
]

// ─── MEN SUBCATEGORIES ────────────────────────────────────────────────────────
export const menFootwearSubcategories = [
  {
    slug: "sports-casual-shoes",
    label: "Sports & Casual Shoes",
    shortLabel: "Sports & Casual Shoes",
    description: "Breathable knit sneakers, lightweight trainers, and casual lace-up shoes engineered for lifestyle markets.",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80&fit=crop",
  },
  {
    slug: "slippers-sandals",
    label: "Slippers & Sandals",
    shortLabel: "Slippers & Sandals",
    description: "Ergonomic leather slides, memory foam slippers, and outdoor strap sandals built for durability.",
    image: "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=800&q=80&fit=crop",
  },
  {
    slug: "office-shoes",
    label: "Office Shoes",
    shortLabel: "Office Shoes",
    description: "Hand-finished Oxford, Derby, and Brogue formal leather shoes for corporate and dress programs.",
    image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=800&q=80&fit=crop",
  },
]

// ─── WOMEN SUBCATEGORIES ─────────────────────────────────────────────────────
export const womenFootwearSubcategories = [
  {
    slug: "sports-casual-shoes",
    label: "Sports & Casual Shoes",
    shortLabel: "Sports & Casual Shoes",
    description: "Lightweight lifestyle sneakers, running shoes, and chic slip-on trainers for modern womenswear.",
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80&fit=crop",
  },
  {
    slug: "slippers-sandals",
    label: "Slippers & Sandals",
    shortLabel: "Slippers & Sandals",
    description: "Comfortable leather slides, strappy summer sandals, and plush indoor slippers.",
    image: "https://images.unsplash.com/photo-1562273138-f46be4ebdf33?w=800&q=80&fit=crop",
  },
  {
    slug: "flats-heels",
    label: "Flats & Heels",
    shortLabel: "Flats & Heels",
    description: "Pointed-toe ballerinas, block heel pumps, and elegant stilettos for smart-casual and eveningwear.",
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&q=80&fit=crop",
  },
  {
    slug: "boots",
    label: "Boots",
    shortLabel: "Boots",
    description: "Ankle Chelsea boots, knee-high riding boots, and lug-sole winter boots with weather-resistant finishes.",
    image: "https://images.unsplash.com/photo-1544441893-675973e31985?w=800&q=80&fit=crop",
  },
]

// ─── CHILDREN SUBCATEGORIES ───────────────────────────────────────────────────
export const childrenFootwearSubcategories = [
  {
    slug: "sports-casual-shoes",
    label: "Sports & Casual Shoes",
    shortLabel: "Sports & Casual Shoes",
    description: "Lightweight, flexible sneakers with hook-and-loop straps designed for active children.",
    image: "https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=800&q=80&fit=crop",
  },
  {
    slug: "slippers-sandals",
    label: "Slippers & Sandals",
    shortLabel: "Slippers & Sandals",
    description: "Water-friendly sandals and soft-soled slippers crafted with child-safe non-toxic materials.",
    image: "https://images.unsplash.com/photo-1503449377594-32dd9ac4467c?w=800&q=80&fit=crop",
  },
  {
    slug: "flats-heels",
    label: "Flats & Heels",
    shortLabel: "Flats & Heels",
    description: "Classic Mary Jane dress shoes and party flats with cushioned arches for young girls.",
    image: "https://images.unsplash.com/photo-1519415943484-9fa1873496d4?w=800&q=80&fit=crop",
  },
  {
    slug: "boots",
    label: "Boots",
    shortLabel: "Boots",
    description: "Warm fleece-lined winter booties and rain-ready puddle boots with high-traction soles.",
    image: "https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?w=800&q=80&fit=crop",
  },
]

// ─── KIDS SUBCATEGORIES ───────────────────────────────────────────────────────
export const kidsFootwearSubcategories = [
  {
    slug: "sports-casual-shoes",
    label: "Sports & Casual Shoes",
    shortLabel: "Sports & Casual Shoes",
    description: "High-top canvas trainers, cushioned runners, and durable court shoes for school and sports.",
    image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&q=80&fit=crop",
  },
  {
    slug: "slippers-sandals",
    label: "Slippers & Sandals",
    shortLabel: "Slippers & Sandals",
    description: "Sporty slide sandals and molded footbed slippers with adjustable closures for juniors.",
    image: "https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=800&q=80&fit=crop",
  },
  {
    slug: "flats-heels",
    label: "Flats & Heels",
    shortLabel: "Flats & Heels",
    description: "Smart formal loafers and low-heel dress shoes for formal and school wear programs.",
    image: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=800&q=80&fit=crop",
  },
  {
    slug: "boots",
    label: "Boots",
    shortLabel: "Boots",
    description: "Sturdy leather combat boots and weather-proof hiking boots built for active young explorers.",
    image: "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=800&q=80&fit=crop",
  },
]

// ─── SUBCATEGORY MAP ──────────────────────────────────────────────────────────
export const footwearSubcategoriesByGender = {
  men: menFootwearSubcategories,
  women: womenFootwearSubcategories,
  children: childrenFootwearSubcategories,
  kids: kidsFootwearSubcategories,
}

// ─── FOOTWEAR PRODUCTS ────────────────────────────────────────────────────────
export const footwearProducts = {
  // ── MEN — SPORTS & CASUAL SHOES ───────────────────────────────────────────
  "men--sports-casual-shoes": [
    {
      id: "FW-MSC-001",
      name: "Aeroknit Running Sneaker",
      category: "Footwear",
      subcategory: "sports-casual-shoes",
      gender: "men",
      productType: "Running Shoes",
      description: "Ultra-lightweight breathable flyknit upper with responsive EVA midsole cushioning and high-traction rubber outsole.",
      fabric: "Engineered Flyknit Upper, Phylon & Rubber Sole",
      colors: ["Triple Black", "White / Grey", "Navy / Orange"],
      sizes: ["EU 40", "EU 41", "EU 42", "EU 43", "EU 44", "EU 45"],
      moq: "500 Pairs",
      export: "Worldwide",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80&fit=crop",
    },
    {
      id: "FW-MSC-002",
      name: "Classic Low-Top Leather Sneaker",
      category: "Footwear",
      subcategory: "sports-casual-shoes",
      gender: "men",
      productType: "Casual Sneaker",
      description: "Minimalist full-grain leather cupsole sneaker with waxed laces and padded collar for everyday casual lifestyle collections.",
      fabric: "Full-Grain Cow Leather, Vulcanized Rubber Outsole",
      colors: ["White", "Off-White / Gum", "All Black"],
      sizes: ["EU 40", "EU 41", "EU 42", "EU 43", "EU 44"],
      moq: "400 Pairs",
      export: "Worldwide",
      image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&q=80&fit=crop",
    },
    {
      id: "FW-MSC-003",
      name: "Pro-Trail Training Shoe",
      category: "Footwear",
      subcategory: "sports-casual-shoes",
      gender: "men",
      productType: "Training Shoes",
      description: "Reinforced ripstop mesh outdoor training shoe with toe guard protection and deep-lug traction outsole.",
      fabric: "Water-Repellent Mesh & TPU, Vibram Grip Outsole",
      colors: ["Olive Green", "Charcoal / Volt", "Sandstone"],
      sizes: ["EU 41", "EU 42", "EU 43", "EU 44", "EU 45"],
      moq: "500 Pairs",
      export: "Worldwide",
      image: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=800&q=80&fit=crop",
    },
    {
      id: "FW-MSC-004",
      name: "Retro Court Canvas Sneaker",
      category: "Footwear",
      subcategory: "sports-casual-shoes",
      gender: "men",
      productType: "Canvas Shoes",
      description: "Vintage 12oz heavy cotton canvas court sneaker with vulcanized toe cap and cushioned ortholite insole.",
      fabric: "100% Cotton Canvas, Eco Rubber Sole",
      colors: ["Navy Blue", "Natural Ecru", "Washed Black"],
      sizes: ["EU 39", "EU 40", "EU 41", "EU 42", "EU 43", "EU 44"],
      moq: "600 Pairs",
      export: "Worldwide",
      image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&q=80&fit=crop",
    },
  ],

  // ── MEN — SLIPPERS & SANDALS ──────────────────────────────────────────────
  "men--slippers-sandals": [
    {
      id: "FW-MSS-001",
      name: "Genuine Leather Double-Strap Slide",
      category: "Footwear",
      subcategory: "slippers-sandals",
      gender: "men",
      productType: "Sandals",
      description: "Oiled nubuck leather double-strap sandal with adjustable buckle closures and contoured cork-latex footbed.",
      fabric: "Oiled Nubuck Leather, Natural Cork & EVA Sole",
      colors: ["Mocha Brown", "Black", "Tan"],
      sizes: ["EU 40", "EU 41", "EU 42", "EU 43", "EU 44"],
      moq: "400 Pairs",
      export: "Worldwide",
      image: "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=800&q=80&fit=crop",
    },
    {
      id: "FW-MSS-002",
      name: "Ergonomic Memory Foam House Slipper",
      category: "Footwear",
      subcategory: "slippers-sandals",
      gender: "men",
      productType: "Slippers",
      description: "Wool-blend felt closed-toe slide with high-density memory foam insole and anti-skid TPR indoor/outdoor sole.",
      fabric: "Wool Felt Upper, Memory Foam, Anti-Skid TPR",
      colors: ["Heather Grey", "Navy", "Charcoal"],
      sizes: ["EU 40-41", "EU 42-43", "EU 44-45"],
      moq: "600 Pairs",
      export: "Worldwide",
      image: "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?w=800&q=80&fit=crop",
    },
    {
      id: "FW-MSS-003",
      name: "Waterproof Sport Trekking Sandal",
      category: "Footwear",
      subcategory: "slippers-sandals",
      gender: "men",
      productType: "Sandals",
      description: "Quick-dry nylon webbing adventure sandal with neoprene lining, adjustable hook-loop straps, and rugged traction sole.",
      fabric: "Hydrophobic Webbing, Compression EVA Outsole",
      colors: ["Black", "Army Green", "Navy / Grey"],
      sizes: ["EU 40", "EU 41", "EU 42", "EU 43", "EU 44", "EU 45"],
      moq: "500 Pairs",
      export: "Worldwide",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80&fit=crop",
    },
  ],

  // ── MEN — OFFICE SHOES ────────────────────────────────────────────────────
  "men--office-shoes": [
    {
      id: "FW-MOS-001",
      name: "Hand-Burnished Oxford Brogue",
      category: "Footwear",
      subcategory: "office-shoes",
      gender: "men",
      productType: "Formal Shoes",
      description: "Goodyear-welted full-grain calfskin leather Oxford with intricate wingtip brogue perforations and stacked leather heel.",
      fabric: "Calfskin Leather, Leather Insole & Outsole",
      colors: ["Burnished Tan", "Classic Black", "Deep Mahogany"],
      sizes: ["EU 40", "EU 41", "EU 42", "EU 43", "EU 44", "EU 45"],
      moq: "300 Pairs",
      export: "Worldwide",
      image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=800&q=80&fit=crop",
    },
    {
      id: "FW-MOS-002",
      name: "Classic Cap-Toe Derby",
      category: "Footwear",
      subcategory: "office-shoes",
      gender: "men",
      productType: "Formal Shoes",
      description: "Timeless open-lacing Derby shoe crafted in supple smooth leather with cushioned latex footbed for 9-to-5 comfort.",
      fabric: "Top-Grain Cowhide, Rubber-Injected Leather Sole",
      colors: ["Pitch Black", "Dark Brown"],
      sizes: ["EU 40", "EU 41", "EU 42", "EU 43", "EU 44"],
      moq: "350 Pairs",
      export: "Worldwide",
      image: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=800&q=80&fit=crop",
    },
    {
      id: "FW-MOS-003",
      name: "Italian Leather Penny Loafer",
      category: "Footwear",
      subcategory: "office-shoes",
      gender: "men",
      productType: "Loafers",
      description: "Slip-on penny loafer with hand-stitched apron toe and breathable cowhide leather lining, ideal for executive wear.",
      fabric: "Polished Boxcalf Leather, Anti-Slip Heel",
      colors: ["Burgundy", "Black", "Cognac Brown"],
      sizes: ["EU 40", "EU 41", "EU 42", "EU 43", "EU 44"],
      moq: "300 Pairs",
      export: "Worldwide",
      image: "https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?w=800&q=80&fit=crop",
    },
  ],
}

// ─── STUB GENERATOR for other categories ──────────────────────────────────────
const footwearImagePool = {
  "sports-casual-shoes": [
    "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80&fit=crop",
    "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=800&q=80&fit=crop",
    "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&q=80&fit=crop",
    "https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=800&q=80&fit=crop",
  ],
  "slippers-sandals": [
    "https://images.unsplash.com/photo-1562273138-f46be4ebdf33?w=800&q=80&fit=crop",
    "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=800&q=80&fit=crop",
    "https://images.unsplash.com/photo-1503449377594-32dd9ac4467c?w=800&q=80&fit=crop",
    "https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=800&q=80&fit=crop",
  ],
  "flats-heels": [
    "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&q=80&fit=crop",
    "https://images.unsplash.com/photo-1519415943484-9fa1873496d4?w=800&q=80&fit=crop",
    "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=800&q=80&fit=crop",
    "https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?w=800&q=80&fit=crop",
  ],
  "boots": [
    "https://images.unsplash.com/photo-1544441893-675973e31985?w=800&q=80&fit=crop",
    "https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?w=800&q=80&fit=crop",
    "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=800&q=80&fit=crop",
    "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=800&q=80&fit=crop",
  ],
}

// Generate products for Women, Children, Kids
;[
  { gender: "women", subs: womenFootwearSubcategories },
  { gender: "children", subs: childrenFootwearSubcategories },
  { gender: "kids", subs: kidsFootwearSubcategories },
].forEach(({ gender, subs }) => {
  subs.forEach((sub) => {
    const key = `${gender}--${sub.slug}`
    if (!footwearProducts[key]) {
      const pool = footwearImagePool[sub.slug] || footwearImagePool["sports-casual-shoes"]
      footwearProducts[key] = Array.from({ length: 4 }, (_, i) => ({
        id: `FW-${gender.slice(0, 1).toUpperCase()}${sub.slug.slice(0, 2).toUpperCase()}-00${i + 1}`,
        name: `${gender.charAt(0).toUpperCase() + gender.slice(1)}'s ${sub.shortLabel} Style ${i + 1}`,
        category: "Footwear",
        subcategory: sub.slug,
        gender,
        productType: sub.shortLabel,
        description: `Export-grade ${sub.shortLabel.toLowerCase()} engineered with ergonomic fit, premium materials, and durable outsole for international markets.`,
        fabric: "Premium Leather / Engineered Mesh Upper, Ergonomic Outsole",
        colors: ["Black", "White", "Navy", "Tan"],
        sizes: gender === "women" ? ["EU 36", "EU 37", "EU 38", "EU 39", "EU 40", "EU 41"] : ["EU 28", "EU 30", "EU 32", "EU 34", "EU 36"],
        moq: "300 Pairs",
        export: "Worldwide",
        image: pool[i % pool.length],
      }))
    }
  })
})

// ─── LOOKUP HELPERS ───────────────────────────────────────────────────────────

export function getFootwearGender(slug) {
  return footwearGenders.find((g) => g.slug === slug) || null
}

export function getFootwearSubcategoriesByGender(genderSlug) {
  return footwearSubcategoriesByGender[genderSlug] || []
}

export function getFootwearSubcategory(genderSlug, subcatSlug) {
  const subs = getFootwearSubcategoriesByGender(genderSlug)
  return subs.find((s) => s.slug === subcatSlug) || null
}

export function getFootwearProducts(genderSlug, subcatSlug) {
  return footwearProducts[`${genderSlug}--${subcatSlug}`] || []
}

export function getFootwearProductById(id) {
  for (const key of Object.keys(footwearProducts)) {
    const found = footwearProducts[key].find((p) => p.id === id)
    if (found) return found
  }
  return null
}
