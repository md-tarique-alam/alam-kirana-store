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
      className="group w-full bg-white rounded-xl border border-slate-200
        hover:border-lime-400 hover:shadow-md
        transition-all duration-300 overflow-hidden"
    >
      <Link to={`/product/${product._id}`}>
        <div className="p-2.5 sm:p-3">
          <div
            className="w-full aspect-square overflow-hidden
                      rounded-lg bg-slate-50"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain
                         group-hover:scale-105
                         transition-transform duration-300"
            />
          </div>

          <h2
            className="text-sm font-semibold text-slate-800
                         mt-3 line-clamp-2 min-h-[40px]
                         group-hover:text-lime-700
                         transition-colors"
          >
            {product.name}
          </h2>

          <div className="flex items-center justify-between mt-2">
            <span className="text-lg font-bold text-slate-900">
              ₹{product.price}
            </span>

            <span
              className="text-xs text-slate-700
                             bg-slate-100 px-2 py-1 rounded-md"
            >
              {product.unit}
            </span>
          </div>
        </div>
      </Link>

      <div className="px-2.5 pb-2.5 sm:px-3 sm:pb-3">
        {exist ? (
          <div
            className="flex items-center justify-between
                          bg-lime-50 border border-lime-200
                          rounded-lg p-1"
          >
            <button
              type="button"
              onClick={() => handledecrease(product._id)}
              className="w-8 h-8 rounded-md bg-lime-600
                         border border-lime-200
                         text-slate-800 font-bold 
                         hover:bg-lime-700
                         cursor-pointer transition"
            >
              −
            </button>

            <span className="text-sm font-semibold text-slate-800">
              {exist.quantity}
            </span>

            <button
              type="button"
              onClick={() => handleincrease(product._id)}
              className="w-8 h-8 rounded-md bg-lime-600
                         border border-lime-200
                         text-slate-800 font-bold
                         hover:bg-lime-700
                         cursor-pointer transition"
            >
              +
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => handleaddcart(product)}
            className="w-full flex items-center justify-center gap-1.5
                       py-2 rounded-lg
                       bg-lime-200 text-lime-800
                       border border-lime-300
                       text-sm font-semibold
                       hover:bg-lime-700 hover:text-white
                       hover:border-lime-600
                       cursor-pointer transition-all duration-300"
          >
            <HiShoppingCart className="text-base" />
            Add
          </button>
        )}
      </div>
    </div>
  );
}
export default ProductCard;
