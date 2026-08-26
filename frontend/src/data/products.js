// Central product catalog — 5 main business categories.
export const products = [
  // ─── GARMENTS ───────────────────────────────────────────────
  {
    id: "GE-001",
    name: "Premium Cotton Shirt",
    category: "Garments",

    productType: "Shirt",
    description:
      "Breathable premium cotton shirt engineered for international fashion markets and everyday tailoring.",
    fabric: "100% Combed Cotton, 120 GSM",
    colors: ["White", "Sky Blue", "Charcoal"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    moq: "500 Pieces",
    export: "Worldwide",
    image: "/images/products/shirt-cotton.png",
  },
  {
    id: "GE-002",
    name: "Oversized Casual T-Shirt",
    category: "Garments",
    productType: "T-Shirt",
    description:
      "Relaxed drop-shoulder tee in heavyweight jersey, built for contemporary streetwear labels.",
    fabric: "Heavyweight Cotton Jersey, 220 GSM",
    colors: ["Ecru", "Black", "Sage"],
    sizes: ["S", "M", "L", "XL"],
    moq: "800 Pieces",
    export: "Worldwide",
    image: "/images/products/tshirt-oversized.png",
  },
  {
    id: "GE-003",
    name: "Men's Linen Shirt",
    category: "Garments",
    productType: "Shirt",
    description:
      "Lightweight European linen shirt with a soft hand-feel, ideal for resort and premium casual lines.",
    fabric: "100% Washed Linen",
    colors: ["Natural", "Olive", "Sand"],
    sizes: ["S", "M", "L", "XL"],
    moq: "400 Pieces",
    export: "Worldwide",
    image: "/images/products/shirt-linen.png",
  },
  {
    id: "GE-004",
    name: "Premium Polo Shirt",
    category: "Garments",
    productType: "Polo",
    description:
      "Structured piqué polo with a clean placket and reinforced collar for retail and corporate wear.",
    fabric: "Cotton Piqué, 200 GSM",
    colors: ["Navy", "White", "Burgundy"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    moq: "600 Pieces",
    export: "Worldwide",
    image: "/images/products/polo-premium.png",
  },
  {
    id: "GE-005",
    name: "Slim Fit Chino Trousers",
    category: "Garments",
    productType: "Trousers",
    description:
      "Mid-rise stretch chino trousers with a tailored leg, developed for modern menswear collections.",
    fabric: "Cotton Twill with Elastane",
    colors: ["Stone", "Navy", "Black"],
    sizes: ["28", "30", "32", "34", "36"],
    moq: "500 Pieces",
    export: "Worldwide",
    image: "/images/products/trouser-chino.png",
  },
  {
    id: "GE-006",
    name: "Structured Field Jacket",
    category: "Garments",
    productType: "Jacket",
    description:
      "Utility-inspired field jacket with a water-resistant finish and premium hardware detailing.",
    fabric: "Cotton Canvas, Coated",
    colors: ["Khaki", "Charcoal", "Forest"],
    sizes: ["S", "M", "L", "XL"],
    moq: "300 Pieces",
    export: "Worldwide",
    image: "/images/products/jacket-field.png",
  },
  {
    id: "GE-007",
    name: "Classic Oxford Shirt",
    category: "Garments",
    productType: "Shirt",
    description:
      "Timeless button-down oxford with a refined weave, suited to formal and business collections.",
    fabric: "Oxford Cotton, 140 GSM",
    colors: ["White", "Light Blue", "Pink"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    moq: "500 Pieces",
    export: "Worldwide",
    image: "/images/products/shirt-oxford.png",
  },
  {
    id: "GE-008",
    name: "Essential Crew T-Shirt",
    category: "Garments",
    productType: "T-Shirt",
    description:
      "Everyday crew-neck tee with a durable ribbed collar, a reliable basics program staple.",
    fabric: "Ring-Spun Cotton, 180 GSM",
    colors: ["White", "Black", "Grey Melange"],
    sizes: ["S", "M", "L", "XL"],
    moq: "1000 Pieces",
    export: "Worldwide",
    image: "/images/products/tshirt-crew.png",
  },

  // ─── FABRICS ─────────────────────────────────────────────────
  {
    id: "FB-001",
    name: "Premium Cotton Fabric",
    category: "Fabrics",
    productType: "Cotton Fabric",
    description:
      "High-quality woven cotton fabric developed for international apparel and home textile manufacturing.",
    fabric: "100% Combed Cotton, 120–180 GSM",
    colors: ["Natural White", "Ecru", "Custom Dyeing Available"],
    sizes: ["Width: 58-60 inches"],
    moq: "1000 Metres",
    export: "Worldwide",
    image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80&fit=crop",
  },
  {
    id: "FB-002",
    name: "Premium Linen Fabric",
    category: "Fabrics",
    productType: "Linen Fabric",
    description:
      "Breathable European-grade linen fabric ideal for premium apparel, resort wear, and home furnishings.",
    fabric: "100% Pure Linen",
    colors: ["Natural", "Bleached White", "Custom"],
    sizes: ["Width: 56-58 inches"],
    moq: "500 Metres",
    export: "Worldwide",
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80&fit=crop",
  },
  {
    id: "FB-003",
    name: "Premium Denim Fabric",
    category: "Fabrics",
    productType: "Denim Fabric",
    description:
      "Heavyweight selvedge denim fabric woven for premium denim garment manufacturers worldwide.",
    fabric: "100% Cotton Denim, 10–14 oz",
    colors: ["Indigo", "Black", "Raw"],
    sizes: ["Width: 60 inches"],
    moq: "2000 Metres",
    export: "Worldwide",
    image: "https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=800&q=80&fit=crop",
  },
  {
    id: "FB-004",
    name: "Polyester Blend Fabric",
    category: "Fabrics",
    productType: "Polyester Fabric",
    description:
      "Versatile poly-cotton blend fabric engineered for sportswear, uniform, and workwear programs.",
    fabric: "65% Polyester, 35% Cotton",
    colors: ["White", "Black", "Custom"],
    sizes: ["Width: 58 inches"],
    moq: "1000 Metres",
    export: "Worldwide",
    image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80&fit=crop&crop=top",
  },

  // ─── FOOTWEAR ─────────────────────────────────────────────────
  {
    id: "FT-001",
    name: "Premium Leather Loafers",
    category: "Footwear",
    productType: "Loafers",
    description:
      "Refined full-grain leather loafers developed for premium international footwear markets.",
    fabric: "Full-Grain Leather Upper, Leather Sole",
    colors: ["Tan", "Black", "Dark Brown"],
    sizes: ["UK 6–12"],
    moq: "300 Pairs",
    export: "Worldwide",
    image: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=800&q=80&fit=crop",
  },
  {
    id: "FT-002",
    name: "Casual Canvas Sneakers",
    category: "Footwear",
    productType: "Sneakers",
    description:
      "Lightweight canvas sneakers with a vulcanized sole, built for lifestyle and everyday casual wear.",
    fabric: "Canvas Upper, Rubber Sole",
    colors: ["White", "Black", "Navy"],
    sizes: ["UK 5–12"],
    moq: "500 Pairs",
    export: "Worldwide",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80&fit=crop",
  },
  {
    id: "FT-003",
    name: "Formal Leather Oxford",
    category: "Footwear",
    productType: "Formal Shoes",
    description:
      "Classic cap-toe oxford crafted in smooth leather, ideal for formal and business footwear collections.",
    fabric: "Smooth Calf Leather, Leather Sole",
    colors: ["Black", "Dark Brown"],
    sizes: ["UK 6–12"],
    moq: "250 Pairs",
    export: "Worldwide",
    image: "https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=800&q=80&fit=crop",
  },
  {
    id: "FT-004",
    name: "Sports Running Shoes",
    category: "Footwear",
    productType: "Sports Shoes",
    description:
      "High-performance running shoes with cushioned EVA midsole, engineered for sport and athleisure brands.",
    fabric: "Mesh Upper, EVA + Rubber Sole",
    colors: ["White/Blue", "Black/Red", "Grey"],
    sizes: ["UK 5–13"],
    moq: "600 Pairs",
    export: "Worldwide",
    image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800&q=80&fit=crop",
  },

  // ─── HOME TEXTILE ─────────────────────────────────────────────
  {
    id: "HT-001",
    name: "Premium Cotton Bedsheet",
    category: "Home Textile",
    productType: "Bedsheet",
    description:
      "400-thread-count cotton bedsheet set developed for premium hospitality and retail markets.",
    fabric: "100% Combed Cotton, 400 TC",
    colors: ["White", "Ivory", "Soft Grey"],
    sizes: ["Single", "Double", "King", "Super King"],
    moq: "500 Sets",
    export: "Worldwide",
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80&fit=crop",
  },
  {
    id: "HT-002",
    name: "Luxury Bath Towels",
    category: "Home Textile",
    productType: "Towels",
    description:
      "Plush zero-twist cotton bath towels with high absorbency, built for luxury hotel and retail programs.",
    fabric: "Zero-Twist Cotton, 600 GSM",
    colors: ["White", "Ivory", "Navy", "Grey"],
    sizes: ["Bath", "Hand", "Face"],
    moq: "1000 Pieces",
    export: "Worldwide",
    image: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=800&q=80&fit=crop",
  },
  {
    id: "HT-003",
    name: "Premium Blackout Curtains",
    category: "Home Textile",
    productType: "Curtains",
    description:
      "Room-darkening blackout curtains in premium woven fabric, suitable for hospitality and retail.",
    fabric: "Woven Polyester Blackout",
    colors: ["Charcoal", "Ivory", "Navy", "Taupe"],
    sizes: ["Custom width and drop"],
    moq: "300 Pairs",
    export: "Worldwide",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80&fit=crop",
  },
  {
    id: "HT-004",
    name: "Decorative Cushion Covers",
    category: "Home Textile",
    productType: "Cushion Covers",
    description:
      "Hand-finished decorative cushion covers in premium linen-cotton blend for home décor markets.",
    fabric: "Linen-Cotton Blend",
    colors: ["Natural", "Sage", "Dusty Pink", "Terracotta"],
    sizes: ["45x45 cm", "50x50 cm", "60x60 cm"],
    moq: "500 Pieces",
    export: "Worldwide",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80&fit=crop",
  },

  // ─── ELECTRONICS & APPLIANCES ─────────────────────────────────
  {
    id: "EA-001",
    name: "Smart LED Television",
    category: "Electronics & Appliances",
    productType: "Television",
    description:
      "4K UHD Smart LED TV with built-in streaming, voice control, and slim-bezel premium display.",
    fabric: "4K UHD, 43–75 inch range",
    colors: ["Black"],
    sizes: ["43\"", "55\"", "65\"", "75\""],
    moq: "100 Units",
    export: "Worldwide",
    image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800&q=80&fit=crop",
  },
  {
    id: "EA-002",
    name: "Electric Stand Mixer",
    category: "Electronics & Appliances",
    productType: "Kitchen Appliance",
    description:
      "Professional-grade electric stand mixer with multiple speed settings, built for modern kitchens.",
    fabric: "Die-Cast Metal, 1000W Motor",
    colors: ["Matte Black", "Cream White", "Red"],
    sizes: ["5L Bowl"],
    moq: "200 Units",
    export: "Worldwide",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80&fit=crop",
  },
  {
    id: "EA-003",
    name: "Premium Air Purifier",
    category: "Electronics & Appliances",
    productType: "Home Appliance",
    description:
      "HEPA-grade air purifier with smart air quality sensor and whisper-quiet operation for home use.",
    fabric: "HEPA + Carbon Filter, 360° Airflow",
    colors: ["White", "Black"],
    sizes: ["Coverage: up to 50 m²"],
    moq: "150 Units",
    export: "Worldwide",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80&fit=crop&crop=entropy",
  },
  {
    id: "EA-004",
    name: "Wireless Noise-Cancelling Headphones",
    category: "Electronics & Appliances",
    productType: "Consumer Electronics",
    description:
      "Premium over-ear wireless headphones with active noise cancellation and 30-hour battery life.",
    fabric: "Bluetooth 5.2, ANC, 30hr Battery",
    colors: ["Midnight Black", "Champagne Gold", "Space Grey"],
    sizes: ["One Size"],
    moq: "300 Units",
    export: "Worldwide",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80&fit=crop",
  },
]

export const productCategories = [
  "All",
  "Garments",
  "Fabrics",
  "Footwear",
  "Home Textile",
  "Electronics & Appliances",
]

// One representative product per main category for the home page slider
export const featuredProducts = [
  products.find((p) => p.id === "GE-001"), // Garments
  products.find((p) => p.id === "FB-001"), // Fabrics
  products.find((p) => p.id === "FT-001"), // Footwear
  products.find((p) => p.id === "HT-001"), // Home Textile
  products.find((p) => p.id === "EA-001"), // Electronics & Appliances
]

export function getProductById(id) {
  return products.find((product) => product.id === id)
}
