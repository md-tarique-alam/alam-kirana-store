import { Link, useParams } from "react-router-dom";
import products from "../products";
import ProductCard from "../components/ProductCard";

function CategoryPage() {
  const { categoryName } = useParams();

  const filteredcategory = products.filter(
    (item) => item.category === categoryName,
  );

  return (
    <div>
        <div className="w-full flex justify-between items-center p-6 px-8 bg-slate-200">
      <h2 className="text-xl font-semibold">{categoryName} products</h2>
      <Link to="/">Home</Link>
      </div>
      <div className="text-md grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 mx-25 bg-white mt-4">
        {filteredcategory.map((product) => {
          return <ProductCard key={product.id} product={product} />;
        })}
        
      </div>
    </div>
  );
}
export default CategoryPage;
