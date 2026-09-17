import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { cartcontext } from "../context/cartcontext";
import axios from "axios";

function Checkout() {
  const emptyForm = {
    name: "",
    address: "",
    city: "",
    pincode: "",
    landmark: "",
    mobilenumber: "",
  };

  const [formData, setFormData] = useState(emptyForm);

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const [showAddressForm, setShowAddressForm] = useState(false);
  const [saveAddress, setSaveAddress] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [orderLoading, setOrderLoading] = useState(false);

  const { cart, totalPrice, ClearCart } = useContext(cartcontext);
  const navigate = useNavigate();

  useEffect(() => {
    getAddresses();
  }, []);

  async function getAddresses() {
    setLoading(true);

    try {
      const res = await axios.get("http://localhost:5000/address", {
        withCredentials: true,
      });

      setAddresses(res.data);
    } catch (error) {
      setError(
        error.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  }

  const items = cart.map((item) => ({
    productId: item._id,
    quantity: item.quantity,
  }));

  
  function handleAddAddress() {
    setFormData(emptyForm);
    setSelectedAddress(null);
    setSaveAddress(false);
    setShowAddressForm(true);
    setError("");
  }

  function handleCancel() {
    setFormData(emptyForm);
    setSaveAddress(false);
    setShowAddressForm(false);
    setError("");
  }

  async function placeOrder(orderAddress) {
    try {
      setOrderLoading(true);
      setError("");

      await axios.post(
        "http://localhost:5000/orders",
        {
          items,
          address: orderAddress,
        },
        {
          withCredentials: true,
        }
      );

      ClearCart();

      navigate("/orderplaced");
    } catch (error) {
      setError(
        error.response?.data?.message || "Something went wrong"
      );
    } finally {
      setOrderLoading(false);
    }
  }

  async function handleFormSubmit(e) {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.address ||
      !formData.city ||
      !formData.pincode ||
      !formData.mobilenumber
    ) {
      setError("Please fill all required fields");
      return;
    }

    if (formData.mobilenumber.length !== 10) {
      setError("Please enter a valid 10 digit mobile number");
      return;
    }

    try {
      setOrderLoading(true);
      setError("");

      if (saveAddress) {
        await axios.post(
          "http://localhost:5000/address/add",
          formData,
          {
            withCredentials: true,
          }
        );
      }

      await axios.post(
        "http://localhost:5000/orders",
        {
          items,
          address: formData,
        },
        {
          withCredentials: true,
        }
      );

      ClearCart();

      navigate("/orderplaced");
    } catch (error) {
      setError(
        error.response?.data?.message || "Something went wrong"
      );
    } finally {
      setOrderLoading(false);
    }
  }

  function handleSavedAddressOrder() {
    if (!selectedAddress) {
      setError("Please select a delivery address");
      return;
    }

    placeOrder(selectedAddress);
  }

  if (loading) {
    return <h2>Loading...</h2>;
  }

 return (
  <div className="min-h-screen bg-slate-100 px-4 py-6 sm:px-6 lg:px-10">

   
    <div className="max-w-7xl mx-auto mb-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
        Checkout
      </h1>

      <p className="text-sm sm:text-base text-gray-500 mt-1">
        Select your delivery address and review your order.
      </p>
    </div>


    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 lg:gap-8">

      
      <div>

       
        {error && (
          <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}


        {showAddressForm ? (

          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">

            
            <div className="px-5 sm:px-7 py-5 border-b border-gray-100">

              <h2 className="text-xl font-bold text-gray-900">
                Add Delivery Address
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Enter the address where you want your order delivered.
              </p>

            </div>


            <form
              onSubmit={handleFormSubmit}
              className="p-5 sm:p-7"
            >

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                
                <div className="sm:col-span-2">

                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-gray-700 mb-2"
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
                    placeholder="Enter your full name"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none
                    focus:ring-2 focus:ring-lime-500/30 focus:border-lime-600 transition"
                  />

                </div>


                
                <div className="sm:col-span-2">

                  <label
                    htmlFor="address"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Complete Address
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
                    placeholder="House number, street, area or locality"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none resize-none
                    focus:ring-2 focus:ring-lime-500/30 focus:border-lime-600 transition"
                  />

                </div>


               
                <div>

                  <label
                    htmlFor="landmark"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Landmark
                    <span className="text-gray-400 font-normal">
                      {" "} (Optional)
                    </span>
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
                    placeholder="Nearby landmark"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none
                    focus:ring-2 focus:ring-lime-500/30 focus:border-lime-600 transition"
                  />

                </div>


                
                <div>

                  <label
                    htmlFor="city"
                    className="block text-sm font-semibold text-gray-700 mb-2"
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
                    placeholder="Enter city"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none
                    focus:ring-2 focus:ring-lime-500/30 focus:border-lime-600 transition"
                  />

                </div>


                
                <div>

                  <label
                    htmlFor="pincode"
                    className="block text-sm font-semibold text-gray-700 mb-2"
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
                    placeholder="Enter pincode"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none
                    focus:ring-2 focus:ring-lime-500/30 focus:border-lime-600 transition"
                  />

                </div>


               
                <div>

                  <label
                    htmlFor="mobile"
                    className="block text-sm font-semibold text-gray-700 mb-2"
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
                    placeholder="10 digit mobile number"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none
                    focus:ring-2 focus:ring-lime-500/30 focus:border-lime-600 transition"
                  />

                </div>

              </div>


              

              <label className="flex items-center gap-3 mt-6 cursor-pointer select-none">

                <input
                  type="checkbox"
                  checked={saveAddress}
                  onChange={(e) =>
                    setSaveAddress(e.target.checked)
                  }
                  className="w-4 h-4 accent-lime-700 cursor-pointer"
                />

                <span className="text-sm text-gray-600">
                  Save this address for future orders
                </span>

              </label>


              

              <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 mt-7">

                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700
                  font-semibold text-sm hover:bg-gray-50 transition cursor-pointer"
                >
                  Cancel
                </button>


                <button
                  type="submit"
                  disabled={orderLoading}
                  className="px-7 py-3 rounded-xl bg-lime-700 text-white
                  font-semibold text-sm hover:bg-lime-800 transition
                  disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                >
                  {orderLoading
                    ? "Placing Order..."
                    : "Place Order"}
                </button>

              </div>

            </form>

          </div>

        ) : (

          

          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm">

            

            <div className="px-5 sm:px-7 py-5 border-b border-gray-100 flex items-center justify-between gap-4">

              <div>

                <h2 className="text-xl font-bold text-gray-900">
                  Delivery Address
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Select where you want your order delivered.
                </p>

              </div>


              <button
                onClick={handleAddAddress}
                className="shrink-0 px-4 py-2 rounded-xl border border-lime-700
                text-lime-700 text-sm font-semibold hover:bg-lime-50
                transition cursor-pointer"
              >
                + Add New
              </button>

            </div>


            <div className="p-5 sm:p-7">


             

              {addresses.length === 0 ? (

                <div className="py-12 text-center">

                  <div className="w-14 h-14 mx-auto rounded-full bg-lime-50
                  flex items-center justify-center text-2xl mb-4">
                    📍
                  </div>

                  <h3 className="font-semibold text-gray-800">
                    No saved address
                  </h3>

                  <p className="text-sm text-gray-500 mt-1 mb-5">
                    Add a delivery address to continue.
                  </p>

                  <button
                    onClick={handleAddAddress}
                    className="px-6 py-3 rounded-xl bg-lime-700 text-white
                    font-semibold text-sm hover:bg-lime-800 transition cursor-pointer"
                  >
                    Add Address
                  </button>

                </div>

              ) : (

                <div className="space-y-4">

                  {addresses.map((address) => (

                    <label
                      key={address._id}
                      className={`block border rounded-xl p-4 sm:p-5
                      cursor-pointer transition-all duration-200
                      ${
                        selectedAddress?._id === address._id
                          ? "border-lime-600 bg-lime-50 shadow-sm"
                          : "border-gray-200 bg-white hover:border-lime-300 hover:shadow-sm"
                      }`}
                    >

                      <div className="flex gap-4">

                        

                        <input
                          type="radio"
                          name="selectedAddress"
                          checked={
                            selectedAddress?._id === address._id
                          }
                          onChange={() =>
                            setSelectedAddress(address)
                          }
                          className="mt-1 w-4 h-4 accent-lime-700 cursor-pointer"
                        />


                    

                        <div className="flex-1 min-w-0">

                          <div className="flex flex-col sm:flex-row sm:items-center
                          sm:justify-between gap-1">

                            <h3 className="font-semibold text-gray-900">
                              {address.name}
                            </h3>

                            <span className="text-sm text-gray-500">
                              {address.mobilenumber}
                            </span>

                          </div>


                          <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                            {address.address}
                          </p>


                          {address.landmark && (

                            <p className="text-sm text-gray-500 mt-1">
                              Landmark: {address.landmark}
                            </p>

                          )}


                          <p className="text-sm text-gray-600 mt-1">

                            {address.city} - {address.pincode}

                          </p>

                        </div>

                      </div>

                    </label>

                  ))}


                 

                  <button
                    onClick={handleSavedAddressOrder}
                    disabled={orderLoading}
                    className="w-full mt-3 py-3.5 rounded-xl bg-lime-700
                    hover:bg-lime-800 text-white font-semibold
                    transition disabled:opacity-60
                    disabled:cursor-not-allowed cursor-pointer"
                  >
                    {orderLoading
                      ? "Placing Order..."
                      : "Place Order"}
                  </button>

                </div>

              )}

            </div>

          </div>

        )}

      </div>



    

      <div className="lg:sticky lg:top-24 h-fit">

        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">

      

          <div className="px-5 py-5 border-b border-gray-100">

            <h2 className="text-lg font-bold text-gray-900">
              Order Summary
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              {cart.length} item{cart.length !== 1 ? "s" : ""} in your cart
            </p>

          </div>


        

          <div className="max-h-64 overflow-y-auto hide-scrollbar px-5 py-3">

            {cart.map((item) => (

              <div
                key={item._id}
                className="flex items-center gap-3 py-3 border-b border-gray-100 last:border-0"
              >

                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 rounded-lg object-contain bg-slate-50"
                />


                <div className="flex-1 min-w-0">

                  <h3 className="text-sm font-semibold text-gray-800 truncate">
                    {item.name}
                  </h3>

                  <p className="text-xs text-gray-500 mt-1">
                    Qty: {item.quantity} × ₹{item.price}
                  </p>

                </div>


                <span className="text-sm font-semibold text-gray-800">

                  ₹{(item.price * item.quantity).toFixed(2)}

                </span>

              </div>

            ))}

          </div>



          <div className="border-t border-gray-100 px-5 py-5 space-y-3">

            <div className="flex justify-between text-sm text-gray-600">

              <span>Item Total</span>

              <span>₹{totalPrice.toFixed(2)}</span>

            </div>


            <div className="flex justify-between text-sm text-gray-600">

              <span>Delivery</span>

              <span className="font-medium text-lime-700">
                FREE
              </span>

            </div>


            <div className="border-t border-dashed border-gray-200 pt-4">

              <div className="flex justify-between items-center">

                <span className="font-bold text-gray-900">
                  Total Amount
                </span>

                <span className="text-xl font-bold text-gray-900">

                  ₹{totalPrice.toFixed(2)}

                </span>

              </div>

            </div>

          </div>



          <div className="px-5 pb-5">

            <div className="bg-lime-50 rounded-xl px-4 py-3">

              <p className="text-xs text-lime-800">

                Your order details and delivery address will be confirmed
                before completing the order.

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>

  </div>
);
}

export default Checkout;