import { useContext, useState } from "react";
import {
  HiLocationMarker,
  HiOutlineShoppingCart,
  HiShoppingCart,
} from "react-icons/hi";
import { HiOutlineSearch } from "react-icons/hi";
import { cartcontext } from "../context/cartcontext";
import { Link, useNavigate } from "react-router-dom";
import { authcontext } from "../context/Authcontext";
import { CgProfile } from "react-icons/cg";
import { IoLocationOutline, IoLogOutOutline } from "react-icons/io5";
import { FiMenu } from "react-icons/fi";

function Navbar({ search, setSearch }) {
  const { cart, toggleCart } = useContext(cartcontext);
  const [showMenu, setShowMenu] = useState(false);
  const { isLoggedIn, logout } = useContext(authcontext);
  const navigate = useNavigate();

  const handlelogout =async () => {
    await logout();
    setShowMenu(false);
    navigate("/");
  };

  return (
    <div className="sticky top-0 z-40 bg-white flex justify-between items-center border border-slate-200 p-4 shadow-sm">
      <Link to={"/"} 
      onClick={() => setShowMenu(false)}
      >
        <h1>Alam kirana</h1>
      </Link>

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

      {isLoggedIn ? (
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="text-md md:text-lg font-semibold cursor-pointer px-3 py-2 rounded-lg hover:bg-slate-100 transition"
          >
            Profile
          </button>

          {showMenu && (
            <div className="absolute top-14 left-1/2 z-50 w-50 flex flex-col gap-1 bg-white border border-gray-200 rounded-xl shadow-xl p-2">
              <Link
                to={"/profile/edit"}
                onClick={() => setShowMenu(false)}
                className="flex items-center gap-2 px-3 py-3 rounded-lg hover:bg-slate-100 transition"
              >
                <CgProfile className="text-xl" />
                <span>Edit Profile</span>
              </Link>

              <Link
                to={"/profile/orders"}
                onClick={() => setShowMenu(false)}
                className="flex items-center gap-2 px-3 py-3 rounded-lg hover:bg-slate-100 transition"
              >
                <HiOutlineShoppingCart className="text-xl" />
                <span>My Orders</span>
              </Link>

              <Link
                to={"/profile/address"}
                onClick={() => setShowMenu(false)}
                className="flex items-center gap-2 px-3 py-3 rounded-lg hover:bg-slate-100 transition"
              >
                <IoLocationOutline className="text-xl" />
                <span>My Address</span>
              </Link>

              <button
                onClick={handlelogout}
                className="flex items-center gap-2 px-3 py-3 rounded-lg hover:bg-red-50 text-left cursor-pointer transition"
              >
                <IoLogOutOutline className="text-xl" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      ) : (
        <div>
          <Link
            to={"/login"}
            className="text-md md:text-lg font-semibold px-3 py-2 rounded-lg hover:bg-slate-100 transition"
          >
            Login
          </Link>
        </div>
      )}

      <div
        onClick={toggleCart}
        className="flex flex-col justify-center text-center bg-lime-700 px-5 py-2 rounded-lg cursor-pointer"
      >
        <p className="text-sm font-bold text-white "> {cart.length} item</p>

        <div className="flex items-center justify-center gap-1 text-white text-sm font-bold">
          <HiShoppingCart />
          <span>View Cart</span>
        </div>
      </div>

      <div className="md:hidden relative">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="text-2xl p-2 rounded-lg hover:bg-gray-100 transition cursor-pointer"
        >
          <FiMenu />
        </button>

        {showMenu && (
          <div className="absolute right-0 top-12 w-56 bg-white rounded-xl shadow-xl border border-gray-200 p-4 flex flex-col gap-2 z-50">
            <Link
              to="/"
              onClick={() => setShowMenu(false)}
              className="px-3 py-2 rounded-lg hover:bg-lime-50 hover:text-lime-700 transition"
            >
              Home
            </Link>

            <Link
              to="/category"
              onClick={() => setShowMenu(false)}
              className="px-3 py-2 rounded-lg hover:bg-lime-50 hover:text-lime-700 transition"
            >
              Categories
            </Link>

            {isLoggedIn ? (
              <>
                <Link
                  to="/profile/orders"
                  onClick={() => setShowMenu(false)}
                  className="px-3 py-2 rounded-lg hover:bg-lime-50 hover:text-lime-700 transition"
                >
                  My Orders
                </Link>

                <Link
                  to="/profile/edit"
                  onClick={() => setShowMenu(false)}
                  className="px-3 py-2 rounded-lg hover:bg-lime-50 hover:text-lime-700 transition"
                >
                  Edit Profile
                </Link>

                <Link
                  to="/profile/address"
                  onClick={() => setShowMenu(false)}
                  className="px-3 py-2 rounded-lg hover:bg-lime-50 hover:text-lime-700 transition"
                >
                  My Address
                </Link>

                <button
                  onClick={handlelogout}
                  className="text-left px-3 py-2 rounded-lg hover:bg-red-50 hover:text-red-600 transition cursor-pointer"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setShowMenu(false)}
                className="px-3 py-2 rounded-lg hover:bg-lime-50 hover:text-lime-700 transition"
              >
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
