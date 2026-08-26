import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import App from "./App.jsx"
import { ProductCatalogProvider } from "./catalog/ProductCatalog.jsx"
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ProductCatalogProvider><App /></ProductCatalogProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
