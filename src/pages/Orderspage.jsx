import axios from "axios";
import { useEffect, useState } from "react";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getorders();
  }, []);

  async function getorders() {
    try {
      setLoading(true);
      setError("");
      const res = await axios.get("http://localhost:5000/orders/my-orders", {
        withCredentials: true,
      });
      setOrders(res.data);
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <h1>...loading</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  async function cancelorder(id) {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this order?",
    );

    if (!confirmed) {
      return;
    }
    try {
      const res = await axios.patch(
        `http://localhost:5000/orders/${id}/cancel`,
        {},
        { withCredentials: true },
      );
      const updatedOrder = res.data.order;
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === updatedOrder._id ? updatedOrder : order,
        ),
      );
    } catch (error) {
      setError(error.response?.data?.message || "something went wrong");
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 px-3 py-5 sm:px-5 md:px-8 md:py-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-5 flex items-end justify-between border-b border-lime-200 pb-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              My Orders
            </h1>
            <p className="mt-1 text-xs text-slate-500 sm:text-sm">
              Track your orders and view order details
            </p>
          </div>

          <div className="hidden rounded-full bg-lime-100 px-3 py-1.5 text-xs font-semibold text-lime-800 sm:block">
            {orders.length} {orders.length === 1 ? "Order" : "Orders"}
          </div>
        </div>

        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:border-lime-300 hover:shadow-md"
            >
              <div className="flex flex-col gap-3 border-b border-lime-100 bg-lime-50/70 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-lime-700">
                    Order placed
                  </p>

                  <p className="mt-0.5 text-xs font-medium text-slate-700 sm:text-sm">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>

                <span
                  className={`w-fit rounded-full px-3 py-1 text-xs font-bold capitalize ${
                    order.status === "placed"
                      ? "bg-lime-600 text-white"
                      : order.status === "cancelled"
                        ? "bg-red-100 text-red-700"
                        : "bg-slate-200 text-slate-700"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              <div className="px-4 py-3">
                <div className="mb-2 flex items-center justify-between">
                  <h2 className="text-sm font-bold text-slate-800 sm:text-base">
                    Order Items
                  </h2>

                  <span className="text-xs font-medium text-slate-400">
                    {order.items.length}
                    {order.items.length === 1 ? "item" : "items"}
                  </span>
                </div>

                <div className="divide-y divide-slate-100">
                  {order.items.map((item) => (
                    <div
                      key={item._id}
                      className="flex items-center justify-between gap-3 py-2.5"
                    >
                      <div className="min-w-0">
                        <h3 className="truncate text-sm font-semibold text-slate-800 sm:text-base">
                          {item.name}
                        </h3>

                        <p className="mt-0.5 text-xs text-slate-500">
                          ₹{item.price} × {item.quantity}
                        </p>
                      </div>

                      <div className="flex shrink-0 items-center gap-2 sm:gap-4">
                        <span className="rounded-md bg-slate-100 px-2 py-1 text-[11px] font-semibold text-slate-600 sm:text-xs">
                          Qty {item.quantity}
                        </span>

                        <span className="text-sm font-bold text-slate-800 sm:text-base">
                          ₹{item.price * item.quantity}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-3 border-t border-slate-100 px-4 py-3 sm:grid-cols-2">
                <div className="rounded-lg border border-lime-100 bg-lime-50 p-3">
                  <h2 className="mb-2 text-sm font-bold text-lime-900">
                    Order Summary
                  </h2>

                  <div className="space-y-1.5 text-xs sm:text-sm">
                    <div className="flex justify-between gap-3">
                      <span className="text-slate-500">Payment</span>

                      <span className="font-semibold uppercase text-slate-700">
                        {order.paymentmethod}
                      </span>
                    </div>

                    <div className="flex items-center justify-between border-t border-lime-200 pt-2">
                      <span className="font-semibold text-slate-700">
                        Total
                      </span>

                      <span className="text-lg font-bold text-lime-700">
                        ₹{order.total}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                  <h2 className="mb-2 text-sm font-bold text-slate-800">
                    Delivery Address
                  </h2>

                  <div className="space-y-0.5 text-xs leading-5 text-slate-600">
                    <p className="font-semibold text-slate-900">
                      {order.address.name}
                    </p>

                    <p>{order.address.address}</p>

                    <p>{order.address.landmark}</p>

                    <p>
                      {order.address.city} - {order.address.pincode}
                    </p>

                    <p className="pt-1 font-medium text-slate-700">
                      {order.address.mobilenumber}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 border-t border-slate-100 bg-white px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="truncate text-[10px] text-slate-400 sm:text-xs">
                  Order ID:
                  <span className="font-medium text-slate-600">
                    {order._id}
                  </span>
                </p>

                {order.status === "placed" ? (
                  <button
                    onClick={() => cancelorder(order._id)}
                    className="w-full rounded-lg bg-lime-600 px-4 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-lime-700 active:scale-[0.98] sm:w-auto"
                  >
                    Cancel Order
                  </button>
                ) : (
                  <span className="w-full rounded-lg bg-red-50 px-4 py-2 text-center text-xs font-bold text-red-600 sm:w-auto">
                    Order Cancelled
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Orders;
