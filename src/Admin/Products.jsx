import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  HiOutlinePencilSquare,
  HiOutlineTrash,
  HiOutlinePlus,
  HiOutlineCube,
} from "react-icons/hi2";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts() {
    try {
      setError("");

      const res = await axios.get("http://localhost:5000/products");

      setProducts(res.data);
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
    }
  }

  const removeProduct = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (!confirmed) {
      return;
    }
    try {
      await axios.delete(`http://localhost:5000/products/${id}`, {
        withCredentials: true,
      });

      const updated = products.filter((item) => item._id !== id);

      setProducts(updated);
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
    }
  };

  const updateProduct = (id) => {
    navigate(`/admin/products/${id}/edit`);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <p className="text-sm font-medium text-lime-700 mb-1">
            PRODUCT MANAGEMENT
          </p>

          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
            All Products
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            Manage your store products, prices and stock.
          </p>
        </div>

        <button
          onClick={() => navigate("/admin/addproduct")}
          className="flex items-center justify-center gap-2 bg-lime-700 hover:bg-lime-800 text-white px-5 py-3 rounded-xl font-semibold transition cursor-pointer shadow-sm"
        >
          <HiOutlinePlus className="text-lg" />
          Add Product
        </button>
      </div>

      {error && (
        <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="bg-white border border-slate-200 rounded-xl px-4 py-3 mb-5 flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-lime-100 text-lime-700 flex items-center justify-center">
          <HiOutlineCube className="text-xl" />
        </div>

        <div>
          <p className="text-xs text-slate-500">Total Products</p>

          <h2 className="text-lg font-bold text-slate-800">
            {products.length}
          </h2>
        </div>
      </div>

      <div className="hidden lg:block bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="grid grid-cols-[2.5fr_1.5fr_1fr_1fr_1fr_1.2fr] gap-4 px-6 py-4 bg-slate-50 border-b border-slate-200 text-xs font-semibold uppercase tracking-wide text-slate-500">
          <div>Product</div>
          <div>Category</div>
          <div>Price</div>
          <div>Unit</div>
          <div>Stock</div>
          <div className="text-right">Actions</div>
        </div>

        {products.length === 0 ? (
          <div className="py-16 text-center text-slate-500">
            No products available.
          </div>
        ) : (
          products.map((product) => (
            <div
              key={product._id}
              className="grid grid-cols-[2.5fr_1.5fr_1fr_1fr_1fr_1.2fr] gap-4 px-6 py-4 items-center border-b border-slate-100 last:border-b-0 hover:bg-slate-50 transition"
            >
              {/* Product */}
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-14 h-14 bg-slate-50 border border-slate-100 rounded-xl overflow-hidden flex-shrink-0">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain p-1"
                  />
                </div>

                <div className="min-w-0">
                  <h2 className="font-semibold text-slate-800 truncate">
                    {product.name}
                  </h2>

                  <p className="text-xs text-slate-500 mt-1 truncate">
                    {product.description || "No description"}
                  </p>
                </div>
              </div>

              <div>
                <span className="inline-flex bg-lime-50 text-lime-700 px-3 py-1 rounded-full text-xs font-medium">
                  {product.category}
                </span>
              </div>

              <div className="font-semibold text-slate-800">
                ₹{product.price}
              </div>

              <div className="text-sm text-slate-600">{product.unit}</div>

              <div>
                <span
                  className={`text-sm font-medium ${
                    product.stock > 0 ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {product.stock > 0
                    ? `${product.stock} in stock`
                    : "Out of stock"}
                </span>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => updateProduct(product._id)}
                  className="w-9 h-9 rounded-lg border border-slate-200 text-slate-600 hover:bg-lime-50 hover:text-lime-700 hover:border-lime-200 flex items-center justify-center transition cursor-pointer"
                  title="Edit Product"
                >
                  <HiOutlinePencilSquare className="text-lg" />
                </button>

                <button
                  onClick={() => removeProduct(product._id)}
                  className="w-9 h-9 rounded-lg border border-slate-200 text-slate-600 hover:bg-red-50 hover:text-red-600 hover:border-red-200 flex items-center justify-center transition cursor-pointer"
                  title="Delete Product"
                >
                  <HiOutlineTrash className="text-lg" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="lg:hidden space-y-3">
        {products.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl py-14 text-center text-slate-500">
            No products available.
          </div>
        ) : (
          products.map((product) => (
            <div
              key={product._id}
              className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm"
            >
              <div className="flex gap-4">
                <div className="w-20 h-20 bg-slate-50 border border-slate-100 rounded-xl overflow-hidden flex-shrink-0">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain p-1"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between gap-3">
                    <div className="min-w-0">
                      <h2 className="font-semibold text-slate-800 truncate">
                        {product.name}
                      </h2>

                      <p className="text-xs text-slate-500 mt-1">
                        {product.category}
                      </p>
                    </div>

                    <p className="font-bold text-slate-800 whitespace-nowrap">
                      ₹{product.price}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 mt-3 text-xs">
                    <span className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md">
                      {product.unit}
                    </span>

                    <span
                      className={
                        product.stock > 0
                          ? "text-green-600 font-medium"
                          : "text-red-500 font-medium"
                      }
                    >
                      {product.stock > 0
                        ? `${product.stock} in stock`
                        : "Out of stock"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-4 pt-3 border-t border-slate-100">
                <button
                  onClick={() => updateProduct(product._id)}
                  className="flex-1 flex items-center justify-center gap-2 border border-lime-200 text-lime-700 bg-lime-50 hover:bg-lime-100 py-2.5 rounded-xl font-medium text-sm transition cursor-pointer"
                >
                  <HiOutlinePencilSquare />
                  Edit
                </button>

                <button
                  onClick={() => removeProduct(product._id)}
                  className="flex-1 flex items-center justify-center gap-2 border border-red-200 text-red-600 bg-red-50 hover:bg-red-100 py-2.5 rounded-xl font-medium text-sm transition cursor-pointer"
                >
                  <HiOutlineTrash />
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AllProducts;
