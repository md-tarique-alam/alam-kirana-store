import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

function OrderPlaced() {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="bg-white max-w-lg w-full rounded-2xl shadow-lg p-8 text-center">

        <FaCheckCircle className="text-lime-600 text-7xl mx-auto mb-5" />

        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          Order Placed Successfully!
        </h1>

        <p className="text-gray-600 mb-6">
          Thank you for shopping with us. Your order has been received and will
          be processed shortly.
        </p>

        <Link
          to="/"
          className="inline-block bg-lime-700 hover:bg-lime-800 text-white px-6 py-3 rounded-lg font-semibold transition duration-200"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default OrderPlaced;