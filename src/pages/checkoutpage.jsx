import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import OrderPlaced from "./orderplaced";
import { cartcontext } from "../context/cartcontext";

function Checkout() {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    pincode: "",
    landmark: "",
    mobilenumber: "",
  });
  const { cart, totalPrice, ClearCart } = useContext(cartcontext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
    !formData.name ||
    !formData.address ||
    !formData.city ||
    !formData.landmark ||
    !formData.pincode ||
    !formData.mobilenumber
  ) {
    alert("Please fill all fields");
    return;
  }
    if (formData.mobilenumber.length !== 10) {
      alert("Please enter a valid 10 digit mobile number");
      return;
    }
    ClearCart();

    navigate("/orderplaced");
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white rounded-2xl shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Delivery Details
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Full Name
              </label>

              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value,
                  })
                }
                placeholder="Your Name"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-lime-500"
              />
            </div>

            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Address
              </label>

              <textarea
                id="address"
                rows={4}
                value={formData.address}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    address: e.target.value,
                  })
                }
                placeholder="House No / Area / Locality"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-lime-500"
              />
            </div>

            <div>
              <label
                htmlFor="landmark"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Landmark
              </label>

              <input
                id="landmark"
                type="text"
                value={formData.landmark}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    landmark: e.target.value,
                  })
                }
                placeholder="Nearby Landmark"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-lime-500"
              />
            </div>

            <div>
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                City
              </label>

              <input
                id="city"
                type="text"
                value={formData.city}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    city: e.target.value,
                  })
                }
                placeholder="City"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-lime-500"
              />
            </div>

            <div>
              <label
                htmlFor="pincode"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Pincode
              </label>

              <input
                id="pincode"
                type="text"
                value={formData.pincode}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    pincode: e.target.value,
                  })
                }
                placeholder="Pincode"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-lime-500"
              />
            </div>

            <div>
              <label
                htmlFor="mobile"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Mobile Number
              </label>

              <input
                id="mobile"
                type="tel"
                value={formData.mobilenumber}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    mobilenumber: e.target.value,
                  })
                }
                placeholder="Mobile Number"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-lime-500"
              />
            </div>

            <button
              type="submit"
              className="bg-lime-700 hover:bg-lime-800 text-white py-3 rounded-lg font-semibold transition duration-200 cursor-pointer"
            >
              Place Order
            </button>
          </form>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 h-fit sticky top-24">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Order Summary
          </h2>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Total Items</span>
              <span>{cart.length}</span>
            </div>

            <div className="border-t pt-4 flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>₹{totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Checkout;
