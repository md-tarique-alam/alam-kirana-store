import { createContext } from "react";
import { useState } from "react";
import ProductCard from "../components/ProductCard";
export const cartcontext = createContext();

function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  console.log(cart);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleaddcart = (product) => {
    const exist = cart.find((item) => item.id === product.id);

    if (exist) {
      const updated = cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      );
      setCart(updated);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };
  const handleincrease = (id) => {
    const updated = cart.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
    );
    setCart(updated);
  };

  const handledecrease = (id) => {
    const updated = cart
      .map((item) => {
        if (item.id === id) {
          if (item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return null;
        }
        return item;
      })
      .filter((item) => item !== null);
    setCart(updated);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const removeItem = (id) => {
    const updatedcart = cart.filter((item) => item.id !== id);
    setCart(updatedcart);
  };

  const totalPrice = cart.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  return (
    <div>
      <cartcontext.Provider value={{ cart, setCart, handleaddcart, handleincrease, handledecrease, toggleCart, isCartOpen , removeItem, totalPrice }}>
        {children}
      </cartcontext.Provider>
    </div>
  );
}

export default CartProvider;
