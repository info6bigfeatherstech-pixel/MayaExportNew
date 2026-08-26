require("dotenv").config({ path: require("path").resolve(__dirname, "../.env") });
const dns = require("dns");
try { dns.setServers(["8.8.8.8", "8.8.4.4", "1.1.1.1"]); } catch (_) {}

const mongoose = require("mongoose");
const connectDB = require("../config/db");
const Category = require("../models/Category");
const Product = require("../models/Product");

const categories = [
  {
    name: "Garments",
    slug: "garments",
    description: "Premium clothing and apparel crafted to international buyer specifications.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80&fit=crop",
    subcategories: ["Shirt", "T-Shirt", "Polo", "Trousers", "Jacket"],
    status: "Active",
  },
  {
    name: "Fabrics",
    slug: "fabrics",
    description: "High-quality textile rolls and fabric materials for every application.",
    image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80&fit=crop",
    subcategories: ["Cotton Fabric", "Linen Fabric", "Denim Fabric", "Polyester Fabric"],
    status: "Active",
  },
  {
    name: "Footwear",
    slug: "footwear",
    description: "Premium shoes and footwear collections for global retail markets.",
    image: "/images/shoes2.jpg",
    subcategories: ["Loafers", "Sneakers", "Formal Shoes", "Sports Shoes"],
    status: "Active",
  },
  {
    name: "Home Textile",
    slug: "home-textile",
    description: "Bedsheets, towels, curtains, and cushions for home and hospitality.",
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80&fit=crop",
    subcategories: ["Bedsheet", "Towels", "Curtains", "Cushion Covers"],
    status: "Active",
  },
  {
    name: "Electronics & Appliances",
    slug: "electronics-appliances",
    description: "Modern electronic products and home appliances for global distribution.",
    image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=800&q=80&fit=crop",
    subcategories: ["Television", "Kitchen Appliance", "Home Appliance", "Consumer Electronics"],
    status: "Active",
  },
];

const allProducts = [
  // ─── GARMENTS ───────────────────────────────────────────────
  {
    displayId: "GE-001",
    name: "Premium Cotton Shirt",
    category: "Garments",
    productType: "Shirt",
    description: "Breathable premium cotton shirt engineered for international fashion markets and everyday tailoring.",
    details: "100% Combed Cotton, 120 GSM",
    colors: ["White", "Sky Blue", "Charcoal"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    moq: "500 Pieces",
    export: "Worldwide",
    image: "/images/products/shirt-cotton.png",
    status: "Active",
  },
  {
    displayId: "GE-002",
    name: "Oversized Casual T-Shirt",
    category: "Garments",
    productType: "T-Shirt",
    description: "Relaxed drop-shoulder tee in heavyweight jersey, built for contemporary streetwear labels.",
    details: "Heavyweight Cotton Jersey, 220 GSM",
    colors: ["Ecru", "Black", "Sage"],
    sizes: ["S", "M", "L", "XL"],
    moq: "800 Pieces",
    export: "Worldwide",
    image: "/images/products/tshirt-oversized.png",
    status: "Active",
  },
  {
    displayId: "GE-003",
    name: "Men's Linen Shirt",
    category: "Garments",
    productType: "Shirt",
    description: "Lightweight European linen shirt with a soft hand-feel, ideal for resort and premium casual lines.",
    details: "100% Washed Linen",
    colors: ["Natural", "Olive", "Sand"],
    sizes: ["S", "M", "L", "XL"],
    moq: "400 Pieces",
    export: "Worldwide",
    image: "/images/products/shirt-linen.png",
    status: "Active",
  },
  {
    displayId: "GE-004",
    name: "Premium Polo Shirt",
    category: "Garments",
    productType: "Polo",
    description: "Structured piqué polo with a clean placket and reinforced collar for retail and corporate wear.",
    details: "Cotton Piqué, 200 GSM",
    colors: ["Navy", "White", "Burgundy"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    moq: "600 Pieces",
    export: "Worldwide",
    image: "/images/products/polo-premium.png",
    status: "Active",
  },
  {
    displayId: "GE-005",
    name: "Slim Fit Chino Trousers",
    category: "Garments",
    productType: "Trousers",
    description: "Mid-rise stretch chino trousers with a tailored leg, developed for modern menswear collections.",
    details: "Cotton Twill with Elastane",
    colors: ["Stone", "Navy", "Black"],
    sizes: ["28", "30", "32", "34", "36"],
    moq: "500 Pieces",
    export: "Worldwide",
    image: "/images/products/trouser-chino.png",
    status: "Active",
  },
  {
    displayId: "GE-006",
    name: "Structured Field Jacket",
    category: "Garments",
    productType: "Jacket",
    description: "Utility-inspired field jacket with a water-resistant finish and premium hardware detailing.",
    details: "Cotton Canvas, Coated",
    colors: ["Khaki", "Charcoal", "Forest"],
    sizes: ["S", "M", "L", "XL"],
    moq: "300 Pieces",
    export: "Worldwide",
    image: "/images/products/jacket-field.png",
    status: "Active",
  },
  {
    displayId: "GE-007",
    name: "Classic Oxford Shirt",
    category: "Garments",
    productType: "Shirt",
    description: "Timeless button-down oxford with a refined weave, suited to formal and business collections.",
    details: "Oxford Cotton, 140 GSM",
    colors: ["White", "Light Blue", "Pink"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    moq: "500 Pieces",
    export: "Worldwide",
    image: "/images/products/shirt-oxford.png",
    status: "Active",
  },
  {
    displayId: "GE-008",
    name: "Essential Crew T-Shirt",
    category: "Garments",
    productType: "T-Shirt",
    description: "Everyday crew-neck tee with a durable ribbed collar, a reliable basics program staple.",
    details: "Ring-Spun Cotton, 180 GSM",
    colors: ["White", "Black", "Grey Melange"],
    sizes: ["S", "M", "L", "XL"],
    moq: "1000 Pieces",
    export: "Worldwide",
    image: "/images/products/tshirt-crew.png",
    status: "Active",
  },

  // ─── FABRICS ─────────────────────────────────────────────────
  {
    displayId: "FB-001",
    name: "Premium Cotton Fabric",
    category: "Fabrics",
    productType: "Cotton Fabric",
    description: "High-quality woven cotton fabric developed for international apparel and home textile manufacturing.",
    details: "100% Combed Cotton, 120–180 GSM",
    colors: ["Natural White", "Ecru", "Custom Dyeing Available"],
    sizes: ["Width: 58-60 inches"],
    moq: "1000 Metres",
    export: "Worldwide",
    image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80&fit=crop",
    status: "Active",
  },
  {
    displayId: "FB-002",
    name: "Premium Linen Fabric",
    category: "Fabrics",
    productType: "Linen Fabric",
    description: "Breathable European-grade linen fabric ideal for premium apparel, resort wear, and home furnishings.",
    details: "100% Pure Linen",
    colors: ["Natural", "Bleached White", "Custom"],
    sizes: ["Width: 56-58 inches"],
    moq: "500 Metres",
    export: "Worldwide",
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80&fit=crop",
    status: "Active",
  },
  {
    displayId: "FB-003",
    name: "Premium Denim Fabric",
    category: "Fabrics",
    productType: "Denim Fabric",
    description: "Heavyweight selvedge denim fabric woven for premium denim garment manufacturers worldwide.",
    details: "100% Cotton Denim, 10–14 oz",
    colors: ["Indigo", "Black", "Raw"],
    sizes: ["Width: 60 inches"],
    moq: "2000 Metres",
    export: "Worldwide",
    image: "https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=800&q=80&fit=crop",
    status: "Active",
  },
  {
    displayId: "FB-004",
    name: "Polyester Blend Fabric",
    category: "Fabrics",
    productType: "Polyester Fabric",
    description: "Versatile poly-cotton blend fabric engineered for sportswear, uniform, and workwear programs.",
    details: "65% Polyester, 35% Cotton",
    colors: ["White", "Black", "Custom"],
    sizes: ["Width: 58 inches"],
    moq: "1000 Metres",
    export: "Worldwide",
    image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80&fit=crop&crop=top",
    status: "Active",
  },

  // ─── FOOTWEAR ─────────────────────────────────────────────────
  {
    displayId: "FT-001",
    name: "Premium Leather Loafers",
    category: "Footwear",
    productType: "Loafers",
    description: "Refined full-grain leather loafers developed for premium international footwear markets.",
    details: "Full-Grain Leather Upper, Leather Sole",
    colors: ["Tan", "Black", "Dark Brown"],
    sizes: ["UK 6–12"],
    moq: "300 Pairs",
    export: "Worldwide",
    image: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=800&q=80&fit=crop",
    status: "Active",
  },
  {
    displayId: "FT-002",
    name: "Casual Canvas Sneakers",
    category: "Footwear",
    productType: "Sneakers",
    description: "Lightweight canvas sneakers with a vulcanized sole, built for lifestyle and everyday casual wear.",
    details: "Canvas Upper, Rubber Sole",
    colors: ["White", "Black", "Navy"],
    sizes: ["UK 5–12"],
    moq: "500 Pairs",
    export: "Worldwide",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80&fit=crop",
    status: "Active",
  },
  {
    displayId: "FT-003",
    name: "Formal Leather Oxford",
    category: "Footwear",
    productType: "Formal Shoes",
    description: "Classic cap-toe oxford crafted in smooth leather, ideal for formal and business footwear collections.",
    details: "Smooth Calf Leather, Leather Sole",
    colors: ["Black", "Dark Brown"],
    sizes: ["UK 6–12"],
    moq: "250 Pairs",
    export: "Worldwide",
    image: "https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=800&q=80&fit=crop",
    status: "Active",
  },
  {
    displayId: "FT-004",
    name: "Sports Running Shoes",
    category: "Footwear",
    productType: "Sports Shoes",
    description: "High-performance running shoes with cushioned EVA midsole, engineered for sport and athleisure brands.",
    details: "Mesh Upper, EVA + Rubber Sole",
    colors: ["White/Blue", "Black/Red", "Grey"],
    sizes: ["UK 5–13"],
    moq: "600 Pairs",
    export: "Worldwide",
    image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800&q=80&fit=crop",
    status: "Active",
  },

  // ─── HOME TEXTILE ─────────────────────────────────────────────
  {
    displayId: "HT-001",
    name: "Premium Cotton Bedsheet",
    category: "Home Textile",
    productType: "Bedsheet",
    description: "400-thread-count cotton bedsheet set developed for premium hospitality and retail markets.",
    details: "100% Combed Cotton, 400 TC",
    colors: ["White", "Ivory", "Soft Grey"],
    sizes: ["Single", "Double", "King", "Super King"],
    moq: "500 Sets",
    export: "Worldwide",
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80&fit=crop",
    status: "Active",
  },
  {
    displayId: "HT-002",
    name: "Luxury Bath Towels",
    category: "Home Textile",
    productType: "Towels",
    description: "Plush zero-twist cotton bath towels with high absorbency, built for luxury hotel and retail programs.",
    details: "Zero-Twist Cotton, 600 GSM",
    colors: ["White", "Ivory", "Navy", "Grey"],
    sizes: ["Bath", "Hand", "Face"],
    moq: "1000 Pieces",
    export: "Worldwide",
    image: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=800&q=80&fit=crop",
    status: "Active",
  },
  {
    displayId: "HT-003",
    name: "Premium Blackout Curtains",
    category: "Home Textile",
    productType: "Curtains",
    description: "Room-darkening blackout curtains in premium woven fabric, suitable for hospitality and retail.",
    details: "Woven Polyester Blackout",
    colors: ["Charcoal", "Ivory", "Navy", "Taupe"],
    sizes: ["Custom width and drop"],
    moq: "300 Pairs",
    export: "Worldwide",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80&fit=crop",
    status: "Active",
  },
  {
    displayId: "HT-004",
    name: "Decorative Cushion Covers",
    category: "Home Textile",
    productType: "Cushion Covers",
    description: "Hand-finished decorative cushion covers in premium linen-cotton blend for home décor markets.",
    details: "Linen-Cotton Blend",
    colors: ["Natural", "Sage", "Dusty Pink", "Terracotta"],
    sizes: ["45x45 cm", "50x50 cm", "60x60 cm"],
    moq: "500 Pieces",
    export: "Worldwide",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80&fit=crop",
    status: "Active",
  },

  // ─── ELECTRONICS & APPLIANCES ─────────────────────────────────
  {
    displayId: "EA-001",
    name: "Smart LED Television",
    category: "Electronics & Appliances",
    productType: "Television",
    description: "4K UHD Smart LED TV with built-in streaming, voice control, and slim-bezel premium display.",
    details: "4K UHD, 43–75 inch range",
    colors: ["Black"],
    sizes: ["43\"", "55\"", "65\"", "75\""],
    moq: "100 Units",
    export: "Worldwide",
    image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800&q=80&fit=crop",
    status: "Active",
  },
  {
    displayId: "EA-002",
    name: "Electric Stand Mixer",
    category: "Electronics & Appliances",
    productType: "Kitchen Appliance",
    description: "Professional-grade electric stand mixer with multiple speed settings, built for modern kitchens.",
    details: "Die-Cast Metal, 1000W Motor",
    colors: ["Matte Black", "Cream White", "Red"],
    sizes: ["5L Bowl"],
    moq: "200 Units",
    export: "Worldwide",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80&fit=crop",
    status: "Active",
  },
  {
    displayId: "EA-003",
    name: "Premium Air Purifier",
    category: "Electronics & Appliances",
    productType: "Home Appliance",
    description: "HEPA-grade air purifier with smart air quality sensor and whisper-quiet operation for home use.",
    details: "HEPA + Carbon Filter, 360° Airflow",
    colors: ["White", "Black"],
    sizes: ["Coverage: up to 50 m²"],
    moq: "150 Units",
    export: "Worldwide",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80&fit=crop&crop=entropy",
    status: "Active",
  },
  {
    displayId: "EA-004",
    name: "Wireless Noise-Cancelling Headphones",
    category: "Electronics & Appliances",
    productType: "Consumer Electronics",
    description: "Premium over-ear wireless headphones with active noise cancellation and 30-hour battery life.",
    details: "Bluetooth 5.2, ANC, 30hr Battery",
    colors: ["Midnight Black", "Champagne Gold", "Space Grey"],
    sizes: ["One Size"],
    moq: "300 Units",
    export: "Worldwide",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80&fit=crop",
    status: "Active",
  },
];

async function sync() {
  try {
    await connectDB();
    console.log("Connected to DB.");

    // Sync categories (upsert by name)
    const categoryMap = {};
    for (let i = 0; i < categories.length; i++) {
      const c = categories[i];
      let doc = await Category.findOne({ name: c.name });
      if (!doc) {
        doc = await Category.create({ displayId: `CAT-${1000 + i}`, ...c });
      } else {
        doc.description = c.description;
        doc.image = c.image;
        doc.subcategories = c.subcategories;
        doc.status = c.status;
        await doc.save();
      }
      categoryMap[c.name] = doc._id;
    }
    console.log("Synced all categories.");

    // Sync products (upsert by displayId)
    for (const p of allProducts) {
      const catId = categoryMap[p.category] || Object.values(categoryMap)[0];
      let doc = await Product.findOne({ displayId: p.displayId });
      if (!doc) {
        await Product.create({
          ...p,
          categoryId: catId,
          images: [p.image],
        });
      } else {
        doc.name = p.name;
        doc.category = p.category;
        doc.categoryId = catId;
        doc.productType = p.productType;
        doc.description = p.description;
        doc.details = p.details;
        doc.moq = p.moq;
        doc.export = p.export;
        doc.image = p.image;
        doc.images = [p.image];
        doc.colors = p.colors;
        doc.sizes = p.sizes;
        doc.status = p.status;
        await doc.save();
      }
    }
    console.log(`Synced all ${allProducts.length} products with exact displayIds.`);

    const count = await Product.countDocuments();
    console.log(`Total products now in MongoDB: ${count}`);
    process.exit(0);
  } catch (err) {
    console.error("Sync error:", err);
    process.exit(1);
  }
}

sync();
