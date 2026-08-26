// ─────────────────────────────────────────────────────────────────────────────
// Garments Hierarchy Data
// Structure: genders → subcategories → products
// Product shape mirrors src/data/products.js for full compatibility.
// ─────────────────────────────────────────────────────────────────────────────

// ─── GENDER INDEX ────────────────────────────────────────────────────────────
export const garmentGenders = [
  {
    slug: "men",
    label: "Men",
    title: "Men's Collection",
    tagline: "Precision-crafted menswear for global fashion markets.",
    intro:
      "From structured outerwear to everyday essentials, our men's range is built on decades of export expertise — clean silhouettes, premium fabrics, and international-standard quality control at every stage.",
    heroImage: "/images/categories/mens-wear.png",
    accentColor: "#A08145",
  },
  {
    slug: "women",
    label: "Women",
    title: "Women's Collection",
    tagline: "Contemporary womenswear engineered for world markets.",
    intro:
      "Refined, versatile, and export-ready — our women's apparel range combines modern silhouettes with premium fabric quality to meet the demands of international buyers across every season.",
    heroImage: "/images/categories/womens-wear.png",
    accentColor: "#A08145",
  },
  {
    slug: "children",
    label: "Children",
    title: "Children's Collection",
    tagline: "Safe, durable, and delightfully crafted children's apparel.",
    intro:
      "Our children's range blends comfort and durability with playful, market-ready designs — crafted to meet global safety standards and built for international wholesale programs.",
    heroImage: "https://images.unsplash.com/photo-1522771930-78848d9293e8?w=1600&q=80&fit=crop",
    accentColor: "#A08145",
  },
  {
    slug: "kids",
    label: "Kids",
    title: "Kids' Collection",
    tagline: "Vibrant, comfortable kids' apparel for global retail.",
    intro:
      "Bold colours, soft fabrics, and thoughtfully designed fits — our kids' collection is crafted for retail buyers who demand both quality and personality in every piece.",
    heroImage: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=1600&q=80&fit=crop",
    accentColor: "#A08145",
  },
]

// ─── MEN SUBCATEGORIES ────────────────────────────────────────────────────────
export const menSubcategories = [
  {
    slug: "jackets-vests",
    label: "Men's Jacket & Vest",
    shortLabel: "Jackets & Vests",
    description: "Structured outerwear and layering pieces built for premium retail export programs.",
    image: "/images/products/jacket-field.png",
  },
  {
    slug: "sweat-tops-hoodies",
    label: "Men's Sweat Tops & Hoodies",
    shortLabel: "Sweat Tops & Hoodies",
    description: "Heavyweight fleece and jersey tops crafted for athleisure and streetwear collections.",
    image: "/images/products/Hoodies.jpg",
  },
  {
    slug: "shorts-lower",
    label: "Men's Shorts & Lower",
    shortLabel: "Shorts & Lower",
    description: "Versatile bottoms from casual shorts to structured lounge trousers for men.",
    image: "https://images.unsplash.com/photo-1565084888279-aca607ecce0c?w=800&q=80&fit=crop",
  },
  {
    slug: "shirts",
    label: "Men's Shirt",
    shortLabel: "Shirts",
    description: "Premium woven shirts across formal, casual and resort ranges — export-ready.",
    image: "/images/categories/shirts.png",
  },
  {
    slug: "tshirts",
    label: "Men's T-Shirt",
    shortLabel: "T-Shirts",
    description: "Everyday and fashion-forward tees in cotton, jersey and performance fabrics.",
    image: "/images/categories/t-shirts.png",
  },
  {
    slug: "jeans-pants",
    label: "Men's Jeans & Pants",
    shortLabel: "Jeans & Pants",
    description: "Denim and structured trousers crafted for global menswear and lifestyle brands.",
    image: "/images/products/trouser-chino.png",
  },
]

// ─── WOMEN SUBCATEGORIES (stubs — expandable) ─────────────────────────────────
export const womenSubcategories = [
  {
    slug: "dresses",
    label: "Women's Dresses",
    shortLabel: "Dresses",
    description: "Elegant and casual dresses crafted for international womenswear markets.",
    image: "/images/categories/womens-wear.png",
  },
  {
    slug: "tops-blouses",
    label: "Women's Tops & Blouses",
    shortLabel: "Tops & Blouses",
    description: "Refined tops and blouses in woven and knit fabrics for every occasion.",
    image: "https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?w=800&q=80&fit=crop",
  },
  {
    slug: "knitwear",
    label: "Women's Knitwear",
    shortLabel: "Knitwear",
    description: "Premium knitwear collection designed for comfort and contemporary style.",
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&q=80&fit=crop",
  },
  {
    slug: "trousers-skirts",
    label: "Women's Trousers & Skirts",
    shortLabel: "Trousers & Skirts",
    description: "Modern bottoms engineered for premium women's retail and export collections.",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80&fit=crop",
  },
  {
    slug: "jackets-outerwear",
    label: "Women's Jackets & Outerwear",
    shortLabel: "Jackets & Outerwear",
    description: "Stylish outerwear designed for contemporary women's fashion markets.",
    image: "https://images.unsplash.com/photo-1548624313-0396c75e4b1a?w=800&q=80&fit=crop",
  },
  {
    slug: "sportswear",
    label: "Women's Sportswear",
    shortLabel: "Sportswear",
    description: "High-performance activewear for fitness and athleisure retail programs.",
    image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=800&q=80&fit=crop",
  },
]

// ─── CHILDREN SUBCATEGORIES (stubs) ──────────────────────────────────────────
export const childrenSubcategories = [
  {
    slug: "shirts-tops",
    label: "Children's Shirts & Tops",
    shortLabel: "Shirts & Tops",
    description: "Comfortable shirts and tops crafted with child-safe dyes and durable fabrics.",
    image: "/images/products/shirtchildren.jpg",
  },
  {
    slug: "trousers-shorts",
    label: "Children's Trousers & Shorts",
    shortLabel: "Trousers & Shorts",
    description: "Durable and comfortable bottoms for children, designed for active lifestyles.",
    image: "/images/products/trouserchildren.jpg",
  },
  {
    slug: "dresses-skirts",
    label: "Children's Dresses & Skirts",
    shortLabel: "Dresses & Skirts",
    description: "Delightful dresses and skirts in vibrant prints for the children's retail market.",
    image: "https://images.unsplash.com/photo-1522771930-78848d9293e8?w=800&q=80&fit=crop",
  },
  {
    slug: "outerwear",
    label: "Children's Outerwear",
    shortLabel: "Outerwear",
    description: "Protective and stylish outerwear for children across all seasons.",
    image: "/images/products/outerwearchildren.jpg",
  },
]

// ─── KIDS SUBCATEGORIES (stubs) ───────────────────────────────────────────────
export const kidsSubcategories = [
  {
    slug: "graphic-tees",
    label: "Kids' Graphic Tees",
    shortLabel: "Graphic Tees",
    description: "Bold graphic tees in soft cotton for the kids' retail and wholesale market.",
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&q=80&fit=crop",
  },
  {
    slug: "sets-coordinates",
    label: "Kids' Sets & Co-ordinates",
    shortLabel: "Sets & Co-ords",
    description: "Matching sets and co-ordinated outfits designed for the young fashion market.",
    image: "/images/products/kidssets.jpg",
  },
  {
    slug: "sleepwear",
    label: "Kids' Sleepwear",
    shortLabel: "Sleepwear",
    description: "Soft, safe sleepwear collections for kids, built for global retail programs.",
    image: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=800&q=80&fit=crop",
  },
  {
    slug: "outerwear",
    label: "Kids' Outerwear",
    shortLabel: "Outerwear",
    description: "Warm and playful outerwear for kids designed to meet international safety standards.",
    image: "/images/products/outerwearkids.jpg",
  },
]

// ─── SUBCATEGORY MAP (for lookup by gender slug) ──────────────────────────────
export const subcategoriesByGender = {
  men: menSubcategories,
  women: womenSubcategories,
  children: childrenSubcategories,
  kids: kidsSubcategories,
}

// ─── GARMENT PRODUCTS ─────────────────────────────────────────────────────────
// Keyed by subcategory slug. Product shape matches src/data/products.js exactly.
export const garmentProducts = {
  // MEN — JACKETS & VESTS
  "jackets-vests": [
    {
      id: "MJV-001",
      name: "Structured Field Jacket",
      category: "Garments",
      subcategory: "jackets-vests",
      gender: "men",
      productType: "Jacket",
      description:
        "Utility-inspired field jacket with water-resistant coating and premium brass hardware — a staple for international outerwear collections.",
      fabric: "Cotton Canvas, Coated Finish",
      colors: ["Khaki", "Charcoal", "Forest Green"],
      sizes: ["S", "M", "L", "XL", "XXL"],
      moq: "300 Pieces",
      export: "Worldwide",
      image: "/images/products/jacket-field.png",
    },
    {
      id: "MJV-002",
      name: "Premium Puffer Vest",
      category: "Garments",
      subcategory: "jackets-vests",
      gender: "men",
      productType: "Vest",
      description:
        "Lightweight down-feel puffer vest with a quilted shell and concealed zip, ideal for resort and outdoor retail programs.",
      fabric: "Nylon Shell, Polyester Fill",
      colors: ["Navy", "Black", "Olive"],
      sizes: ["S", "M", "L", "XL"],
      moq: "400 Pieces",
      export: "Worldwide",
      image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80&fit=crop",
    },
    {
      id: "MJV-003",
      name: "Wool Blend Blazer",
      category: "Garments",
      subcategory: "jackets-vests",
      gender: "men",
      productType: "Jacket",
      description:
        "Mid-weight wool-blend blazer with structured shoulders and a clean single-button front for formal and smart-casual collections.",
      fabric: "60% Wool, 40% Polyester",
      colors: ["Charcoal", "Camel", "Navy"],
      sizes: ["S", "M", "L", "XL"],
      moq: "250 Pieces",
      export: "Worldwide",
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80&fit=crop",
    },
    {
      id: "MJV-004",
      name: "Denim Trucker Jacket",
      category: "Garments",
      subcategory: "jackets-vests",
      gender: "men",
      productType: "Jacket",
      description:
        "Classic denim trucker jacket with a washed finish and contrast stitching — a proven bestseller for casual and lifestyle brands.",
      fabric: "100% Cotton Denim, 12 oz",
      colors: ["Indigo", "Black Wash", "Stone Wash"],
      sizes: ["S", "M", "L", "XL", "XXL"],
      moq: "500 Pieces",
      export: "Worldwide",
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&q=80&fit=crop",
    },
    {
      id: "MJV-005",
      name: "Quilted Gilet Vest",
      category: "Garments",
      subcategory: "jackets-vests",
      gender: "men",
      productType: "Vest",
      description:
        "Sleek quilted gilet with a diamond stitch pattern, minimal collar, and side pockets — versatile layering for premium labels.",
      fabric: "Polyester Shell, Thermal Fill",
      colors: ["Black", "Burgundy", "Slate"],
      sizes: ["S", "M", "L", "XL"],
      moq: "350 Pieces",
      export: "Worldwide",
      image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80&fit=crop",
    },
    {
      id: "MJV-006",
      name: "Harrington Jacket",
      category: "Garments",
      subcategory: "jackets-vests",
      gender: "men",
      productType: "Jacket",
      description:
        "Iconic Harrington-style jacket in a lightweight woven shell with a tartan lining and ribbed cuffs — a timeless casual classic.",
      fabric: "Cotton-Poly Blend Outer, Tartan Lining",
      colors: ["Tan", "Forest", "Navy"],
      sizes: ["S", "M", "L", "XL", "XXL"],
      moq: "400 Pieces",
      export: "Worldwide",
      image: "https://images.unsplash.com/photo-1619603364858-fc60c8d2bfaa?w=800&q=80&fit=crop",
    },
  ],

  // MEN — SWEAT TOPS & HOODIES
  "sweat-tops-hoodies": [
    {
      id: "MSH-001",
      name: "Premium Pullover Hoodie",
      category: "Garments",
      subcategory: "sweat-tops-hoodies",
      gender: "men",
      productType: "Hoodie",
      description:
        "Heavyweight French terry pullover hoodie with a kangaroo pocket and ribbed hem — the cornerstone of any premium basics program.",
      fabric: "Heavyweight Cotton French Terry, 400 GSM",
      colors: ["Charcoal", "Ecru", "Black", "Sage"],
      sizes: ["S", "M", "L", "XL", "XXL"],
      moq: "500 Pieces",
      export: "Worldwide",
      image: "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=800&q=80&fit=crop",
    },
    {
      id: "MSH-002",
      name: "Zip-Up Sweat Jacket",
      category: "Garments",
      subcategory: "sweat-tops-hoodies",
      gender: "men",
      productType: "Sweatshirt",
      description:
        "Full-zip sweat jacket in a mid-weight fleece with a clean collar and two side pockets for athleisure and casual collections.",
      fabric: "Cotton Fleece, 320 GSM",
      colors: ["Navy", "Grey Melange", "Black"],
      sizes: ["S", "M", "L", "XL"],
      moq: "600 Pieces",
      export: "Worldwide",
      image: "https://images.unsplash.com/photo-1544441893-675973e31985?w=800&q=80&fit=crop",
    },
    {
      id: "MSH-003",
      name: "Crew Neck Sweatshirt",
      category: "Garments",
      subcategory: "sweat-tops-hoodies",
      gender: "men",
      productType: "Sweatshirt",
      description:
        "Classic crew-neck sweatshirt with a soft brushed interior and neat ribbed details — a reliable programs staple for any market.",
      fabric: "Brushed Cotton Fleece, 350 GSM",
      colors: ["Stone", "Navy", "Dusty Pink", "Black"],
      sizes: ["S", "M", "L", "XL", "XXL"],
      moq: "800 Pieces",
      export: "Worldwide",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80&fit=crop",
    },
    {
      id: "MSH-004",
      name: "Oversized Graphic Hoodie",
      category: "Garments",
      subcategory: "sweat-tops-hoodies",
      gender: "men",
      productType: "Hoodie",
      description:
        "Drop-shoulder oversized hoodie with a relaxed fit and deep hood — built for contemporary streetwear and youth fashion labels.",
      fabric: "Heavy Cotton Jersey, 380 GSM",
      colors: ["Washed Black", "Vintage Grey", "Ecru"],
      sizes: ["M", "L", "XL", "XXL"],
      moq: "400 Pieces",
      export: "Worldwide",
      image: "https://images.unsplash.com/photo-1620799139507-2a76f79a2f4d?w=800&q=80&fit=crop",
    },
    {
      id: "MSH-005",
      name: "Lightweight Quarter-Zip",
      category: "Garments",
      subcategory: "sweat-tops-hoodies",
      gender: "men",
      productType: "Sweatshirt",
      description:
        "Slim-profile quarter-zip in a smooth mid-layer fabric with contrast zipper tape — suitable for smart-casual and sportswear programs.",
      fabric: "Polyester-Cotton Blend, 280 GSM",
      colors: ["Navy", "Burgundy", "Slate"],
      sizes: ["S", "M", "L", "XL"],
      moq: "500 Pieces",
      export: "Worldwide",
      image: "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?w=800&q=80&fit=crop",
    },
    {
      id: "MSH-006",
      name: "Tie-Dye Sweat Top",
      category: "Garments",
      subcategory: "sweat-tops-hoodies",
      gender: "men",
      productType: "Sweatshirt",
      description:
        "Hand-dyed tie-dye sweat top with a relaxed silhouette — a high-demand piece for fashion-forward casual collections.",
      fabric: "Ring-Spun Cotton, 300 GSM",
      colors: ["Teal/Navy", "Rust/Ecru", "Lavender/White"],
      sizes: ["S", "M", "L", "XL"],
      moq: "300 Pieces",
      export: "Worldwide",
      image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&q=80&fit=crop",
    },
  ],

  // MEN — SHORTS & LOWER
  "shorts-lower": [
    {
      id: "MSL-001",
      name: "Slim Fit Chino Trousers",
      category: "Garments",
      subcategory: "shorts-lower",
      gender: "men",
      productType: "Trousers",
      description:
        "Mid-rise stretch chino trousers with a tailored leg, developed for modern menswear collections across global markets.",
      fabric: "Cotton Twill with Elastane",
      colors: ["Stone", "Navy", "Black"],
      sizes: ["28", "30", "32", "34", "36"],
      moq: "500 Pieces",
      export: "Worldwide",
      image: "/images/products/trouser-chino.png",
    },
    {
      id: "MSL-002",
      name: "Casual Drawstring Shorts",
      category: "Garments",
      subcategory: "shorts-lower",
      gender: "men",
      productType: "Shorts",
      description:
        "Lightweight mid-thigh shorts in a soft cotton-linen blend with an elastic waistband and adjustable drawstring.",
      fabric: "Cotton-Linen Blend, 180 GSM",
      colors: ["Ecru", "Navy", "Sage", "Stone"],
      sizes: ["S", "M", "L", "XL", "XXL"],
      moq: "600 Pieces",
      export: "Worldwide",
      image: "https://images.unsplash.com/photo-1565084888279-aca607ecce0c?w=800&q=80&fit=crop",
    },
    {
      id: "MSL-003",
      name: "Denim Cargo Shorts",
      category: "Garments",
      subcategory: "shorts-lower",
      gender: "men",
      productType: "Shorts",
      description:
        "Sturdy denim cargo shorts with utility pockets and a relaxed fit — suited for lifestyle and outdoor retail collections.",
      fabric: "100% Cotton Denim, 10 oz",
      colors: ["Mid Wash", "Black Wash", "Stone Wash"],
      sizes: ["S", "M", "L", "XL"],
      moq: "400 Pieces",
      export: "Worldwide",
      image: "https://images.unsplash.com/photo-1591195853828-11db59a44f43?w=800&q=80&fit=crop",
    },
    {
      id: "MSL-004",
      name: "Lounge Track Pants",
      category: "Garments",
      subcategory: "shorts-lower",
      gender: "men",
      productType: "Trousers",
      description:
        "Relaxed-fit track pants in a soft jersey fabric with contrast piping and a tapered ankle — athleisure-ready for global markets.",
      fabric: "Cotton Jersey, 260 GSM",
      colors: ["Black", "Navy", "Charcoal/Bronze"],
      sizes: ["S", "M", "L", "XL", "XXL"],
      moq: "500 Pieces",
      export: "Worldwide",
      image: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=800&q=80&fit=crop",
    },
    {
      id: "MSL-005",
      name: "Linen Wide-Leg Trousers",
      category: "Garments",
      subcategory: "shorts-lower",
      gender: "men",
      productType: "Trousers",
      description:
        "Breezy wide-leg linen trousers with a high rise and pleat front — a premium choice for resort and luxury casual collections.",
      fabric: "100% Washed Linen",
      colors: ["Natural", "White", "Sand"],
      sizes: ["S", "M", "L", "XL"],
      moq: "300 Pieces",
      export: "Worldwide",
      image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80&fit=crop",
    },
    {
      id: "MSL-006",
      name: "Active Training Shorts",
      category: "Garments",
      subcategory: "shorts-lower",
      gender: "men",
      productType: "Shorts",
      description:
        "Performance training shorts with a moisture-wicking finish and an inner brief liner — built for sports and activewear brands.",
      fabric: "100% Polyester, Moisture-Wicking",
      colors: ["Black", "Navy/White", "Grey/Blue"],
      sizes: ["S", "M", "L", "XL", "XXL"],
      moq: "700 Pieces",
      export: "Worldwide",
      image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80&fit=crop",
    },
  ],

  // MEN — SHIRTS
  shirts: [
    {
      id: "MS-001",
      name: "Premium Cotton Shirt",
      category: "Garments",
      subcategory: "shirts",
      gender: "men",
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
      id: "MS-002",
      name: "Men's Linen Shirt",
      category: "Garments",
      subcategory: "shirts",
      gender: "men",
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
      id: "MS-003",
      name: "Classic Oxford Shirt",
      category: "Garments",
      subcategory: "shirts",
      gender: "men",
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
      id: "MS-004",
      name: "Flannel Check Shirt",
      category: "Garments",
      subcategory: "shirts",
      gender: "men",
      productType: "Shirt",
      description:
        "Warm brushed flannel check shirt with a relaxed fit — a perennial bestseller for autumn-winter retail programs.",
      fabric: "Brushed Cotton Flannel, 160 GSM",
      colors: ["Red/Navy Check", "Green/Black Check", "Blue/White Check"],
      sizes: ["S", "M", "L", "XL", "XXL"],
      moq: "400 Pieces",
      export: "Worldwide",
      image: "https://images.unsplash.com/photo-1588359348347-9bc6cbbb689e?w=800&q=80&fit=crop",
    },
    {
      id: "MS-005",
      name: "Slim Fit Dress Shirt",
      category: "Garments",
      subcategory: "shirts",
      gender: "men",
      productType: "Shirt",
      description:
        "Precision-cut slim fit dress shirt in a 2-ply poplin weave — developed for premium formal and corporate wear programs.",
      fabric: "2-Ply Cotton Poplin, 120 GSM",
      colors: ["White", "Pale Blue", "Lilac"],
      sizes: ["S", "M", "L", "XL"],
      moq: "600 Pieces",
      export: "Worldwide",
      image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=800&q=80&fit=crop",
    },
    {
      id: "MS-006",
      name: "Cuban Collar Shirt",
      category: "Garments",
      subcategory: "shirts",
      gender: "men",
      productType: "Shirt",
      description:
        "Relaxed camp-collar shirt in a lightweight printed fabric — a versatile resort piece for summer fashion collections.",
      fabric: "Cotton Voile, 80 GSM",
      colors: ["White Floral", "Navy Stripe", "Ecru Geometric"],
      sizes: ["S", "M", "L", "XL"],
      moq: "350 Pieces",
      export: "Worldwide",
      image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=800&q=80&fit=crop",
    },
  ],

  // MEN — T-SHIRTS
  tshirts: [
    {
      id: "MT-001",
      name: "Oversized Casual T-Shirt",
      category: "Garments",
      subcategory: "tshirts",
      gender: "men",
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
      id: "MT-002",
      name: "Essential Crew T-Shirt",
      category: "Garments",
      subcategory: "tshirts",
      gender: "men",
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
    {
      id: "MT-003",
      name: "Premium Polo Shirt",
      category: "Garments",
      subcategory: "tshirts",
      gender: "men",
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
      id: "MT-004",
      name: "Longline V-Neck Tee",
      category: "Garments",
      subcategory: "tshirts",
      gender: "men",
      productType: "T-Shirt",
      description:
        "Extended-length v-neck tee with a curved hem and a draped silhouette — developed for contemporary fashion markets.",
      fabric: "Cotton Modal Blend, 190 GSM",
      colors: ["Black", "White", "Slate"],
      sizes: ["S", "M", "L", "XL"],
      moq: "500 Pieces",
      export: "Worldwide",
      image: "https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?w=800&q=80&fit=crop",
    },
    {
      id: "MT-005",
      name: "Performance Tech Tee",
      category: "Garments",
      subcategory: "tshirts",
      gender: "men",
      productType: "T-Shirt",
      description:
        "Moisture-wicking performance tee with flatlock seams and a four-way stretch fabric for sports and athleisure brands.",
      fabric: "Polyester-Spandex, 170 GSM",
      colors: ["White", "Black", "Navy", "Red"],
      sizes: ["S", "M", "L", "XL", "XXL"],
      moq: "700 Pieces",
      export: "Worldwide",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80&fit=crop",
    },
    {
      id: "MT-006",
      name: "Pocket Tee",
      category: "Garments",
      subcategory: "tshirts",
      gender: "men",
      productType: "T-Shirt",
      description:
        "Classic single-pocket tee in a medium-weight jersey with a neat patch pocket — a versatile casual staple for any market.",
      fabric: "Combed Cotton, 200 GSM",
      colors: ["Indigo", "Ecru", "Rust", "Forest"],
      sizes: ["S", "M", "L", "XL"],
      moq: "600 Pieces",
      export: "Worldwide",
      image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80&fit=crop",
    },
  ],

  // MEN — JEANS & PANTS
  "jeans-pants": [
    {
      id: "MJP-001",
      name: "Slim Tapered Denim Jeans",
      category: "Garments",
      subcategory: "jeans-pants",
      gender: "men",
      productType: "Jeans",
      description:
        "Slim-tapered denim jeans in a mid-stretch denim with a clean five-pocket construction — a perennial bestseller for denim brands.",
      fabric: "98% Cotton, 2% Elastane, 11 oz",
      colors: ["Mid Indigo", "Black", "Dark Wash"],
      sizes: ["28", "30", "32", "34", "36", "38"],
      moq: "500 Pieces",
      export: "Worldwide",
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80&fit=crop",
    },
    {
      id: "MJP-002",
      name: "Relaxed Straight Jeans",
      category: "Garments",
      subcategory: "jeans-pants",
      gender: "men",
      productType: "Jeans",
      description:
        "Relaxed straight-leg denim with a mid-rise and a comfortable seat — built for lifestyle and casual fashion programs.",
      fabric: "100% Cotton Denim, 12 oz",
      colors: ["Light Wash", "Mid Wash", "Stone Wash"],
      sizes: ["28", "30", "32", "34", "36"],
      moq: "400 Pieces",
      export: "Worldwide",
      image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80&fit=crop",
    },
    {
      id: "MJP-003",
      name: "Formal Wool Trousers",
      category: "Garments",
      subcategory: "jeans-pants",
      gender: "men",
      productType: "Trousers",
      description:
        "Pleated formal trousers in a premium wool-blend with a slim taper and satin waistband finish for tailoring programs.",
      fabric: "55% Wool, 45% Polyester",
      colors: ["Charcoal", "Navy", "Black"],
      sizes: ["28", "30", "32", "34", "36"],
      moq: "300 Pieces",
      export: "Worldwide",
      image: "https://images.unsplash.com/photo-1504198458649-3128b932f49d?w=800&q=80&fit=crop",
    },
    {
      id: "MJP-004",
      name: "Distressed Skinny Jeans",
      category: "Garments",
      subcategory: "jeans-pants",
      gender: "men",
      productType: "Jeans",
      description:
        "Fashion-forward skinny jeans with deliberate distressing and a high-stretch denim for youth fashion and streetwear labels.",
      fabric: "92% Cotton, 8% Elastane, 9 oz",
      colors: ["Mid Wash Distressed", "Black Ripped", "White"],
      sizes: ["28", "30", "32", "34"],
      moq: "400 Pieces",
      export: "Worldwide",
      image: "https://images.unsplash.com/photo-1475178626620-a4d074967452?w=800&q=80&fit=crop",
    },
    {
      id: "MJP-005",
      name: "Cargo Combat Pants",
      category: "Garments",
      subcategory: "jeans-pants",
      gender: "men",
      productType: "Trousers",
      description:
        "Military-inspired cargo pants with multi-utility pockets and a tapered fit — a strong performer in the streetwear and workwear market.",
      fabric: "Cotton Ripstop, 250 GSM",
      colors: ["Olive", "Black", "Sand"],
      sizes: ["S", "M", "L", "XL", "XXL"],
      moq: "450 Pieces",
      export: "Worldwide",
      image: "https://images.unsplash.com/photo-1560243563-062bfc001d68?w=800&q=80&fit=crop",
    },
    {
      id: "MJP-006",
      name: "Wide-Leg Denim",
      category: "Garments",
      subcategory: "jeans-pants",
      gender: "men",
      productType: "Jeans",
      description:
        "On-trend wide-leg denim with a clean taper from thigh and a high waist — designed for contemporary fashion collections.",
      fabric: "100% Cotton Denim, 13 oz",
      colors: ["Indigo", "Ecru", "Washed Grey"],
      sizes: ["28", "30", "32", "34", "36"],
      moq: "350 Pieces",
      export: "Worldwide",
      image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80&fit=crop",
    },
  ],
}

// Stub products for other genders (Women, Children, Kids)
const createStubProducts = (gender, subcatSlug, subcatLabel, count = 4) =>
  Array.from({ length: count }, (_, i) => ({
    id: `${gender.slice(0, 2).toUpperCase()}${subcatSlug.slice(0, 3).toUpperCase()}-00${i + 1}`,
    name: `${subcatLabel} Style ${i + 1}`,
    category: "Garments",
    subcategory: subcatSlug,
    gender,
    productType: subcatLabel,
    description: `Premium ${subcatLabel.toLowerCase()} crafted for international fashion markets — superior quality and export-ready construction.`,
    fabric: "Premium Cotton Blend",
    colors: ["White", "Black", "Charcoal"],
    sizes: ["S", "M", "L", "XL"],
    moq: "300 Pieces",
    export: "Worldwide",
    image: `https://images.unsplash.com/photo-${1490481651871 + i * 100000}-84d25b8deb96?w=800&q=80&fit=crop`,
  }))

  // Generate stubs for women/children/kids
  ;[
    { gender: "women", subs: womenSubcategories },
    { gender: "children", subs: childrenSubcategories },
    { gender: "kids", subs: kidsSubcategories },
  ].forEach(({ gender, subs }) => {
    subs.forEach((sub) => {
      garmentProducts[`${gender}--${sub.slug}`] = createStubProducts(gender, sub.slug, sub.shortLabel)
    })
  })

// ─── LOOKUP HELPERS ───────────────────────────────────────────────────────────

/** Get the gender config object by slug */
export function getGarmentGender(slug) {
  return garmentGenders.find((g) => g.slug === slug) || null
}

/** Get all subcategories for a given gender slug */
export function getSubcategoriesByGender(genderSlug) {
  return subcategoriesByGender[genderSlug] || []
}

/** Get a specific subcategory object */
export function getSubcategory(genderSlug, subcatSlug) {
  const subs = getSubcategoriesByGender(genderSlug)
  return subs.find((s) => s.slug === subcatSlug) || null
}

/** Get products for a gender + subcategory combination */
export function getGarmentProducts(genderSlug, subcatSlug) {
  // Men products are keyed directly by subcatSlug
  if (genderSlug === "men") {
    return garmentProducts[subcatSlug] || []
  }
  // Others are keyed by gender--subcatSlug
  return garmentProducts[`${genderSlug}--${subcatSlug}`] || []
}

/** Find a single garment product by its ID */
export function getGarmentProductById(id) {
  const allKeys = Object.keys(garmentProducts)
  for (const key of allKeys) {
    const found = garmentProducts[key].find((p) => p.id === id)
    if (found) return found
  }
  return null
}
