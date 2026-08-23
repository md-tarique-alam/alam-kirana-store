import React, { useContext, useState } from "react";
import ProductCard from "./components/ProductCard";
import { productscontext } from "./context/productscontext";
import Categorycard from "./components/categorycard";
import { useOutletContext } from "react-router-dom";



function Home() {
  
  const {products, categories}=useContext(productscontext);
  const {search}=useOutletContext();

  const filteredProducts = products.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div>
      <h1 className="text-3xl font-semibold flex justify-center mt-5 mb-5 ">
        Shop by Category
      </h1>
      <div className="text-md flex overflow-x-auto hide-scrollbar gap-3 ml-6 scroll-smooth snap-x">
        
        {categories.map((category) => (
          <Categorycard key={category} category={category} />
        ))}
      </div>
      <h1 className="text-3xl font-semibold flex justify-center mt-6 mb-6">
        All Products
      </h1>

      <div className="text-md grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 mx-25 bg-white">
        {filteredProducts.map((product) => {
          return <ProductCard key={product.id} product={product} />;
        })}
      </div>
    </div>
  );
}

export default Home;
