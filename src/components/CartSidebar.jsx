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
    <div className="fixed inset-0 bg-black/70 z-50 flex justify-end">
      <div className="w-100 h-screen bg-slate-50 flex flex-col">
        <div className="bg-white p-5 border-b border-slate-200 flex justify-between items-center shadow-sm">
          <h2 className="text-2xl font-bold text-gray-800">My Cart</h2>

          <button
            onClick={toggleCart}
            className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center cursor-pointer"
          >
            ✕
          </button>
        </div>
        <div className="flex-1 overflow-y-auto mt-1 hide-scrollbar">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center px-6">
              <h2 className="text-2xl font-bold text-gray-700 mb-2">
                Your Cart is Empty
              </h2>

              <p className="text-gray-500 text-sm">
                Looking like you haven't added anything to your cart yet!
              </p>
            </div>
          ) : (
            <div className="space-y-2 p-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-2 flex items-center justify-between relative shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />

                    <div>
                      <h2 className="font-semibold text-md text-gray-800">
                        {item.title}
                      </h2>

                      <h3 className="text-sm text-gray-600">1{item.unit}</h3>

                      <h4 className="font-bold text-black mt-1">
                        ₹{item.price}
                      </h4>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 bg-lime-700 text-white px-3 py-1 rounded-lg absolute bottom-2 right-2">
                    <button
                      onClick={() => handledecrease(item.id)}
                      className="text-lg font-bold cursor-pointer"
                    >
                      -
                    </button>

                    <span className="w-3 text-center font-semibold">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => handleincrease(item.id)}
                      className="text-lg font-bold cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                  <div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="absolute top-2 right-4 cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {cart.length > 0 && (
          <div className="bg-white p-2 mt-2 rounded-2xl">
            <div className="flex justify-between mb-2 mx-2 text-gray-700">
              <span>Delivery</span>
              <span className="text-grey-900 font-medium">Free</span>
            </div>

            <hr className="my-3" />

            <div className="flex justify-between font-bold text-lg mx-2">
              <span>Total</span>
              <span>₹{totalPrice.toFixed(2)}</span>
            </div>
          </div>
        )}
         <div className="p-3">
          {isLoggedIn ? (
            <button
              onClick={() => {
                toggleCart(); 
                navigate("/checkout");
              }}
              className="w-full bg-lime-800 hover:bg-lime-900 text-white py-3 rounded-xl text-lg font-semibold cursor-pointer"
            >
              Proceed to Checkout
            </button>
          ) : (
            <button
              onClick={() => {
                toggleCart(); navigate("/login");
              }}
              className="w-full bg-lime-800 hover:bg-lime-900 text-white py-3 rounded-xl text-lg font-semibold cursor-pointer"
            >
              Login to Proceed
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CartSidebar;
