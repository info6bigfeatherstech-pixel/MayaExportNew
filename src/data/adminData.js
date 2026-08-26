import { categories as siteCategories } from "./categories.js"
import { products as siteProducts } from "./products.js"

// Local adapter for the admin UI. Replace these exports with API calls later;
// the dashboard components consume this normalized shape rather than hard-coded UI data.
export const initialCategories = siteCategories.map((category, index) => ({
  id: `cat-${index + 1}`,
  ...category,
  status: "Active",
  subcategories: [...new Set(siteProducts.filter((product) => product.category === category.name).map((product) => product.productType))],
}))

export const initialProducts = siteProducts.map((product, index) => ({
  ...product,
  categoryId: initialCategories.find((category) => category.name === product.category)?.id,
  status: index % 9 === 0 ? "Draft" : "Active",
  updatedAt: `${(index % 12) + 1} Aug 2026`,
  details: product.fabric,
  images: [product.image],
}))

export const initialCustomers = [
  { id: "CUS-1001", name: "Aarav Mehta", company: "Meridian Retail Ltd.", email: "aarav@meridianretail.com", phone: "+44 20 7946 0188", country: "United Kingdom", address: "85 Great Portland Street, London", notes: "Key menswear buyer. Prefers consolidated monthly shipments and requires pre-production samples.", orders: 4, spend: 42680, status: "Active", joined: "12 Mar 2025" },
  { id: "CUS-1002", name: "Sofia Romano", company: "Casa & Co.", email: "sofia@casaco.it", phone: "+39 02 9475 2200", country: "Italy", address: "Via Tortona 31, Milan", notes: "Hospitality textiles account. Follow up on their 2027 towel colour forecast in October.", orders: 3, spend: 28450, status: "Active", joined: "08 Jun 2025" },
  { id: "CUS-1003", name: "Ethan Williams", company: "Northstar Outfitters", email: "ethan@northstar.com", phone: "+1 212 555 0189", country: "United States", address: "195 Hudson Street, New York", notes: "Growing footwear buyer. Discuss west-coast distribution after first delivery.", orders: 2, spend: 18920, status: "Active", joined: "19 Jan 2026" },
  { id: "CUS-1004", name: "Lena Hoffmann", company: "Hoffmann Handels GmbH", email: "lena@hoffmann.de", phone: "+49 30 5550 7890", country: "Germany", address: "Friedrichstraße 155, Berlin", notes: "Needs OEKO-TEX documents attached to every fabric shipment.", orders: 1, spend: 9840, status: "Active", joined: "02 Jul 2026" },
  { id: "CUS-1005", name: "Noah Tan", company: "Pacific Market Group", email: "noah@pacificmarket.sg", phone: "+65 6123 8901", country: "Singapore", address: "10 Anson Road, Singapore", notes: "New prospect introduced at the Singapore trade event.", orders: 0, spend: 0, status: "Prospect", joined: "17 Aug 2026" },
]

export const initialOrders = [
  { id: "ORD-2087", customerId: "CUS-1001", customer: "Meridian Retail Ltd.", country: "United Kingdom", products: "Premium Cotton Shirt × 1,200", quantity: 1200, value: "$14,400", status: "Processing", date: "24 Aug 2026" },
  { id: "ORD-2086", customerId: "CUS-1002", customer: "Casa & Co.", country: "Italy", products: "Luxury Bath Towels × 850", quantity: 850, value: "$11,900", status: "Shipped", date: "22 Aug 2026" },
  { id: "ORD-2085", customerId: "CUS-1003", customer: "Northstar Outfitters", country: "United States", products: "Casual Canvas Sneakers × 600", quantity: 600, value: "$16,200", status: "Pending", date: "20 Aug 2026" },
  { id: "ORD-2084", customerId: "CUS-1004", customer: "Hoffmann Handels GmbH", country: "Germany", products: "Premium Linen Fabric × 700m", quantity: 700, value: "$8,750", status: "Delivered", date: "16 Aug 2026" },
  { id: "ORD-2083", customerId: "CUS-1001", customer: "Meridian Retail Ltd.", country: "United Kingdom", products: "Structured Field Jacket × 300", quantity: 300, value: "$12,300", status: "Cancelled", date: "12 Aug 2026" },
]

export const initialInquiries = [
  { id: "INQ-421", customerId: "CUS-1005", productId: "HT-003", name: "Noah Tan", company: "Pacific Market Group", product: "Premium Blackout Curtains", country: "Singapore", quantity: 1000, message: "Could you share a sample pack and a lead time for 1,000 pairs?", status: "New", date: "24 Aug 2026" },
  { id: "INQ-420", customerId: "CUS-1003", productId: "FT-001", name: "Ethan Williams", company: "Northstar Outfitters", product: "Premium Leather Loafers", country: "United States", quantity: 500, message: "Please quote for mixed color containers, including CIF Jebel Ali.", status: "In Progress", date: "23 Aug 2026" },
  { id: "INQ-419", customerId: "CUS-1002", productId: "HT-002", name: "Sofia Romano", company: "Casa & Co.", product: "Luxury Bath Towels", country: "Italy", quantity: 1200, message: "Interested in private-label towel sets for a spring collection.", status: "Contacted", date: "22 Aug 2026" },
]
