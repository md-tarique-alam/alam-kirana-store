import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Updatepage = () => {
  const [updateForm, setUpdateForm] = useState({
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

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getProduct();
  }, [id]);

  async function getProduct() {
    try {
      const res = await axios.get(`http://localhost:5000/products/${id}`);
      setUpdateForm(res.data);
    } catch (error) {
      setError(error.response?.data?.message || "Unable to load product");
    }
  }

  async function updateProduct() {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await axios.put(`http://localhost:5000/products/${id}`, updateForm, {
        withCredentials: true,
      });

      setSuccess("Product updated successfully");

      setTimeout(() => {
        setSuccess("");
        navigate("/admin/products");
      }, 1500);
    } catch (error) {
      setError(error.response?.data?.message || "Product not updated");
    } finally {
      setLoading(false);
    }
  }

  function handlesubmit(e) {
    e.preventDefault();
    updateProduct();
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Update Product
          </h1>

          <p className="text-sm sm:text-base text-gray-500 mt-1">
            Edit product information and keep your store catalog up to date.
          </p>
        </div>

        {error && (
          <div className="mb-5 flex items-center justify-between gap-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
            <p className="text-sm font-medium">{error}</p>

            <button
              type="button"
              onClick={() => setError("")}
              className="font-bold text-red-500 hover:text-red-700 cursor-pointer"
            >
              ✕
            </button>
          </div>
        )}

        {success && (
          <div className="mb-5 flex items-center justify-between gap-4 bg-lime-50 border border-lime-200 text-lime-800 px-4 py-3 rounded-xl">
            <p className="text-sm font-medium">{success}</p>

            <button
              type="button"
              onClick={() => setSuccess("")}
              className="font-bold text-lime-700 cursor-pointer"
            >
              ✕
            </button>
          </div>
        )}

        <form
          onSubmit={handlesubmit}
          className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden"
        >
          <div className="p-4 sm:p-6 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-800">Product Details</h2>

            <p className="text-sm text-gray-500 mt-1">
              Update the product information below.
            </p>
          </div>

          <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Product Name
                </label>

                <input
                  id="name"
                  type="text"
                  value={updateForm.name}
                  onChange={(e) =>
                    setUpdateForm({
                      ...updateForm,
                      name: e.target.value,
                    })
                  }
                  placeholder="Product name"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-lime-600 focus:ring-2 focus:ring-lime-100 transition"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label
                    htmlFor="price"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Price
                  </label>

                  <input
                    id="price"
                    type="number"
                    value={updateForm.price}
                    onChange={(e) =>
                      setUpdateForm({
                        ...updateForm,
                        price: e.target.value,
                      })
                    }
                    placeholder="Price"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-lime-600 focus:ring-2 focus:ring-lime-100 transition"
                  />
                </div>

                <div>
                  <label
                    htmlFor="unit"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Unit
                  </label>

                  <input
                    id="unit"
                    type="text"
                    value={updateForm.unit}
                    onChange={(e) =>
                      setUpdateForm({
                        ...updateForm,
                        unit: e.target.value,
                      })
                    }
                    placeholder="1 Kg / 500 g"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-lime-600 focus:ring-2 focus:ring-lime-100 transition"
                  />
                </div>

                <div>
                  <label
                    htmlFor="stock"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Stock
                  </label>

                  <input
                    id="stock"
                    type="number"
                    value={updateForm.stock}
                    onChange={(e) =>
                      setUpdateForm({
                        ...updateForm,
                        stock: e.target.value,
                      })
                    }
                    placeholder="Stock"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-lime-600 focus:ring-2 focus:ring-lime-100 transition"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Category
                </label>

                <select
                  id="category"
                  value={updateForm.category}
                  onChange={(e) =>
                    setUpdateForm({
                      ...updateForm,
                      category: e.target.value,
                    })
                  }
                  className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-lime-600 focus:ring-2 focus:ring-lime-100 cursor-pointer"
                >
                  <option value="">Select category</option>
                  <option value="Oil & Ghee">Oil & Ghee</option>
                  <option value="Daily Essentials">Daily Essentials</option>
                  <option value="Wheat & Pulses">Wheat & Pulses</option>
                  <option value="Dry Fruits">Dry Fruits</option>
                  <option value="Detergents">Detergents</option>
                  <option value="Sugar & Salt">Sugar & Salt</option>
                  <option value="Chips & Snacks">Chips & Snacks</option>
                  <option value="Tea, Coffee & Beverages">
                    Tea, Coffee & Beverages
                  </option>
                  <option value="Spices & Masalas">Spices & Masalas</option>
                  <option value="Cleaning Essentials">
                    Cleaning Essentials
                  </option>
                  <option value="Personal Care">Personal Care</option>
                  <option value="Baby Care">Baby Care</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="image"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Product Image URL
                </label>

                <input
                  id="image"
                  type="text"
                  value={updateForm.image}
                  onChange={(e) =>
                    setUpdateForm({
                      ...updateForm,
                      image: e.target.value,
                    })
                  }
                  placeholder="Paste product image URL"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-lime-600 focus:ring-2 focus:ring-lime-100 transition"
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Description
                </label>

                <textarea
                  id="description"
                  rows={5}
                  value={updateForm.description}
                  onChange={(e) =>
                    setUpdateForm({
                      ...updateForm,
                      description: e.target.value,
                    })
                  }
                  placeholder="Write a short product description"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm resize-none outline-none focus:border-lime-600 focus:ring-2 focus:ring-lime-100 transition"
                />
              </div>
            </div>

            <div className="lg:border-l lg:border-gray-100 lg:pl-6">
              <p className="text-sm font-semibold text-gray-700 mb-3">
                Image Preview
              </p>

              <div className="bg-slate-50 border border-gray-200 rounded-2xl p-4 sticky top-6">
                <div className="aspect-square bg-white rounded-xl overflow-hidden border border-gray-100 flex items-center justify-center">
                  {updateForm.image ? (
                    <img
                      src={updateForm.image}
                      alt={updateForm.name || "Product preview"}
                      className="w-full h-full object-contain p-3"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  ) : (
                    <div className="text-center px-4">
                      <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-lime-100 flex items-center justify-center">
                        <span className="text-xl">📦</span>
                      </div>

                      <p className="text-sm text-gray-500">
                        Image preview will appear here
                      </p>
                    </div>
                  )}
                </div>

                <div className="mt-4">
                  <p className="font-semibold text-gray-800 truncate">
                    {updateForm.name || "Product Name"}
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    {updateForm.category || "Category"}
                  </p>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                    <span className="font-bold text-gray-800">
                      ₹{updateForm.price || "0"}
                    </span>

                    <span className="text-xs font-medium bg-lime-100 text-lime-700 px-2.5 py-1 rounded-lg">
                      {updateForm.unit || "Unit"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100 bg-slate-50 p-4 sm:p-5 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate("/admin/products")}
              className="w-full sm:w-auto px-5 py-3 rounded-xl border border-gray-300 bg-white text-gray-700 font-semibold text-sm hover:bg-gray-50 cursor-pointer transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-lime-700 hover:bg-lime-800 disabled:bg-lime-400 text-white font-semibold text-sm cursor-pointer transition"
            >
              {loading ? "Updating..." : "Update Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Updatepage;
