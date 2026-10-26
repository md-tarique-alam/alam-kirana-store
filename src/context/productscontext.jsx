import axios from "axios";
import { useEffect, useState, createContext } from "react";

export const productscontext = createContext();

function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      const res = await axios.get("https://alam-kirana-backend.onrender.com/products");
      setProducts(res.data);
    } catch(error){
      setError(error.response?.data?.message || "something went wrong");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    <div className="w-10 h-10 border-4 border-lime-200 border-t-lime-700 rounded-full animate-spin"></div>
          <p className="text-gray-500 font-medium">Loading products...</p>
      </div>
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  const categories = [...new Set(products.map((product) => product.category))];

  return (
    <div>
      <productscontext.Provider value={{ products, loading, error, categories }}>
        {children}
      </productscontext.Provider>
    </div>
  );
}

export default ProductsProvider;
