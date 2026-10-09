import { useParams, Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { cartcontext } from "../context/cartcontext";
import { HiShoppingCart } from "react-icons/hi";
import { IoReturnUpBack } from "react-icons/io5";
import { FcCancel } from "react-icons/fc";
import { LuLeafyGreen } from "react-icons/lu";
import axios from "axios";

function ProductPage() {
  const { id } = useParams();

  const { cart, handleaddcart, handleincrease, handledecrease } =
    useContext(cartcontext);

  const [product, setProduct] = useState(null);
  const [error, SetError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    findproduct();
  }, [id]);

  const findproduct = async () => {
    try {
      setLoading(true);
      SetError("");

      const res = await axios.get(
        `https://alam-kirana-backend.onrender.com/products/${id}`
      );

      setProduct(res.data);
    } catch (error) {
      SetError(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-slate-100 px-4">
        <div className="rounded-xl bg-white px-6 py-4 text-sm font-medium text-slate-600 shadow-sm">
          Loading product...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-slate-100 px-4">
        <div className="rounded-xl bg-white px-6 py-5 text-center shadow-sm">
          <p className="font-medium text-red-600">{error}</p>

          <Link
            to="/"
            className="mt-4 inline-block rounded-lg bg-lime-600 px-5 py-2 text-sm font-semibold text-white hover:bg-lime-700"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const exist = cart.find((item) => item._id === product._id);

  return (
    <div className="min-h-screen bg-slate-100">

      
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="min-w-0">
            <p className="truncate text-sm text-slate-500">
              Home / {product.category}
            </p>

            <h2 className="mt-1 truncate text-lg font-semibold text-slate-900 sm:text-xl">
              {product.name}
            </h2>
          </div>

          <Link
            to="/"
            className="shrink-0 rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-lime-50 hover:text-lime-700"
          >
            ← Home
          </Link>
        </div>
      </div>

     
      <main className="mx-auto max-w-7xl px-4 py-5 sm:px-6 sm:py-8 lg:px-8">

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          <div className="grid grid-cols-1 gap-0 lg:grid-cols-2">

           
            <div className="flex min-h-[320px] items-center justify-center bg-slate-50 p-6 sm:min-h-[420px] sm:p-10 lg:min-h-[560px]">
              <img
                src={product.image}
                alt={product.name}
                className="h-auto max-h-[330px] w-full max-w-[330px] object-contain transition duration-300 hover:scale-105 sm:max-h-[420px] sm:max-w-[420px]"
              />
            </div>

            
            <div className="flex flex-col p-5 sm:p-8 lg:p-10">

              
              <div>
                <p className="text-sm font-medium text-slate-500">
                  {product.category}
                </p>

                <h1 className="mt-2 text-2xl font-bold leading-tight text-slate-900 sm:text-3xl lg:text-4xl">
                  {product.name}
                </h1>

                <div className="mt-3 flex items-center gap-2 text-sm text-slate-600">
                  <span>Seller:</span>
                  <span className="font-semibold text-slate-800">
                    Alam Store
                  </span>
                </div>
              </div>

              <div className="my-5 border-t border-slate-200" />

              
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Price
                </p>

                <p className="mt-1 text-3xl font-bold text-slate-900 sm:text-4xl">
                  ₹{product.price}
                </p>
              </div>

              
              <div className="mt-6">
                <p className="mb-3 text-sm font-semibold text-slate-800">
                  Choose Variant
                </p>

                <div className="w-full rounded-xl border-2 border-lime-600 bg-lime-50 p-4 sm:w-52">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm font-semibold text-slate-800">
                      1 {product.unit}
                    </span>

                    <span className="text-sm font-bold text-slate-900">
                      ₹{product.price}
                    </span>
                  </div>
                </div>
              </div>

              
              <div className="mt-6">
                {exist ? (
                  <div className="flex h-12 w-full max-w-[180px] items-center justify-between rounded-lg bg-lime-700 px-4 text-white shadow-sm">
                    <button
                      className="text-xl font-semibold"
                      onClick={() => handledecrease(product._id)}
                    >
                      −
                    </button>

                    <span className="text-sm font-bold">
                      {exist.quantity}
                    </span>

                    <button
                      className="text-xl font-semibold"
                      onClick={() => handleincrease(product._id)}
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    className="flex h-12 w-full max-w-[220px] items-center justify-center gap-2 rounded-lg bg-lime-700 px-5 text-sm font-bold text-white shadow-sm transition hover:bg-lime-800 active:scale-[0.98]"
                    onClick={() => handleaddcart(product)}
                  >
                    <HiShoppingCart className="text-lg" />
                    Add to cart
                  </button>
                )}
              </div>

              
              <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-1">

                <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-4">
                  <LuLeafyGreen className="shrink-0 text-2xl text-green-600" />

                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      Vegetarian
                    </p>
                    <p className="text-xs text-slate-500">
                      Suitable for vegetarian customers
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-4">
                  <FcCancel className="shrink-0 text-2xl" />

                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      Cancellation available
                    </p>
                    <p className="text-xs text-slate-500">
                      Cancellation available before processing
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-4">
                  <IoReturnUpBack className="shrink-0 text-2xl text-slate-700" />

                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      Non-returnable
                    </p>
                    <p className="text-xs text-slate-500">
                      This grocery item cannot be returned
                    </p>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ProductPage;