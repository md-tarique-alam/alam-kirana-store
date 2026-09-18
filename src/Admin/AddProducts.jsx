import axios from "axios";
import { useState } from "react";

function AdminData() {
  const [formdata, setFormdata] = useState({
    name: "",
    price: "",
    unit: "",
    category: "",
    description: "",
    stock: "",
  });

  const [image, setImage] = useState(null);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  async function addProduct() {
    setLoading(true);

    try {
      const data = new FormData();
      data.append("name", formdata.name);
      data.append("price", formdata.price);
      data.append("unit", formdata.unit);
      data.append("category", formdata.category);
      data.append("description", formdata.description);
      data.append("stock", formdata.stock);
      data.append("image", image);
      const res = await axios.post("http://localhost:5000/products", data, {
        withCredentials: true,
      });

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
      }, 8000);
    } catch (error) {
      setSuccess("");
      setError(error.response?.data?.message || "Something went wrong");

      setTimeout(() => {
        setError("");
      }, 3000);
    } finally {
      setLoading(false);
    }
  }

  const handlesubmit = (e) => {
    e.preventDefault();
    addProduct();
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6">
          <p className="text-sm font-medium text-lime-700">Admin Dashboard</p>

          <h1 className="mt-1 text-3xl font-semibold text-slate-900 sm:text-4xl">
            Add Product
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Add a new product to your Alam Kirana Store inventory.
          </p>
        </div>

        {success && (
          <div className="mb-5 rounded-xl border border-lime-200 bg-lime-50 px-4 py-3 text-sm font-medium text-lime-800">
            {success}
          </div>
        )}

        {error && (
          <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {error}
          </div>
        )}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <form onSubmit={handlesubmit} className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Product Information
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Enter the basic details of your product.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Product Name
                </label>

                <input
                  id="name"
                  type="text"
                  value={formdata.name}
                  onChange={(e) =>
                    setFormdata({
                      ...formdata,
                      name: e.target.value,
                    })
                  }
                  placeholder="e.g. Fortune Sunflower Oil"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-lime-500 focus:ring-2 focus:ring-lime-100"
                />
              </div>

              <div>
                <label
                  htmlFor="category"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Category
                </label>

                <select
                  id="category"
                  value={formdata.category}
                  onChange={(e) =>
                    setFormdata({
                      ...formdata,
                      category: e.target.value,
                    })
                  }
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
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
              <div>
                <label
                  htmlFor="price"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Price
                </label>

                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-500">
                    ₹
                  </span>

                  <input
                    id="price"
                    type="number"
                    value={formdata.price}
                    onChange={(e) =>
                      setFormdata({
                        ...formdata,
                        price: e.target.value,
                      })
                    }
                    placeholder="0"
                    className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-9 pr-4 text-sm text-slate-800 outline-none transition focus:border-lime-500 focus:ring-2 focus:ring-lime-100"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="unit"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Unit
                </label>

                <input
                  id="unit"
                  type="number"
                  value={formdata.unit}
                  onChange={(e) =>
                    setFormdata({
                      ...formdata,
                      unit: e.target.value,
                    })
                  }
                  placeholder="e.g. 1"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-lime-500 focus:ring-2 focus:ring-lime-100"
                />
              </div>

              <div>
                <label
                  htmlFor="stock"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Stock
                </label>

                <input
                  id="stock"
                  type="number"
                  value={formdata.stock}
                  onChange={(e) =>
                    setFormdata({
                      ...formdata,
                      stock: e.target.value,
                    })
                  }
                  placeholder="Available quantity"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-lime-500 focus:ring-2 focus:ring-lime-100"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Product Image
              </label>

              <label
                htmlFor="image"
                className="flex min-h-32 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-white px-4 py-5 text-center transition hover:border-lime-500 hover:bg-lime-50/30"
              >
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-lime-50 text-2xl">
                  📷
                </div>

                <p className="text-sm font-semibold text-slate-700">
                  Click to upload product image
                </p>

                <p className="mt-1 text-xs text-slate-500">JPG, PNG or WEBP</p>

                {image && (
                  <p className="mt-3 text-xs font-medium text-lime-600">
                    {image.name}
                  </p>
                )}
              </label>

              <input
                id="image"
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                className="hidden"
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Description
              </label>

              <textarea
                id="description"
                rows="5"
                value={formdata.description}
                onChange={(e) =>
                  setFormdata({
                    ...formdata,
                    description: e.target.value,
                  })
                }
                placeholder="Write a short description about the product..."
                className="w-full resize-none rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-lime-500 focus:ring-2 focus:ring-lime-100"
              />
            </div>

            <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:items-center sm:justify-end">
              <button
                type="button"
                onClick={() =>
                  setFormdata({
                    name: "",
                    price: "",
                    unit: "",
                    category: "",
                    image: "",
                    description: "",
                    stock: "",
                  })
                }
                className="w-full rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 sm:w-auto"
              >
                Clear
              </button>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-lime-700 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-lime-800 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                {loading ? "Saving..." : "Save Product"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminData;
