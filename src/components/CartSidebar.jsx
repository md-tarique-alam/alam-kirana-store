import { useContext } from "react";
import { cartcontext } from "../context/cartcontext";
import { authcontext } from "../context/Authcontext";
import { useNavigate } from "react-router-dom";

function CartSidebar() {
const {
  cart,
  handleincrease,
  handledecrease,
  toggleCart,
  isCartOpen,
  removeItem,
   totalPrice,
  } = useContext(cartcontext);
  const { isLoggedIn } = useContext(authcontext);

  const navigate = useNavigate();

  if (!isCartOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex justify-end">
      <div className="w-full sm:w-[400px] md:w-[440px] h-screen bg-slate-100 flex flex-col shadow-2xl">
        
        <div
          className="bg-white px-5 py-4 border-b border-slate-200
                      flex items-center justify-between"
        >
          <div>
            <h2 className="text-xl font-bold text-slate-800">My Cart</h2>

            {cart.length > 0 && (
              <p className="text-xs text-slate-500 mt-0.5">
                {cart.length} {cart.length === 1 ? "item" : "items"}
              </p>
            )}
          </div>

          <button
            onClick={toggleCart}
            className="w-9 h-9 flex items-center justify-center
                     rounded-full bg-slate-100
                     text-slate-600
                     hover:bg-slate-200
                     hover:text-slate-900
                     cursor-pointer transition"
          >
            ✕
          </button>
        </div>

      
        <div className="flex-1 overflow-y-auto hide-scrollbar">
          {cart.length === 0 ? (
           
            <div
              className="h-full flex flex-col items-center
                          justify-center text-center px-8"
            >
              <div
                className="w-20 h-20 rounded-full
                            bg-lime-100
                            flex items-center justify-center mb-5"
              >
                <span className="text-3xl">🛒</span>
              </div>

              <h2 className="text-xl font-bold text-slate-800">
                Your cart is empty
              </h2>

              <p className="text-sm text-slate-500 mt-2 max-w-xs">
                Looks like you haven't added anything to your cart yet.
              </p>
            </div>
          ) : (
            <div className="p-4 space-y-3">
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-xl border border-slate-200
             px-3 py-2.5 flex items-center gap-3
             hover:border-lime-300 transition"
                >
                 
                  <div
                    className="w-16 h-16 flex-shrink-0
                  bg-slate-50 rounded-lg overflow-hidden"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <h2
                        className="text-sm font-semibold text-slate-800
                     line-clamp-1"
                      >
                        {item.name}
                      </h2>

                      <button
                        onClick={() => removeItem(item._id)}
                        className="text-slate-400 hover:text-red-500
                   text-xs cursor-pointer transition"
                      >
                        ✕
                      </button>
                    </div>

                    <p className="text-xs text-slate-500 mt-0.5">{item.unit}</p>

                    <div className="flex items-center justify-between mt-1.5">
                      <span className="text-sm font-bold text-slate-900">
                        ₹{item.price}
                      </span>

                   
                      <div
                        className="flex items-center
                      bg-lime-600 text-white
                      rounded-md overflow-hidden"
                      >
                        <button
                          onClick={() => handledecrease(item._id)}
                          className="w-7 h-7 flex items-center justify-center
                     text-sm font-bold
                     hover:bg-lime-700
                     cursor-pointer transition"
                        >
                          −
                        </button>

                        <span className="w-7 text-center text-xs font-semibold">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() => handleincrease(item._id)}
                          className="w-7 h-7 flex items-center justify-center
                     text-sm font-bold
                     hover:bg-lime-700
                     cursor-pointer transition"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        
        {cart.length > 0 && (
          <div
            className="bg-white border-t border-slate-200
                        p-4 shadow-[0_-4px_12px_rgba(0,0,0,0.04)]"
          >
            <div
              className="flex justify-between
                          text-sm text-slate-600 mb-2"
            >
              <span>Delivery</span>

              <span className="font-medium text-lime-700">Free</span>
            </div>

            <div
              className="border-t border-slate-100 pt-3
                          flex items-center justify-between"
            >
              <span className="text-base font-semibold text-slate-800">
                Total
              </span>

              <span className="text-xl font-bold text-slate-900">
                ₹{totalPrice.toFixed(2)}
              </span>
            </div>

           
            <div className="mt-4">
              {isLoggedIn ? (
                <button
                  onClick={() => {
                    toggleCart();
                    navigate("/checkout");
                  }}
                      className="w-full
                           bg-lime-700
                           hover:bg-lime-800
                           text-white
                           py-3
                           rounded-xl
                           text-sm
                           font-semibold
                           cursor-pointer
                           transition"
                >
                  Proceed to Checkout
                </button>
              ) : (
                <button
                  onClick={() => {
                    toggleCart();
                    navigate("/login");
                  }}
                  className="w-full
                           bg-lime-700
                           hover:bg-lime-800
                           text-white
                           py-3
                           rounded-xl
                           text-sm
                           font-semibold
                           cursor-pointer
                           transition"
                >
                  Login to Proceed
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartSidebar;
