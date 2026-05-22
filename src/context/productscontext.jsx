import { createContext } from "react";
import axios from "axios";
import { useEffect, useState } from "react";

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
      const response = await axios.get("https://dummyjson.com/products");
      setProducts(response.data.products);
      console.log(response.data);
    } catch {
      setError("something went wrong");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <h2>loading...</h2>;
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
