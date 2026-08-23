import { HiShoppingCart } from "react-icons/hi"; 
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { useContext } from "react";
import { cartcontext } from "../context/cartcontext";
import { Link } from "react-router-dom";

function ProductCard({ product }) {

  const {cart, handleaddcart, handleincrease, handledecrease }=useContext(cartcontext);

  const exist=cart.find((item)=>item.id===product.id);

  return (
    <div className="bg-white-100 hover:shadow-lg border border-gray-300 rounded-lg group ">
      <Link to={`/product/${product.id}`}>
      <div className="flex flex-col gap-2 rounded-xl">
        <img
          className="w-full h-50 object-contain rounded "
          src={product.images[0]}
        />
        <h2 className="text-md font-medium ml-2 mb-2 h-12 group-hover:text-lime-700">{product.title}</h2>
        <h4 className="text-md font-bold ml-2">₹{product.price}</h4>
      </div>
      </Link>

      <div className="flex justify-between m-2">
        {product.unit}
        <p className="pl-1 pr-9 py-1 bg-slate-100 rounded text-gray-800 text-sm font-small ">1 "pc"</p>
        

        {exist ? (
          <div className="flex items-center justify-between gap-2 bg-lime-700 text-white px-2 py-1 rounded-md w-20 h-9">
            <button onClick={() => handledecrease(product.id)} className="cursor-pointer text-lg font-semibold " > - </button>
            <span className="w-3 text-center font-semibold">{exist.quantity}</span>

            <button onClick={() => handleincrease(product.id)} className="cursor-pointer text-lg font-semibold" > + </button>
          </div>
        ) : (
          <button
            className="flex items-center gap-1 px-4 py-1 text-lime-900 bg-lime-200 hover:bg-lime-800 hover:text-white w-20 h-9 rounded-md border border-lime-400 cursor-pointer transition"
            onClick={() =>handleaddcart(product)}
          >
           <HiShoppingCart/>Add 
          </button>
        )}
      </div>
    </div>
  );
}
export default ProductCard;
