import axios from "axios";
import { useEffect, useState } from "react";

function AdminDashboard() {
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
      setError(
        error.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  }

  const placedOrders = orders.filter(
    (order) => order.status === "Placed"
  );

  const confirmedOrders = orders.filter(
    (order) => order.status === "Confirmed"
  );

  const processingOrders = orders.filter(
    (order) => order.status === "Processing"
  );

  const deliveredOrders = orders.filter(
    (order) => order.status === "Delivered"
  );

  const recentOrders = orders.slice(0, 5);

  if (loading) {
    return <h2>Loading dashboard...</h2>;
  }

  return (
    <div>
      {error && <h2>{error}</h2>}

      <h1>Dashboard</h1>

      <div>
        <div>
          <h2>{products.length}</h2>
          <p>Total Products</p>
        </div>

        <div>
          <h2>{orders.length}</h2>
          <p>Total Orders</p>
        </div>

        <div>
          <h2>{users.length}</h2>
          <p>Total Users</p>
        </div>

        <div>
          <h2>{placedOrders.length}</h2>
          <p>Placed Orders</p>
        </div>

        <div>
          <h2>{confirmedOrders.length}</h2>
          <p>Confirmed Orders</p>
        </div>

        <div>
          <h2>{processingOrders.length}</h2>
          <p>Processing Orders</p>
        </div>

        <div>
          <h2>{deliveredOrders.length}</h2>
          <p>Delivered Orders</p>
        </div>
      </div>

      <h2>Recent Orders</h2>

      {recentOrders.map((order) => (
        <div key={order._id}>
          <p>{order.user?.name}</p>
          <p>₹{order.total}</p>
          <p>{order.status}</p>
        </div>
      ))}
    </div>
  );
}

export default AdminDashboard;