import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getDashboardData();
  }, []);

  async function getDashboardData() {
    setLoading(true);
    setError("");

    try {
      const [ordersRes, productsRes, usersRes] = await Promise.all([
        axios.get("http://localhost:5000/orders", {
          withCredentials: true,
        }),
        axios.get("http://localhost:5000/products"),
        axios.get("http://localhost:5000/users", {
          withCredentials: true,
        }),
      ]);

      setOrders(ordersRes.data.allorders);
      setProducts(productsRes.data);
      setUsers(usersRes.data.user);
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  const placedOrders = orders.filter((order) => order.status === "Placed");

  const confirmedOrders = orders.filter(
    (order) => order.status === "Confirmed",
  );

  const processingOrders = orders.filter(
    (order) => order.status === "Processing",
  );

  const deliveredOrders = orders.filter(
    (order) => order.status === "Delivered",
  );

  const recentOrders = orders.slice(0, 5);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-lime-200 border-t-lime-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-7">
          <p className="text-sm font-medium text-lime-600">Admin Panel</p>

          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
            Dashboard
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            Overview of your Kirana store
          </p>
        </div>

        {error && (
          <div className="mb-5 bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 text-sm">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Total Products</p>

                <h2 className="text-3xl font-bold text-slate-900 mt-2">
                  {products.length}
                </h2>
              </div>

              <div className="w-11 h-11 rounded-xl bg-lime-100 flex items-center justify-center text-xl">
                📦
              </div>
            </div>

            <p className="text-xs text-slate-400 mt-4">
              Products in your store
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Total Orders</p>

                <h2 className="text-3xl font-bold text-slate-900 mt-2">
                  {orders.length}
                </h2>
              </div>

              <div className="w-11 h-11 rounded-xl bg-blue-100 flex items-center justify-center text-xl">
                🛒
              </div>
            </div>

            <p className="text-xs text-slate-400 mt-4">All customer orders</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Total Users</p>

                <h2 className="text-3xl font-bold text-slate-900 mt-2">
                  {users.length}
                </h2>
              </div>

              <div className="w-11 h-11 rounded-xl bg-purple-100 flex items-center justify-center text-xl">
                👥
              </div>
            </div>

            <p className="text-xs text-slate-400 mt-4">Registered customers</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Delivered</p>

                <h2 className="text-3xl font-bold text-slate-900 mt-2">
                  {deliveredOrders.length}
                </h2>
              </div>

              <div className="w-11 h-11 rounded-xl bg-green-100 flex items-center justify-center text-xl">
                ✓
              </div>
            </div>

            <p className="text-xs text-slate-400 mt-4">
              Successfully delivered
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
          <div className="bg-white border border-slate-200 rounded-xl p-4">
            <p className="text-xs text-slate-500">Placed</p>
            <p className="text-xl font-bold text-slate-900 mt-1">
              {placedOrders.length}
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-4">
            <p className="text-xs text-slate-500">Confirmed</p>
            <p className="text-xl font-bold text-slate-900 mt-1">
              {confirmedOrders.length}
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-4">
            <p className="text-xs text-slate-500">Processing</p>
            <p className="text-xl font-bold text-slate-900 mt-1">
              {processingOrders.length}
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-4">
            <p className="text-xs text-slate-500">Delivered</p>
            <p className="text-xl font-bold text-slate-900 mt-1">
              {deliveredOrders.length}
            </p>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm mt-6 overflow-hidden">
          <div className="px-5 py-5 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Recent Orders
              </h2>

              <p className="text-xs text-slate-500 mt-1">
                Latest customer orders
              </p>
            </div>

            <span className="text-xs font-medium text-lime-700 bg-lime-50 px-3 py-1.5 rounded-full">
              {recentOrders.length} Orders
            </span>
          </div>

          {recentOrders.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-slate-500 text-sm">No orders yet</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {recentOrders.map((order) => (
                <div
                  key={order._id}
                  className="px-5 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 hover:bg-slate-50 transition"
                >
                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      Order #{order._id.slice(-6).toUpperCase()}
                    </p>

                    <p className="text-xs text-slate-500 mt-1">
                      {order.user?.name || "Customer"}
                    </p>

                    <p className="text-xs text-slate-400 mt-1">
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-5">
                    <p className="text-sm font-bold text-slate-900">
                      ₹{order.total}
                    </p>

                    <span
                      className={`text-xs font-medium px-3 py-1.5 rounded-full ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-700"
                          : order.status === "Cancelled"
                            ? "bg-red-100 text-red-700"
                            : order.status === "Processing"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-lime-100 text-lime-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
