import Container from "../common/Container.jsx"
import Button from "../common/Button.jsx"
import SectionHeading from "../common/SectionHeading.jsx"
import ProductSlider from "../products/ProductSlider.jsx"
import { useProductCatalog } from "../../catalog/ProductCatalog.jsx"

export default function FeaturedProducts() {
  const { products, loading } = useProductCatalog()
  return (
    <section className="border-y border-charcoal/10 bg-stone-50 py-24 md:py-32">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="What We Produce"
            title="Product Categories"
            subtitle="Garments, Fabrics, Footwear, Home Textile and Electronics for global buyers."
          />
          <div className="hidden md:block">
            <Button to="/products" variant="ghost" arrow>
              View All Products
            </Button>
          </div>
        </div>

        <div className="mt-14">
          {loading ? <p className="text-stone-500">Loading products…</p> : products.length ? <ProductSlider products={products.slice(0, 8)} /> : <p className="text-stone-500">No products available yet.</p>}
        </div>

        <div className="mt-10 md:hidden">
          <Button to="/products" variant="outline" arrow>
            View All Products
          </Button>
        </div>
      </Container>
    </section>
  )
}
