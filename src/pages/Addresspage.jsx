import axios from "axios";
import { useEffect, useState } from "react";

function Address() {
  const emptyForm = {
    name: "",
    address: "",
    city: "",
    pincode: "",
    landmark: "",
    mobilenumber: "",
  };

  const [addresses, setAddresses] = useState([]);
  const [formData, setFormData] = useState(emptyForm);
  const [editingFormId, setEditingFormId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAddress();
  }, []);

  async function getAddress() {
    try {
      setLoading(true);
      setError("");

      const res = await axios.get("http://localhost:5000/address", {
        withCredentials: true,
      });

      setAddresses(res.data);
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  function handleFormEdit(address) {
    setFormData({
      name: address.name || "",
      address: address.address || "",
      city: address.city || "",
      pincode: address.pincode || "",
      landmark: address.landmark || "",
      mobilenumber: address.mobilenumber || "",
    });

    setEditingFormId(address._id);

    setShowForm(true);

    setError("");
  }

  function handleAddAddress() {
    setFormData(emptyForm);

    setEditingFormId(null);

    setShowForm(true);

    setError("");
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");

      if (editingFormId) {
        const res = await axios.patch(
          `http://localhost:5000/address/${editingFormId}/update`,
          formData,
          {
            withCredentials: true,
          },
        );

        const updatedAddress = res.data.address;

        setAddresses((prevAddresses) =>
          prevAddresses.map((address) =>
            address._id === updatedAddress._id ? updatedAddress : address,
          ),
        );
      } else {
        const res = await axios.post(
          "http://localhost:5000/address/add",
          formData,
          {
            withCredentials: true,
          },
        );

        const newAddress = res.data.address;

        setAddresses((prevAddresses) => [...prevAddresses, newAddress]);
      }

      setFormData(emptyForm);

      setEditingFormId(null);

      setShowForm(false);
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
    }
  }

  async function deleteAddress(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this address?",
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      await axios.delete(`http://localhost:5000/address/${id}/delete`, {
        withCredentials: true,
      });

      setAddresses((prevAddresses) =>
        prevAddresses.filter((address) => address._id !== id),
      );
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
    }
  }

  function handleCancelForm() {
    setFormData(emptyForm);

    setEditingFormId(null);

    setShowForm(false);

    setError("");
  }

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-6 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
              My Addresses
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Manage your saved delivery addresses
            </p>
          </div>

          {!showForm && (
            <button
              onClick={handleAddAddress}
              className="w-full rounded-lg bg-lime-700 px-5 py-3 text-sm font-semibold text-white shadow-sm cursor-pointer transition hover:bg-lime-800 hover:shadow-md sm:w-auto"
            >
              + Add New Address
            </button>
          )}
        </div>

        {error && (
          <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {error}
          </div>
        )}

        {showForm ? (
          <div className="mx-auto max-w-3xl rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            <div className="mb-6 border-b border-slate-200 pb-5">
              <h2 className="text-xl font-semibold text-slate-900">
                {editingFormId ? "Edit Address" : "Add New Address"}
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {editingFormId
                  ? "Update your delivery address details."
                  : "Add an address for faster checkout."}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-1.5 block text-sm font-medium text-slate-700"
                  >
                    Full Name
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-lime-600 focus:ring-2 focus:ring-lime-100"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="mobilenumber"
                    className="mb-1.5 block text-sm font-medium text-slate-700"
                  >
                    Mobile Number
                  </label>

                  <input
                    id="mobilenumber"
                    name="mobilenumber"
                    type="tel"
                    value={formData.mobilenumber}
                    onChange={handleChange}
                    placeholder="Enter mobile number"
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-lime-600 focus:ring-2 focus:ring-lime-100"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="address"
                  className="mb-1.5 block text-sm font-medium text-slate-700"
                >
                  Complete Address
                </label>

                <textarea
                  id="address"
                  name="address"
                  rows="4"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="House no., street, area..."
                  className="w-full resize-none rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-lime-600 focus:ring-2 focus:ring-lime-100"
                  required
                />
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="city"
                    className="mb-1.5 block text-sm font-medium text-slate-700"
                  >
                    City
                  </label>

                  <input
                    id="city"
                    name="city"
                    type="text"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Enter city"
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-lime-600 focus:ring-2 focus:ring-lime-100"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="pincode"
                    className="mb-1.5 block text-sm font-medium text-slate-700"
                  >
                    Pincode
                  </label>

                  <input
                    id="pincode"
                    name="pincode"
                    type="text"
                    value={formData.pincode}
                    onChange={handleChange}
                    placeholder="Enter pincode"
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-lime-600 focus:ring-2 focus:ring-lime-100"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="landmark"
                  className="mb-1.5 block text-sm font-medium text-slate-700"
                >
                  Landmark
                  <span className="ml-1 text-xs font-normal text-slate-400">
                    (Optional)
                  </span>
                </label>

                <input
                  id="landmark"
                  name="landmark"
                  type="text"
                  value={formData.landmark}
                  onChange={handleChange}
                  placeholder="Nearby landmark"
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-lime-600 focus:ring-2 focus:ring-lime-100"
                />
              </div>

              <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={handleCancelForm}
                  className="w-full rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 cursor-pointer transition hover:bg-slate-50 sm:w-auto"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="w-full rounded-lg bg-lime-700 px-6 py-3 text-sm font-semibold text-white shadow-sm cursor-pointer transition hover:bg-lime-800 hover:shadow-md sm:w-auto"
                >
                  {editingFormId ? "Update Address" : "Save Address"}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div>
            {addresses.length === 0 ? (
              <div className="mx-auto max-w-xl rounded-xl border border-dashed border-slate-300 bg-white px-5 py-12 text-center shadow-sm">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-lime-100 text-2xl">
                  📍
                </div>

                <h2 className="text-xl font-semibold text-slate-900">
                  No saved addresses
                </h2>

                <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
                  Add your delivery address so you don't have to enter it again
                  every time you place an order.
                </p>

                <button
                  onClick={handleAddAddress}
                  className="mt-6 rounded-lg bg-lime-700 px-6 py-3 text-sm font-semibold text-white shadow-sm cursor-pointer transition hover:bg-lime-800 hover:shadow-md"
                >
                  + Add Your First Address
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {addresses.map((address) => (
                  <div
                    key={address._id}
                    className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-lime-300 hover:shadow-md"
                  >
                    <div className="mb-4 flex items-start justify-between gap-3 border-b border-slate-100 pb-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-lime-100 text-lg">
                          📍
                        </div>

                        <div>
                          <h3 className="font-semibold text-slate-900">
                            {address.name}
                          </h3>

                          <p className="text-xs text-slate-500">
                            Delivery Address
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2.5 text-sm">
                      <p className="leading-6 text-slate-700">
                        {address.address}
                      </p>

                      <p className="text-slate-600">
                        {address.city} - {address.pincode}
                      </p>

                      {address.landmark && (
                        <p className="text-slate-500">
                          <span className="font-medium text-slate-700">
                            Landmark:
                          </span>{" "}
                          {address.landmark}
                        </p>
                      )}

                      <p className="text-slate-600">
                        <span className="font-medium text-slate-700">
                          Mobile:
                        </span>{" "}
                        {address.mobilenumber}
                      </p>
                    </div>

                    <div className="mt-5 flex flex-col gap-2 border-t border-slate-100 pt-4 sm:flex-row">
                      <button
                        onClick={() => handleFormEdit(address)}
                        className="flex-1 rounded-lg border border-lime-600 px-4 py-2.5 text-sm font-semibold text-lime-700 cursor-pointer transition hover:bg-lime-50"
                      >
                        Edit Address
                      </button>

                      <button
                        onClick={() => deleteAddress(address._id)}
                        className="flex-1 rounded-lg border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 cursor-pointer transition hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Address;
