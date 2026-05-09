import React, { useState } from "react";
import ProductCard from "./ProductCard";
import products from "./products";

import productcategories from "./category";
import Categorycard from "./categorycard";

function Home() {
  const [cart, setCart] = useState([]);
  console.log(cart);

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

  return (
    <div>
      <h1 className="text-3xl font-semibold flex justify-center ">
        Shop by Category
      </h1>
      <div className="text-md grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-2 ">
        {productcategories.map((item) => (
          <Categorycard key={item.id} category={item} />
        ))}
      </div>
      <h1 className="text-3xl font-semibold flex justify-center mb-4">
        All Products
      </h1>
      <div className="text-md grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 mx-25 bg-white">
        {products.map((product) => {

       const exist=cart.find((item)=>item.id===product.id);
         return(
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
