import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import CategoryPage from "./pages/categorypage";
import { useState } from "react";
import Navbar from "./components/navbar";
import CartSidebar from "./components/CartSidebar";
import ProductPage from "./pages/productpage";
import Authpage from "./pages/Authpage";
import UpdateProfile from "./pages/UpdateProfile";
import Orders from "./pages/Orderspage";
import Address from "./pages/Addresspage";
import Checkout from "./pages/checkoutpage";
import ProtectedRoute from "./components/protectedroutes";
import OrderPlaced from "./pages/orderplaced";

function App() {
  const [search, setSearch] = useState("");

  return (
    <div>
      <Navbar search={search} setSearch={setSearch} />

      <CartSidebar />

      <Routes>
        <Route path="/" element={<Home search={search} />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/login" element={<Authpage />} />
        <Route
          path="/profile/edit"
          element={
            <ProtectedRoute>
              <UpdateProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/address"
          element={
            <ProtectedRoute>
              <Address />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />
        <Route path="/orderplaced" element={<OrderPlaced/>} />
      </Routes>
    </div>
  );
}

export default App;
