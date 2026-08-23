import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Updatepage = () => {

    const [updateForm, setUpdateForm]=useState({
    name: "",
    price: "",
    unit: "",
    category: "",
    image: "",
    description: "",
    stock: "",
    });

    const[error, setError]=useState("");
    const[loading, setLoading]=useState(false);
    const[success, setSuccess]=useState("");

    const navigate=useNavigate();
    const {id} =useParams();

    useEffect(()=>{
        getProduct();
    },[id]);
 
  async function getProduct(){
    const res=await axios.get(`http://localhost:5000/products/${id}`)
    setUpdateForm(res.data);
    };

    async function updateProduct(){

      setLoading(true);

      try{
      await axios.put(`http://localhost:5000/products/${id}`, updateForm);
     setSuccess("product updated successfully");
     setTimeout(() => {
      setSuccess("");
     },2000);
     setTimeout(() => {
      navigate("/admin/products");
     }, 2000);
     
      }
      catch(error){
        setSuccess("");
        setError(error.response?.data?.message || "product not saved");
      }
      finally{
        setLoading(false);
      }
    };

    function handlesubmit(e){
      e.preventDefault();
      updateProduct();
    };

  return (
    <div>
      <h1>update product</h1>

      {error && <h1>{error}</h1>};
      {success && <h1>{success}</h1>}

   <form onSubmit={handlesubmit}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          value={updateForm.name}
          onChange={(e) => setUpdateForm({ ...updateForm, name: e.target.value })}
          placeholder="Product name"
        />

        <label htmlFor="price">Price</label>
        <input
          id="price"
          type="text"
          value={updateForm.price}
          onChange={(e) => setUpdateForm({ ...updateForm, price: e.target.value })}
          placeholder="price"
        />

        <label htmlFor="name">Unit</label>
        <input
          id="unit"
          type="number"
          value={updateForm.unit}
          onChange={(e) => setUpdateForm({ ...updateForm, unit: e.target.value })}
          placeholder="unit"
        />

        <label htmlFor="category">Category</label>
        <input
          id="category"
          type="text"
          value={updateForm.category}
          onChange={(e) =>
            setUpdateForm({ ...updateForm, category: e.target.value })
          }
          placeholder="category"
        />

        <label htmlFor="image">Image</label>
        <input
          id="image"
          type="text"
          value={updateForm.image}
          onChange={(e) => setUpdateForm({ ...updateForm, image: e.target.value })}
          placeholder="image"
        />

        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          type="text"
          row={4}
          value={updateForm.description}
          onChange={(e) =>
            setUpdateForm({ ...updateForm, description: e.target.value })
          }
          placeholder="description"
        />

        <label htmlFor="stock">Stock</label>
        <input
          id="stock"
          type="number"
          value={updateForm.stock}
          onChange={(e) => setUpdateForm({ ...updateForm, stock: e.target.value })}
          placeholder="stock"
        />

        <button type="submit">{loading ? "saving..."  : "Update Product"}</button>
      </form>

    </div>
  )
}

export default Updatepage;