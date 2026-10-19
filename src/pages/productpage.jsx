
import { useParams, Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { cartcontext } from "../context/cartcontext";
import { HiShoppingCart } from "react-icons/hi";
import { IoReturnUpBack } from "react-icons/io5";
import { FcCancel } from "react-icons/fc";
import { LuPackage, LuStore } from "react-icons/lu";
import axios from "axios";

function ProductPage() {
  const { id } = useParams();

  const { cart, handleaddcart, handleincrease, handledecrease } =
    useContext(cartcontext);

  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const findProduct = async () => {
      try {
        setLoading(true);
        setError("");
        setProduct(null);
        setImageError(false);

        const res = await axios.get(
          `https://alam-kirana-backend.onrender.com/products/${id}`
        );

        setProduct(res.data);
      } catch (error) {
        setError(
          error.response?.data?.message ||
            "Unable to load this product. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    findProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-slate-50 px-4">
        <div className="rounded-xl bg-white px-6 py-4 text-sm font-medium text-slate-600 shadow-sm">
          Loading product...
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-slate-50 px-4">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">
            Product unavailable
          </h2>

          <p className="mt-2 text-sm text-red-600">
            {error || "This product could not be found."}
          </p>

          <Link
            to="/"
            className="mt-5 inline-flex rounded-lg bg-lime-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-lime-800"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const exist = cart.find((item) => item._id === product._id);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="min-w-0">
            <Link
              to="/"
              className="text-sm text-slate-500 hover:text-lime-700"
            >
              Home
            </Link>

            <span className="mx-2 text-slate-300">/</span>

            <span className="text-sm text-slate-500">
              {product.category}
            </span>

            <h2 className="mt-1 truncate text-lg font-semibold text-slate-900 sm:text-xl">
              {product.name}
            </h2>
          </div>

          <Link
            to="/"
            className="shrink-0 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 transition hover:border-lime-300 hover:bg-lime-50 hover:text-lime-800"
          >
            ← Home
          </Link>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="lg:sticky lg:top-6">
            <div className="flex min-h-[320px] items-center justify-center sm:min-h-[440px] lg:min-h-[560px]">
              {product.image && !imageError ? (
                <img
                  src={product.image}
                  alt={product.name}
                  onError={() => setImageError(true)}
                  className="max-h-[320px] w-full max-w-[320px] object-contain sm:max-h-[440px] sm:max-w-[440px] lg:max-h-[540px] lg:max-w-[520px]"
                />
              ) : (
                <div className="flex h-72 w-full flex-col items-center justify-center text-slate-400">
                  <LuPackage className="text-6xl" />
                  <p className="mt-3 text-sm">Image unavailable</p>
                </div>
              )}
            </div>
          </div>

          <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8 lg:p-9">
            <span className="inline-flex rounded-full bg-lime-50 px-3 py-1 text-xs font-semibold text-lime-800">
              {product.category}
            </span>

            <h1 className="mt-4 break-words text-2xl font-bold leading-tight text-slate-900 sm:text-3xl lg:text-4xl">
              {product.name}
            </h1>

            <div className="mt-3 flex items-center gap-2 text-sm text-slate-600">
              <LuStore className="shrink-0 text-lg text-lime-700" />
              <span>
                Sold by{" "}
                <span className="font-semibold text-slate-800">
                  Alam Store
                </span>
              </span>
            </div>

            <div className="my-6 border-t border-slate-200" />

            <div>
              <p className="text-sm font-medium text-slate-500">Price</p>
              <p className="mt-1 text-3xl font-bold text-slate-900 sm:text-4xl">
                ₹{product.price}
              </p>
            </div>

            {product.unit && (
              <div className="mt-6">
                <p className="mb-3 text-sm font-semibold text-slate-800">
                  Pack size
                </p>

                <div className="inline-flex min-w-40 items-center justify-between gap-8 rounded-xl border-2 border-lime-600 bg-lime-50 p-4">
                  <span className="text-sm font-semibold text-slate-800">
                    {product.unit}
                  </span>

                  <span className="text-sm font-bold text-slate-900">
                    ₹{product.price}
                  </span>
                </div>
              </div>
            )}

            <div className="mt-7">
              {exist ? (
                <div className="flex h-12 w-full max-w-[220px] items-center justify-between rounded-lg bg-lime-700 px-4 text-white shadow-sm">
                  <button
                    type="button"
                    aria-label="Decrease quantity"
                    className="rounded px-2 py-1 text-xl font-semibold hover:bg-lime-800"
                    onClick={() => handledecrease(product._id)}
                  >
                    −
                  </button>

                  <span className="text-sm font-bold">
                    {exist.quantity}
                  </span>

                  <button
                    type="button"
                    aria-label="Increase quantity"
                    className="rounded px-2 py-1 text-xl font-semibold hover:bg-lime-800"
                    onClick={() => handleincrease(product._id)}
                  >
                    +
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-lime-700 px-5 text-sm font-bold text-white shadow-sm transition hover:bg-lime-800 active:scale-[0.99]"
                  onClick={() => handleaddcart(product)}
                >
                  <HiShoppingCart className="text-lg" />
                  Add to Cart
                </button>
              )}
            </div>

            <section className="mt-9 border-t border-slate-200 pt-6">
              <h2 className="text-lg font-bold text-slate-900">
                Product Description
              </h2>

              <p className="mt-3 whitespace-pre-line break-words text-sm leading-7 text-slate-600">
                {product.description?.trim() ||
                  "No description is available for this product yet."}
              </p>
            </section>

            <section className="mt-8 border-t border-slate-200 pt-6">
              <h2 className="text-lg font-bold text-slate-900">
                Store Information
              </h2>

              <div className="mt-4 flex items-start gap-3 rounded-xl bg-slate-50 p-4">
                <LuPackage className="mt-0.5 shrink-0 text-xl text-lime-700" />
                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    Everyday essentials
                  </p>
                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Shop grocery products from your local Alam Store.
                  </p>
                </div>
              </div>

              <div className="mt-3 flex items-start gap-3 rounded-xl bg-slate-50 p-4">
                <FcCancel className="mt-0.5 shrink-0 text-xl" />
                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    Cancellation policy
                  </p>
                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Cancellation depends on the order status and store policy.
                  </p>
                </div>
              </div>

              <div className="mt-3 flex items-start gap-3 rounded-xl bg-slate-50 p-4">
                <IoReturnUpBack className="mt-0.5 shrink-0 text-xl text-slate-700" />
                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    Return policy
                  </p>
                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Contact the store to confirm return or replacement eligibility.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ProductPage;
