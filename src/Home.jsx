import React, { useContext, useState } from "react";
import ProductCard from "./components/ProductCard";
import { productscontext } from "./context/productscontext";
import CategoryCard from "./components/categorycard";
import { useOutletContext } from "react-router-dom";



function Home() {
  
  const {products, categories}=useContext(productscontext);
  const {search}=useOutletContext();

  const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
 <div className="min-h-screen bg-slate-100 py-6">


  <section className="max-w-7xl mx-auto px-4">

    <h1 className="text-2xl sm:text-3xl font-semibold
                   text-center text-slate-800 mb-6">
      Shop by Category
    </h1>

    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6
                    gap-3 sm:gap-4 items-start">

      {categories.map((category) => (
        <CategoryCard
          key={category}
          category={category}
        />
      ))}

    </div>

  </section>


  <section className="max-w-7xl mx-auto px-4 mt-10">

    <h1 className="text-2xl sm:text-3xl font-semibold
                   text-center text-slate-800 mb-6">
      All Products
    </h1>

    <div className="grid grid-cols-2 sm:grid-cols-3
                    md:grid-cols-4 lg:grid-cols-6
                    gap-3 sm:gap-4">

      {filteredProducts.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
        />
      ))}

    </div>

  </section>

</div>
  );
}

export default Home;
