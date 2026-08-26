// ─────────────────────────────────────────────────────────────────────────────
// Fabrics Subcategory Data
// Two subcategories: Garments Fabrics & Home Textile Fabrics
// Product shape mirrors src/data/products.js for full compatibility.
// ─────────────────────────────────────────────────────────────────────────────

// ─── FABRIC SUBCATEGORIES ────────────────────────────────────────────────────
export const fabricSubcategories = [
  {
    slug: "garments-fabrics",
    label: "Garments Fabrics",
    shortLabel: "Garments Fabrics",
    description:
      "Premium woven and knit fabrics developed specifically for international garment manufacturing programs — cotton, linen, denim and performance blends.",
    image: "https://picsum.photos/seed/garments-fabrics-hero/800/1000",
  },
  {
    slug: "home-textile-fabrics",
    label: "Home Textile Fabrics",
    shortLabel: "Home Textile Fabrics",
    description:
      "Soft-touch and high-durability fabrics engineered for bedding, towelling, upholstery and furnishing applications across global home-textile markets.",
    image: "https://picsum.photos/seed/home-textile-fabrics-hero/800/1000",
  },
]

// ─── FABRIC PRODUCTS ─────────────────────────────────────────────────────────
export const fabricProducts = {
  // ── GARMENTS FABRICS ──────────────────────────────────────────────────────
  "garments-fabrics": [
    {
      id: "GF-001",
      name: "Premium Cotton Fabric",
      category: "Fabrics",
      subcategory: "garments-fabrics",
      productType: "Cotton Fabric",
      description:
        "High-quality woven cotton fabric developed for international apparel and home textile manufacturing.",
      fabric: "100% Combed Cotton, 120–180 GSM",
      colors: ["Natural White", "Ecru", "Custom Dyeing Available"],
      sizes: ["Width: 58-60 inches"],
      moq: "1000 Metres",
      export: "Worldwide",
      image: "https://picsum.photos/seed/cotton-fabric-gf/800/1000",
    },
    {
      id: "GF-002",
      name: "Premium Linen Fabric",
      category: "Fabrics",
      subcategory: "garments-fabrics",
      productType: "Linen Fabric",
      description:
        "Breathable European-grade linen fabric ideal for premium apparel, resort wear, and home furnishings.",
      fabric: "100% Pure Linen",
      colors: ["Natural", "Bleached White", "Custom"],
      sizes: ["Width: 56-58 inches"],
      moq: "500 Metres",
      export: "Worldwide",
      image: "https://picsum.photos/seed/linen-fabric-gf/800/1000",
    },
    {
      id: "GF-003",
      name: "Premium Denim Fabric",
      category: "Fabrics",
      subcategory: "garments-fabrics",
      productType: "Denim Fabric",
      description:
        "Heavyweight selvedge denim fabric woven for premium denim garment manufacturers worldwide.",
      fabric: "100% Cotton Denim, 10–14 oz",
      colors: ["Indigo", "Black", "Raw"],
      sizes: ["Width: 60 inches"],
      moq: "2000 Metres",
      export: "Worldwide",
      image: "https://picsum.photos/seed/denim-fabric-gf/800/1000",
    },
    {
      id: "GF-004",
      name: "Polyester Blend Fabric",
      category: "Fabrics",
      subcategory: "garments-fabrics",
      productType: "Polyester Fabric",
      description:
        "Versatile poly-cotton blend fabric engineered for sportswear, uniform, and workwear programs.",
      fabric: "65% Polyester, 35% Cotton",
      colors: ["White", "Black", "Custom"],
      sizes: ["Width: 58 inches"],
      moq: "1000 Metres",
      export: "Worldwide",
      image: "https://picsum.photos/seed/polyester-fabric-gf/800/1000",
    },
    {
      id: "GF-005",
      name: "Stretch Jersey Fabric",
      category: "Fabrics",
      subcategory: "garments-fabrics",
      productType: "Jersey Fabric",
      description:
        "Soft four-way stretch jersey fabric in a premium cotton-spandex blend, developed for activewear and contemporary knitwear programs.",
      fabric: "92% Cotton, 8% Spandex",
      colors: ["White", "Black", "Heather Grey", "Navy"],
      sizes: ["Width: 60 inches"],
      moq: "500 Metres",
      export: "Worldwide",
      image: "https://picsum.photos/seed/stretch-jersey-gf/800/1000",
    },
    {
      id: "GF-006",
      name: "Twill Weave Fabric",
      category: "Fabrics",
      subcategory: "garments-fabrics",
      productType: "Twill Fabric",
      description:
        "Diagonal-weave cotton twill with excellent drape and durability — a go-to base fabric for chinos, uniforms and workwear collections.",
      fabric: "100% Cotton Twill, 250 GSM",
      colors: ["Khaki", "Navy", "Olive", "Charcoal"],
      sizes: ["Width: 58-60 inches"],
      moq: "1000 Metres",
      export: "Worldwide",
      image: "https://picsum.photos/seed/twill-weave-gf/800/1000",
    },
  ],

  // ── HOME TEXTILE FABRICS ──────────────────────────────────────────────────
  "home-textile-fabrics": [
    {
      id: "HF-001",
      name: "400TC Sateen Sheet Fabric",
      category: "Fabrics",
      subcategory: "home-textile-fabrics",
      productType: "Sateen Fabric",
      description:
        "Silky-smooth 400-thread-count sateen fabric developed for premium bedding sets, duvet covers, and high-end hospitality linen programs.",
      fabric: "100% Combed Cotton, 400 TC Sateen",
      colors: ["White", "Ivory", "Pale Grey", "Soft Blue"],
      sizes: ["Width: 274 cm (108 inches)"],
      moq: "500 Metres",
      export: "Worldwide",
      image: "https://picsum.photos/seed/sateen-sheet-hf/800/1000",
    },
    {
      id: "HF-002",
      name: "Zero-Twist Towelling Fabric",
      category: "Fabrics",
      subcategory: "home-textile-fabrics",
      productType: "Terry Fabric",
      description:
        "Ultra-absorbent zero-twist loop terry fabric in a premium 600 GSM weight, ideal for luxury bath towel and hotel-linen programs.",
      fabric: "100% Zero-Twist Cotton, 600 GSM",
      colors: ["White", "Ivory", "Navy", "Sage"],
      sizes: ["Width: 90 cm"],
      moq: "1000 Metres",
      export: "Worldwide",
      image: "https://picsum.photos/seed/towelling-terry-hf/800/1000",
    },
    {
      id: "HF-003",
      name: "Blackout Curtain Fabric",
      category: "Fabrics",
      subcategory: "home-textile-fabrics",
      productType: "Blackout Fabric",
      description:
        "Triple-pass coated blackout fabric with 100% light-blocking performance, developed for curtain, drapery and blind programs.",
      fabric: "Woven Polyester, Triple-Pass Blackout Coated",
      colors: ["Charcoal", "Ivory", "Navy", "Taupe"],
      sizes: ["Width: 280 cm"],
      moq: "500 Metres",
      export: "Worldwide",
      image: "https://picsum.photos/seed/blackout-curtain-hf/800/1000",
    },
    {
      id: "HF-004",
      name: "Linen-Cotton Upholstery Fabric",
      category: "Fabrics",
      subcategory: "home-textile-fabrics",
      productType: "Upholstery Fabric",
      description:
        "Woven linen-cotton blend upholstery fabric with a natural texture and superior abrasion resistance for furniture and home décor markets.",
      fabric: "55% Linen, 45% Cotton",
      colors: ["Natural", "Sand", "Sage", "Terracotta"],
      sizes: ["Width: 140 cm"],
      moq: "300 Metres",
      export: "Worldwide",
      image: "https://picsum.photos/seed/linen-upholstery-hf/800/1000",
    },
    {
      id: "HF-005",
      name: "Percale Weave Fabric",
      category: "Fabrics",
      subcategory: "home-textile-fabrics",
      productType: "Percale Fabric",
      description:
        "Crisp one-over-one-under percale weave fabric developed for high-volume bedding and hospitality linen programs worldwide.",
      fabric: "100% Cotton Percale, 200 TC",
      colors: ["White", "Ecru", "Pale Blue", "Blush"],
      sizes: ["Width: 274 cm (108 inches)"],
      moq: "800 Metres",
      export: "Worldwide",
      image: "https://picsum.photos/seed/percale-weave-hf/800/1000",
    },
    {
      id: "HF-006",
      name: "Velvet Cushion Fabric",
      category: "Fabrics",
      subcategory: "home-textile-fabrics",
      productType: "Velvet Fabric",
      description:
        "Soft-pile crushed velvet fabric in a rich polyester base for cushion, throw and decorative home-textile collections.",
      fabric: "100% Polyester Crushed Velvet",
      colors: ["Emerald", "Dusty Pink", "Midnight Blue", "Camel"],
      sizes: ["Width: 150 cm"],
      moq: "500 Metres",
      export: "Worldwide",
      image: "https://picsum.photos/seed/velvet-cushion-hf/800/1000",
    },
  ],
}

// ─── LOOKUP HELPERS ───────────────────────────────────────────────────────────

export function getFabricSubcategory(slug) {
  return fabricSubcategories.find((s) => s.slug === slug) || null
}

export function getFabricProducts(subcatSlug) {
  return fabricProducts[subcatSlug] || []
}

export function getFabricProductById(id) {
  for (const key of Object.keys(fabricProducts)) {
    const found = fabricProducts[key].find((p) => p.id === id)
    if (found) return found
  }
  return null
}
