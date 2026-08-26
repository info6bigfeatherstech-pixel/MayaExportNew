import { Routes, Route, useLocation } from "react-router-dom"
import Navbar from "./components/layout/Navbar.jsx"
import Footer from "./components/layout/Footer.jsx"
import ScrollToTop from "./components/common/ScrollToTop.jsx"
import Home from "./pages/Home.jsx"
import Products from "./pages/Products.jsx"
import ProductDetails from "./pages/ProductDetails.jsx"
import About from "./pages/About.jsx"
import GarmentGenderPage from "./pages/GarmentGenderPage.jsx"
import GarmentSubcategoryPage from "./pages/GarmentSubcategoryPage.jsx"
import GarmentProductDetail from "./pages/GarmentProductDetail.jsx"
import FabricSubcategoryPage from "./pages/FabricSubcategoryPage.jsx"
import FabricProductDetail from "./pages/FabricProductDetail.jsx"
import HomeTextileSubcategoryPage from "./pages/HomeTextileSubcategoryPage.jsx"
import HomeTextileProductDetail from "./pages/HomeTextileProductDetail.jsx"
import ElectronicsSubcategoryPage from "./pages/ElectronicsSubcategoryPage.jsx"
import ElectronicsProductDetail from "./pages/ElectronicsProductDetail.jsx"
import FootwearGenderPage from "./pages/FootwearGenderPage.jsx"
import FootwearSubcategoryPage from "./pages/FootwearSubcategoryPage.jsx"
import FootwearProductDetail from "./pages/FootwearProductDetail.jsx"

import OurTeam from "./pages/OurTeam.jsx"
import TradeEvents from "./pages/TradeEvents.jsx"
import Career from "./pages/Career.jsx"
import Contact from "./pages/Contact.jsx"
import AdminDashboard from "./pages/AdminPanel.jsx"

export default function App() {
  const location = useLocation()
  const isAdmin = location.pathname.startsWith("/admin")

  if (isAdmin) {
    return (
      <>
        <ScrollToTop />
        <Routes><Route path="/admin/*" element={<AdminDashboard />} /></Routes>
      </>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />

          {/* ── Garment hierarchy (must be above /products/:id) ── */}
          <Route
            path="/products/garments/:gender"
            element={<GarmentGenderPage />}
          />
          <Route
            path="/products/garments/:gender/:subcategory"
            element={<GarmentSubcategoryPage />}
          />
          <Route
            path="/products/garments/:gender/:subcategory/:id"
            element={<GarmentProductDetail />}
          />

          {/* ── Footwear hierarchy (must be above /products/:id) ── */}
          <Route
            path="/products/footwear/:gender"
            element={<FootwearGenderPage />}
          />
          <Route
            path="/products/footwear/:gender/:subcategory"
            element={<FootwearSubcategoryPage />}
          />
          <Route
            path="/products/footwear/:gender/:subcategory/:id"
            element={<FootwearProductDetail />}
          />

          {/* ── Fabric hierarchy ── */}
          <Route
            path="/products/fabrics/:subcategory"
            element={<FabricSubcategoryPage />}
          />
          <Route
            path="/products/fabrics/:subcategory/:id"
            element={<FabricProductDetail />}
          />

          {/* ── Home Textile hierarchy ── */}
          <Route
            path="/products/home-textile/:subcategory"
            element={<HomeTextileSubcategoryPage />}
          />
          <Route
            path="/products/home-textile/:subcategory/:id"
            element={<HomeTextileProductDetail />}
          />

          {/* ── Electronics & Appliances hierarchy ── */}
          <Route
            path="/products/electronics/:subcategory"
            element={<ElectronicsSubcategoryPage />}
          />
          <Route
            path="/products/electronics/:subcategory/:id"
            element={<ElectronicsProductDetail />}
          />

          {/* Existing flat product detail */}
          <Route path="/products/:id" element={<ProductDetails />} />

          <Route path="/about" element={<About />} />
          <Route path="/our-team" element={<OurTeam />} />
          <Route path="/trade-events" element={<TradeEvents />} />
          <Route path="/career" element={<Career />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
