import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import CategoryPage from "./pages/categorypage";
import { useState } from "react";
import Navbar from "./components/navbar";
import CartSidebar from "./components/CartSidebar";
import ProductPage from "./pages/productpage";
import Authpage from "./pages/Authpage";

function App() {
  const [search, setSearch] = useState("");

  return (
    <div>
      <Navbar search={search} setSearch={setSearch} />

      <CartSidebar />
      
      <Routes>
        <Route path="/" element={<Home search={search} />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route path="/product/:id" element={<ProductPage/>}/>
        <Route path="/login" element={<Authpage/>}/>
      </Routes>
    </div>
  );
}

export default App;
