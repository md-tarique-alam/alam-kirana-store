import axios from "axios";
import React, { useEffect, useState } from "react";

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrders();
  }, []);

  async function getOrders() {
    setLoading(true);
    setError("");

    try {
      const res = await axios.get("http://localhost:5000/orders", {
        withCredentials: true,
      });

      setOrders(res.data.allorders);
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function handleStatus(id, newStatus) {
    setError("");

    try {
      const res = await axios.patch(
        `http://localhost:5000/orders/${id}/status`,
        { status: newStatus },
        { withCredentials: true }
      );

      const updatedOrder = res.data.order;

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === updatedOrder._id ? updatedOrder : order
        )
      );
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
    }
  }

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-lime-200 border-t-lime-700 rounded-full animate-spin"></div>
          <p className="text-gray-500 font-medium">Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-6 lg:p-8">

      <div className="max-w-7xl mx-auto">

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-lime-700">
              Orders
            </h1>

            <p className="text-sm sm:text-base text-gray-500 mt-1">
              Manage customer orders and delivery status
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl px-4 py-2 shadow-sm">
            <span className="text-sm text-gray-500">
              Total Orders
            </span>

            <span className="ml-2 font-bold text-lime-700">
              {orders.length}
            </span>
          </div>
        </div>

        {error && (
          <div className="mb-5 flex items-center justify-between gap-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
            <p className="text-sm font-medium">
              {error}
            </p>

            <button
              onClick={() => setError("")}
              className="text-red-500 hover:text-red-700 font-bold cursor-pointer"
            >
              ✕
            </button>
          </div>
        )}

        {orders.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-2xl min-h-[400px] flex flex-col items-center justify-center text-center px-6">

            <div className="w-16 h-16 rounded-full bg-lime-100 flex items-center justify-center mb-4">
              <span className="text-2xl">📦</span>
            </div>

            <h2 className="text-xl font-bold text-gray-800">
              No orders yet
            </h2>

            <p className="text-sm text-gray-500 mt-2">
              Customer orders will appear here once they are placed.
            </p>

          </div>
        ) : (
          <div className="space-y-5">

            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >

                <div className="p-4 sm:p-5 border-b border-gray-100 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                  <div>
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">
                      Order ID
                    </p>

                    <p className="text-sm sm:text-base font-semibold text-gray-800 mt-1 break-all">
                      #{order._id}
                    </p>

                    <p className="text-sm text-gray-500 mt-2">
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">

                    <div className="bg-slate-50 border border-gray-200 rounded-xl px-4 py-2">
                      <p className="text-xs text-gray-500 mb-1">
                        Order Total
                      </p>

                      <p className="font-bold text-gray-800">
                        ₹{order.total}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500 mb-1">
                        Update Status
                      </p>

                      <select
                        value={order.status}
                        onChange={(e) =>
                          handleStatus(order._id, e.target.value)
                        }
                        className="w-full sm:w-auto bg-lime-50 border border-lime-600 text-lime-800 font-semibold px-4 py-2 rounded-xl outline-none cursor-pointer focus:ring-1 focus:ring-lime-600"
                      >
                        <option value="Placed">Placed</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Processing">Processing</option>
                        <option value="Out-for-Delivery">
                          Out for Delivery
                        </option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>

                  </div>

                </div>

                <div className="p-4 sm:p-5 grid grid-cols-1 lg:grid-cols-3 gap-5">

                  <div className="lg:col-span-2">

                    <h3 className="font-bold text-gray-800 mb-3">
                      Ordered Items
                    </h3>

                    <div className="space-y-3">

                      {order.items.map((item) => (
                        <div
                          key={item._id}
                          className="flex items-center justify-between gap-4 bg-slate-50 border border-slate-100 rounded-xl p-3"
                        >

                          <div className="min-w-0">
                            <h4 className="font-semibold text-gray-800 truncate">
                              {item.name}
                            </h4>

                            <p className="text-sm text-gray-500 mt-1">
                              Quantity: {item.quantity}
                            </p>
                          </div>

                          <div className="text-right shrink-0">
                            <p className="font-bold text-gray-800">
                              ₹{item.price}
                            </p>
                          </div>

                        </div>
                      ))}

                    </div>

                  </div>

                  <div className="bg-slate-50 border border-slate-100 rounded-xl p-4">

                    <h3 className="font-bold text-gray-800 mb-3">
                      Delivery Address
                    </h3>

                    <div className="text-sm text-gray-600 space-y-1">

                      <p className="font-semibold text-gray-800">
                        {order.address.name}
                      </p>

                      <p>
                        {order.address.address}
                      </p>

                      {order.address.landmark && (
                        <p>
                          {order.address.landmark}
                        </p>
                      )}

                      <p>
                        {order.address.city} - {order.address.pincode}
                      </p>

                      <p className="pt-2 font-medium text-gray-800">
                        {order.address.mobilenumber}
                      </p>

                    </div>

                    <div className="mt-5 pt-4 border-t border-gray-200">

                      <p className="text-xs text-gray-500">
                        Payment Method
                      </p>

                      <p className="font-semibold text-gray-800 mt-1 uppercase">
                        {order.paymentmethod}
                      </p>

                    </div>

                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

    </div>
  );
};

export default UserOrders;