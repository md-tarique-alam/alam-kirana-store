import axios from "axios";

import { useState } from "react";

function AdminData() {
  const [formdata, setFormdata] = useState({
    name: "",
    price: "",
    unit: "",
    category: "",
    image: "",
    description: "",
    stock: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  async function addProduct() {
    console.log("AXIOS STARTED");

     setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/products", formdata);

      setSuccess("Product Added Successfully ✅");

      setFormdata({
        name: "",
        price: "",
        unit: "",
        category: "",
        image: "",
        description: "",
        stock: "",
      });

      setTimeout(() => {
        setSuccess("");
      }, 3000);

      console.log(res.data);
    } catch (error) {
      setSuccess("");
      setError(error.response?.data?.message || "Something went wrong");
      
      setTimeout(() => {
      setError("");
      }, 3000);

    } finally {
      setLoading(false);
    }
  };

  const handlesubmit = (e) => {
    console.log("form submitted");
    console.log("BUTTON CLICKED");
    e.preventDefault();
    addProduct();
  };

  return (
    <div>
      <h2>Add Products</h2>
      {success && <h1>{success}</h1>}
      {error && <h1>{error}</h1>}
      <form onSubmit={handlesubmit}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          value={formdata.name}
          onChange={(e) => setFormdata({ ...formdata, name: e.target.value })}
          placeholder="Product name"
        />

        <label htmlFor="price">Price</label>
        <input
          id="price"
          type="text"
          value={formdata.price}
          onChange={(e) => setFormdata({ ...formdata, price: e.target.value })}
          placeholder="price"
        />

        <label htmlFor="name">Unit</label>
        <input
          id="unit"
          type="number"
          value={formdata.unit}
          onChange={(e) => setFormdata({ ...formdata, unit: e.target.value })}
          placeholder="unit"
        />

        <label htmlFor="category">Category</label>
        <input
          id="category"
          type="text"
          value={formdata.category}
          onChange={(e) =>
            setFormdata({ ...formdata, category: e.target.value })
          }
          placeholder="category"
        />

        <label htmlFor="image">Image</label>
        <input
          id="image"
          type="text"
          value={formdata.image}
          onChange={(e) => setFormdata({ ...formdata, image: e.target.value })}
          placeholder="image"
        />

        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          type="text"
          row={4}
          value={formdata.description}
          onChange={(e) =>
            setFormdata({ ...formdata, description: e.target.value })
          }
          placeholder="description"
        />

        <label htmlFor="stock">Stock</label>
        <input
          id="stock"
          type="number"
          value={formdata.stock}
          onChange={(e) => setFormdata({ ...formdata, stock: e.target.value })}
          placeholder="stock"
        />

        <button type="submit">{loading ? "saving..."  : "Save Product"}</button>
      </form>
    </div>
  );
}
export default AdminData;
