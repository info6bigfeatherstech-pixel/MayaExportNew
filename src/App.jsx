import { Routes, Route } from "react-router-dom"
import Navbar from "./components/layout/Navbar.jsx"
import Footer from "./components/layout/Footer.jsx"
import ScrollToTop from "./components/common/ScrollToTop.jsx"
import Home from "./pages/Home.jsx"
import Products from "./pages/Products.jsx"
import ProductDetails from "./pages/ProductDetails.jsx"
import About from "./pages/About.jsx"

import OurTeam from "./pages/OurTeam.jsx"
import TradeEvents from "./pages/TradeEvents.jsx"
import Career from "./pages/Career.jsx"
import Contact from "./pages/Contact.jsx"

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
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
