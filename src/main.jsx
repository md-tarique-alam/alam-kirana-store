import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { useContext } from "react";
import CartProvider from "./context/cartcontext.jsx";
import ProductsProvider from "./context/productscontext.jsx";
import AuthProvider from "./context/Authcontext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ProductsProvider>
      <CartProvider>
        <AuthProvider>
        <App />
        </AuthProvider>
      </CartProvider>
    </ProductsProvider>
  </BrowserRouter>,
);
