import { useContext } from "react";
import { HiShoppingCart } from "react-icons/hi";
import { HiOutlineSearch } from "react-icons/hi";
import { cartcontext } from "../context/cartcontext";

function Navbar({ search, setSearch }) {

const {cart, toggleCart, totalPrice}=useContext(cartcontext);

  return (
    <div className="sticky top-0 z-40 bg-white flex justify-between items-center border-b border-slate-200 p-4 shadow-sm">
      <h1>Alam kirana</h1>
      <div className="relative w-full max-w-lg">
        <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl" />

        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products"
          className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl shadow-sm focus:outline-none focus:ring-1 focus:ring-slate-300"
        />
      </div>
      <div
        onClick={toggleCart}
        className="flex flex-col justify-center text-center bg-lime-700 px-5 py-2 rounded-lg cursor-pointer"
      >
        <p className="text-sm font-bold text-white ">{cart.length} item</p>
        
        <div className="flex items-center justify-center gap-1 text-white text-sm font-bold">
          {/* <h1 className="text-white text-md">₹{totalPrice}</h1> */}
          <HiShoppingCart />
          <span>View Cart</span>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
