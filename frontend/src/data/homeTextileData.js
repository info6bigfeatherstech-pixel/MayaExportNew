// ─────────────────────────────────────────────────────────────────────────────
// Home Textile Subcategory Data
// Subcategory: Blankets
// ─────────────────────────────────────────────────────────────────────────────

export const homeTextileSubcategories = [
  {
    slug: "blankets",
    label: "Blankets",
    shortLabel: "Blankets",
    description:
      "Premium woven and knitted blankets crafted for global hospitality, retail and home-textile wholesale programs — from lightweight throws to heavy winter blankets.",
    image: "https://picsum.photos/seed/blankets-hero/800/1000",
  },
]

export const homeTextileProducts = {
  blankets: [
    {
      id: "BL-001",
      name: "Sherpa Fleece Blanket",
      category: "Home Textile",
      subcategory: "blankets",
      productType: "Blanket",
      description:
        "Ultra-soft double-sided sherpa fleece blanket with a plush pile and a smooth reverse — a bestseller for retail and hospitality programs.",
      fabric: "100% Polyester Sherpa Fleece, 400 GSM",
      colors: ["Ivory", "Grey", "Blush", "Navy"],
      sizes: ["Single (150×200 cm)", "Double (200×230 cm)", "King (230×260 cm)"],
      moq: "500 Pieces",
      export: "Worldwide",
      image: "https://picsum.photos/seed/sherpa-fleece-blanket/800/1000",
    },
    {
      id: "BL-002",
      name: "Merino Wool Throw",
      category: "Home Textile",
      subcategory: "blankets",
      productType: "Blanket",
      description:
        "Lightweight merino wool throw with a subtle herringbone weave — developed for luxury retail and premium gifting collections.",
      fabric: "100% Merino Wool, 280 GSM",
      colors: ["Camel", "Charcoal", "Natural", "Dusty Rose"],
      sizes: ["Throw (130×170 cm)", "Large Throw (150×200 cm)"],
      moq: "300 Pieces",
      export: "Worldwide",
      image: "https://picsum.photos/seed/merino-wool-throw/800/1000",
    },
    {
      id: "BL-003",
      name: "Waffle Knit Cotton Blanket",
      category: "Home Textile",
      subcategory: "blankets",
      productType: "Blanket",
      description:
        "Breathable waffle-textured cotton blanket ideal for layering — suited for hotel bedding and premium home-décor collections.",
      fabric: "100% Cotton Waffle Knit, 300 GSM",
      colors: ["White", "Stone", "Sage", "Slate Blue"],
      sizes: ["Single", "Double", "King"],
      moq: "400 Pieces",
      export: "Worldwide",
      image: "https://picsum.photos/seed/waffle-knit-blanket/800/1000",
    },
    {
      id: "BL-004",
      name: "Weighted Gravity Blanket",
      category: "Home Textile",
      subcategory: "blankets",
      productType: "Blanket",
      description:
        "Premium micro-glass bead weighted blanket with a breathable cotton shell, developed for wellness and sleep-therapy retail programs.",
      fabric: "Cotton Shell, Micro Glass Bead Fill",
      colors: ["Graphite", "Ivory", "Navy"],
      sizes: ["5 kg (120×180 cm)", "7 kg (150×200 cm)", "10 kg (200×220 cm)"],
      moq: "200 Pieces",
      export: "Worldwide",
      image: "https://picsum.photos/seed/weighted-gravity-blanket/800/1000",
    },
    {
      id: "BL-005",
      name: "Linen Summer Blanket",
      category: "Home Textile",
      subcategory: "blankets",
      productType: "Blanket",
      description:
        "Crisp washed-linen summer blanket — lightweight, breathable, and perfect for resort and warm-climate bedding collections.",
      fabric: "100% Washed Linen",
      colors: ["Natural", "White", "Sand", "Terracotta"],
      sizes: ["Single", "Double", "King"],
      moq: "300 Pieces",
      export: "Worldwide",
      image: "https://picsum.photos/seed/linen-summer-blanket/800/1000",
    },
    {
      id: "BL-006",
      name: "Mink Velvet Blanket",
      category: "Home Textile",
      subcategory: "blankets",
      productType: "Blanket",
      description:
        "Silky-soft mink velvet blanket with a fine printed pattern — a high-volume item for value retail and gifting programs worldwide.",
      fabric: "100% Polyester Mink Velvet, 500 GSM",
      colors: ["Emerald", "Burgundy", "Royal Blue", "Mocha"],
      sizes: ["Single (150×200 cm)", "Double (200×230 cm)"],
      moq: "600 Pieces",
      export: "Worldwide",
      image: "https://picsum.photos/seed/mink-velvet-blanket/800/1000",
    },
  ],
}

export function getHomeTextileSubcategory(slug) {
  return homeTextileSubcategories.find((s) => s.slug === slug) || null
}

export function getHomeTextileProducts(slug) {
  return homeTextileProducts[slug] || []
}

export function getHomeTextileProductById(id) {
  for (const key of Object.keys(homeTextileProducts)) {
    const found = homeTextileProducts[key].find((p) => p.id === id)
    if (found) return found
  }
  return null
}
