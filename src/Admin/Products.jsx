import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [error, setError]=useState("");

  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts() {
    const res = await axios.get("http://localhost:5000/products");
    setProducts(res.data);
  }

  const navigate=useNavigate();

  const removeProduct = async(id) => {
    try{
      const res=await axios.delete(`http://localhost:5000/products/${id}`);
      const updated=products.filter((item)=>item._id!==id);
      setProducts(updated);
    }
    catch(error){
    setError(error.response?.data?.message || "something went wrong");
    }};

    const updateProduct=(id)=>{
      navigate(`/admin/updateproduct/${id}`);
    }

  return (
    <div>
      <h1>All Products</h1>

      {error && <h1>{error}</h1>}
      {products.map((product) => (
        <div key={product._id}>
            <img src={product.image} />
            <h1>{product.name}</h1>
            <p>price: {product.price}</p>
            <h2>Stock: {product.stock}</h2>
            <h2>Category: {product.category}</h2>
            <button onClick={() => removeProduct(product._id)}>
              Delete product
            </button>
            <button onClick={() => updateProduct(product._id)}>
              Update product
            </button>
        </div>
      ))};
    </div>
  );
};

export default AllProducts;
