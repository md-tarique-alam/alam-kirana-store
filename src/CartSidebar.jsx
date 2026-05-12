function CartSidebar({
  cart,
  toogleCart,
  isCartOpen,
  onDecrease,
  onIncrease,
  removeItem,
  totalPrice
}) {
  if (!isCartOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
      <div className="w-100 h-screen bg-slate-50 flex flex-col">
        <div className="bg-white p-6 border-b border-slate-200 flex justify-between items-center shadow-sm">
          <h2 className="text-2xl font-bold text-gray-800">My Cart</h2>

          <button
            onClick={toogleCart}
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
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />

                    

                    <div>
                      <h2 className="font-semibold text-md text-gray-800">
                        {item.name}
                      </h2>

                      <p className="text-sm text-gray-500">1{item.unit}</p>

                      <h4 className="font-bold text-black mt-1">
                        ₹{item.price}
                      </h4>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 bg-lime-700 text-white px-3 py-1 rounded-lg absolute bottom-2 right-2">
                    <button
                      onClick={() => onDecrease(item.id)}
                      className="text-lg font-bold cursor-pointer"
                    >
                      -
                    </button>

                    <span className="w-3 text-center font-semibold">{item.quantity}</span>

                    <button
                      onClick={() => onIncrease(item.id)}
                      className="text-lg font-bold cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                   <button onClick={()=>removeItem(item.id)} className="absolute top-2 right-4 cursor-pointer">✕</button> 
                </div>
              ))}
             
            </div>
          )}
        </div>
        {cart.length > 0 && (
          <div className="bg-white p-4 mt-2 rounded-2xl">
            <div className="flex justify-between mb-2 text-gray-700">
              <span>Delivery</span>
              <span className="text-grey-900 font-medium">Free</span>
            </div>

            <hr className="my-3" />

            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>₹{totalPrice}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartSidebar;
