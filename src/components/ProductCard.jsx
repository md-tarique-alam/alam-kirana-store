import { HiShoppingCart } from "react-icons/hi";
import { useContext } from "react";
import { cartcontext } from "../context/cartcontext";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  const { cart, handleaddcart, handleincrease, handledecrease } =
    useContext(cartcontext);

  const exist = cart.find((item) => item._id === product._id);

  return (
    <div
      className="group flex w-full min-w-0 flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition-all duration-300 hover:border-lime-400 hover:shadow-md"
    >
      <Link to={`/product/${product._id}`} className="block">
        <div className="p-2.5 sm:p-3">
          
          <div className="aspect-square w-full overflow-hidden rounded-lg bg-slate-50">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          
          <h2
            className="mt-2.5 line-clamp-2 min-h-[40px] text-sm font-semibold leading-5 text-slate-800 transition-colors group-hover:text-lime-700 sm:mt-3 sm:text-base"
          >
            {product.name}
          </h2>

          
          <div className="mt-2 flex items-center justify-between gap-2">
            <span className="text-base font-bold text-slate-900 sm:text-lg">
              ₹{product.price}
            </span>

            <span className="shrink-0 rounded-md bg-slate-100 px-2 py-1 text-[11px] text-slate-700 sm:text-xs">
              {product.unit}
            </span>
          </div>
        </div>
      </Link>

      
      <div className="mt-auto px-2.5 pb-2.5 sm:px-3 sm:pb-3">
        {exist ? (
          <div className="flex h-9 items-center justify-between rounded-lg border border-lime-200 bg-lime-50 p-1 sm:h-10">
            <button
              type="button"
              onClick={() => handledecrease(product._id)}
              className="flex h-7 w-7 items-center justify-center rounded-md bg-lime-600 text-sm font-bold text-white transition hover:bg-lime-700 sm:h-8 sm:w-8"
            >
              −
            </button>

            <span className="text-sm font-semibold text-slate-800">
              {exist.quantity}
            </span>

            <button
              type="button"
              onClick={() => handleincrease(product._id)}
              className="flex h-7 w-7 items-center justify-center rounded-md bg-lime-600 text-sm font-bold text-white transition hover:bg-lime-700 sm:h-8 sm:w-8"
            >
              +
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => handleaddcart(product)}
            className="flex h-9 w-full items-center justify-center gap-1.5 rounded-lg border border-lime-300 bg-lime-100 text-xs font-semibold text-lime-800 transition-all duration-300 hover:border-lime-600 hover:bg-lime-700 hover:text-white sm:h-10 sm:text-sm"
          >
            <HiShoppingCart className="text-sm sm:text-base" />
            Add
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCard;