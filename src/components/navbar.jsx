import { useContext, useState } from "react";
import { HiOutlineShoppingCart, HiShoppingCart } from "react-icons/hi";
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

  const handlelogout = async () => {
    await logout();
    setShowMenu(false);
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between gap-3 py-3">
          <Link
            to="/"
            onClick={() => setShowMenu(false)}
            className="flex-shrink-0"
          >
            <h1 className="text-xl sm:text-2xl font-bold text-slate-800">
              Alam <span className="text-lime-600">Kirana</span>
            </h1>
          </Link>

          <div className="hidden md:block relative flex-1 max-w-xl">
            <HiOutlineSearch
              className="absolute left-3 top-1/2
                       -translate-y-1/2
                       text-slate-400 text-xl"
            />

            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2.5
                       bg-slate-50
                       border border-slate-300
                       rounded-xl
                       text-sm
                       outline-none
                       focus:border-lime-500
                       focus:ring-2 focus:ring-lime-100
                       transition"
            />
          </div>

          <div className="hidden md:flex items-center gap-2">
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setShowMenu(!showMenu)}
                  className="flex items-center gap-2
                           px-3 py-2
                           rounded-xl
                           text-sm font-semibold
                           text-slate-700
                           hover:bg-slate-100
                           cursor-pointer
                           transition"
                >
                  <CgProfile className="text-xl text-slate-600" />
                  Profile
                </button>

                {showMenu && (
                  <div
                    className="absolute right-0 top-12
                             w-52
                             bg-white
                             border border-slate-200
                             rounded-xl
                             shadow-lg
                             p-2
                             z-50"
                  >
                    <Link
                      to="/profile/edit"
                      onClick={() => setShowMenu(false)}
                      className="flex items-center gap-3
                               px-3 py-2.5
                               rounded-lg
                               text-sm text-slate-700
                               hover:bg-lime-50
                               hover:text-lime-700
                               transition"
                    >
                      <CgProfile />
                      Edit Profile
                    </Link>

                    <Link
                      to="/profile/orders"
                      onClick={() => setShowMenu(false)}
                      className="flex items-center gap-3
                               px-3 py-2.5
                               rounded-lg
                               text-sm text-slate-700
                               hover:bg-lime-50
                               hover:text-lime-700
                               transition"
                    >
                      <HiOutlineShoppingCart />
                      My Orders
                    </Link>

                    <Link
                      to="/profile/address"
                      onClick={() => setShowMenu(false)}
                      className="flex items-center gap-3
                               px-3 py-2.5
                               rounded-lg
                               text-sm text-slate-700
                               hover:bg-lime-50
                               hover:text-lime-700
                               transition"
                    >
                      <IoLocationOutline />
                      My Address
                    </Link>

                    <div className="my-1 border-t border-slate-100" />

                    <button
                      onClick={handlelogout}
                      className="w-full flex items-center gap-3
                               px-3 py-2.5
                               rounded-lg
                               text-sm text-left
                               text-slate-700
                               hover:bg-red-50
                               hover:text-red-600
                               cursor-pointer
                               transition"
                    >
                      <IoLogOutOutline />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setShowMenu(false)}
                className="px-4 py-2
                         rounded-xl
                         text-sm font-semibold
                         text-slate-700
                         hover:bg-lime-50
                         hover:text-lime-700
                         transition"
              >
                Login
              </Link>
            )}

            <div
              onClick={toggleCart}
              className="flex items-center gap-2
                       bg-lime-600
                       text-white
                       px-4 py-2
                       rounded-xl
                       cursor-pointer
                       hover:bg-lime-700
                       transition"
            >
              <HiShoppingCart className="text-xl" />

              <span className="text-sm font-semibold">Cart</span>

              <span
                className="bg-white text-lime-700
                             min-w-5 h-5
                             px-1
                             rounded-full
                             flex items-center justify-center
                             text-xs font-bold"
              >
                {cart.length}
              </span>
            </div>
          </div>

          <div className="flex md:hidden items-center gap-2">
            <div
              onClick={toggleCart}
              className="relative p-2
                       rounded-lg
                       bg-lime-600
                       text-white
                       cursor-pointer"
            >
              <HiShoppingCart className="text-xl" />

              {cart.length > 0 && (
                <span
                  className="absolute -top-1 -right-1
                           min-w-5 h-5
                           px-1
                           bg-slate-800
                           text-white
                           rounded-full
                           flex items-center justify-center
                           text-[10px] font-bold"
                >
                  {cart.length}
                </span>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-2
                         rounded-lg
                         text-slate-700
                         hover:bg-slate-100
                         cursor-pointer
                         transition"
              >
                <FiMenu className="text-2xl" />
              </button>

              {showMenu && (
                <div
                  className="absolute right-0 top-12
                           w-56
                           bg-white
                           border border-slate-200
                           rounded-xl
                           shadow-lg
                           p-2
                           z-50"
                >
                  <Link
                    to="/"
                    onClick={() => setShowMenu(false)}
                    className="block px-3 py-2.5
                             rounded-lg
                             text-sm
                             hover:bg-lime-50
                             hover:text-lime-700
                             transition"
                  >
                    Home
                  </Link>

                  <Link
                    to="/category"
                    onClick={() => setShowMenu(false)}
                    className="block px-3 py-2.5
                             rounded-lg
                             text-sm
                             hover:bg-lime-50
                             hover:text-lime-700
                             transition"
                  >
                    Categories
                  </Link>

                  {isLoggedIn ? (
                    <>
                      <Link
                        to="/profile/orders"
                        onClick={() => setShowMenu(false)}
                        className="block px-3 py-2.5
                                 rounded-lg
                                 text-sm
                                 hover:bg-lime-50
                                 hover:text-lime-700
                                 transition"
                      >
                        My Orders
                      </Link>

                      <Link
                        to="/profile/edit"
                        onClick={() => setShowMenu(false)}
                        className="block px-3 py-2.5
                                 rounded-lg
                                 text-sm
                                 hover:bg-lime-50
                                 hover:text-lime-700
                                 transition"
                      >
                        Edit Profile
                      </Link>

                      <Link
                        to="/profile/address"
                        onClick={() => setShowMenu(false)}
                        className="block px-3 py-2.5
                                 rounded-lg
                                 text-sm
                                 hover:bg-lime-50
                                 hover:text-lime-700
                                 transition"
                      >
                        My Address
                      </Link>

                      <button
                        onClick={handlelogout}
                        className="w-full text-left
                                 px-3 py-2.5
                                 rounded-lg
                                 text-sm
                                 hover:bg-red-50
                                 hover:text-red-600
                                 cursor-pointer
                                 transition"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <Link
                      to="/login"
                      onClick={() => setShowMenu(false)}
                      className="block px-3 py-2.5
                               rounded-lg
                               text-sm
                               hover:bg-lime-50
                               hover:text-lime-700
                               transition"
                    >
                      Login
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="md:hidden pb-3">
          <div className="relative">
            <HiOutlineSearch
              className="absolute left-3 top-1/2
                       -translate-y-1/2
                       text-slate-400 text-xl"
            />

            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full
                       pl-10 pr-4 py-2.5
                       bg-slate-50
                       border border-slate-200
                       rounded-xl
                       text-sm
                       outline-none
                       focus:border-lime-500
                       focus:ring-2 focus:ring-lime-100
                       transition"
            />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
