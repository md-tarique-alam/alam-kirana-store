import React, { useState } from "react";
import ProductCard from "./ProductCard";
import products from "./products";

import productcategories from "./category";
import Categorycard from "./categorycard";
import Navbar from "./navbar";
import CartSidebar from "./CartSidebar";

function Home() {
  const [cart, setCart] = useState([]);
  console.log(cart);
  const[selectedCategory, setSelectedCategory]=useState("")
  const[search ,setSearch]=useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handlecart = (product) => {
    const exist = cart.find((item) => item.id === product.id);

    if (exist) {
      const updated = cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      );
      setCart(updated);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
      console.log(product.quantity);
    }
  };

  const handleincrease = (id) => {
    const updated = cart.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
    );
    setCart(updated);
  };

  const handledecrease = (id) => {
    const updated = cart
      .map((item) => {
        if (item.id === id) {
          if (item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return null;
        }
        return item;
      })
      .filter((item) => item !== null);
    setCart(updated);
  };

  const toogleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const removeItem = (id) => {
    const updatedcart = cart.filter((item) => item.id !== id);
    setCart(updatedcart);
  };

  const totalPrice = cart.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

 const filteredProducts = products.filter((product) =>
  product.name.toLowerCase().includes(search.toLowerCase())
);

// const filteredProducts=products.filter((product)=>product.categrory===)
//    setSelectedCategory(filteredProducts)

  return (
    <div>
      <Navbar toogleCart={toogleCart} cart={cart} search={search} setSearch={setSearch}/>

      <CartSidebar
        cart={cart}
        toogleCart={toogleCart}
        isCartOpen={isCartOpen}
        onDecrease={handledecrease}
        onIncrease={handleincrease}
        removeItem={removeItem}
        totalPrice={totalPrice}
      />

    
      <h1 className="text-3xl font-semibold flex justify-center mt-5 mb-5 ">
        Shop by Category
      </h1>
      <div className="text-md flex overflow-x-auto hide-scrollbar gap-3 ml-6 scroll-smooth snap-x">
        {productcategories.map((item) => (
          <Categorycard key={item.id} category={item} />
        ))}
      </div>
      <h1 className="text-3xl font-semibold flex justify-center mt-6 mb-6">
        All Products
      </h1>
      <div className="text-md grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 mx-25 bg-white">
        {filteredProducts.map((product) => {
          const exist = cart.find((item) => item.id === product.id);
          return (
            <ProductCard
              key={product.id}
              product={product}
              onAddcart={handlecart}
              onIncrease={handleincrease}
              onDecrease={handledecrease}
              exist={exist}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Home;
