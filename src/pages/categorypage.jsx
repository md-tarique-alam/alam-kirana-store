import { Link, useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useContext } from "react";
import { productscontext } from "../context/productscontext";

function CategoryPage() {
  const { categoryName } = useParams();
  const { products } = useContext(productscontext);

  const filteredcategory = products.filter(
    (product) => product.category === categoryName
  );

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
          <h2 className="text-lg font-bold text-slate-900 sm:text-2xl">
            {categoryName} Products
          </h2>

          <Link to="/" className="text-sm font-semibold text-slate-600">
            ← Home
          </Link>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-3 py-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">
          {filteredcategory.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default CategoryPage;