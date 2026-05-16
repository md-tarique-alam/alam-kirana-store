import { useParams } from "react-router-dom";
import products from "../products";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";

function ProductPage() {
  const { id } = useParams();

  const filteredproduct = products.find((product) => product.id === Number(id));

  return (
    <div>
      <div className="w-full flex justify-between items-center p-6 px-8 bg-slate-200">
        <h2 className="text-xl font-semibold">
          {filteredproduct.name} 
        </h2>
        <Link to="/">Home</Link>
      </div>
      <div className="absolute top-1/2 ">
        <ProductCard product={filteredproduct} />
      </div>
    </div>
  );
}   
export default ProductPage;
