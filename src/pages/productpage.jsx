import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { cartcontext } from "../context/cartcontext";
import { HiShoppingCart } from "react-icons/hi";
import { BiInfoCircle, BiLeaf, BiShield } from "react-icons/bi";
import { IoReturnUpBack } from "react-icons/io5";
import { FcCancel } from "react-icons/fc";
import { LuLeafyGreen } from "react-icons/lu";
import axios from "axios";

function ProductPage() {
  const { id } = useParams();

  const { cart, handleaddcart, handleincrease, handledecrease } =
    useContext(cartcontext);

  const [product, setProduct] = useState(null);
  const [error, SetError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    findproduct();
  }, [id]);

  const findproduct = async () => {
    try {
      setLoading(true);
      SetError("");
      const res = await axios.get(`http://localhost:5000/products/${id}`);
      setProduct(res.data);
    } catch (error) {
      SetError(error.response?.data?.message || "something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h2>loading...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  const exist = cart.find((item) => item._id === product._id);

  return (
    <div>
      <div className="w-full flex justify-between items-center py-6 px-25 bg-slate-100">
        <h2 className="text-xl font-semibold">{product.name}</h2>
        <Link className="text-md hover:text-lime-900 font-semibold" to="/">
          Home
        </Link>
      </div>

      <div className=" flex gap-3 pl-15 pt-6">
        <img
          className=" h-96 gap-2 object-cover rounded-xl hover:scale-105 transition"
          src={product.image}
        />

        <div className="flex flex-col pl-9">
          <h1 className="text-4xl font-medium mb-2 ">{product.name}</h1>
          <div className="flex mb-2">
            <span className="text-sm">Seller:</span>
            <p className="text-sm font-semibold">Alam Store</p>
          </div>

          <hr className="my-3 border-slate-300" />

          <h2 className="text-3xl font-semibold mt-4 mb-6">₹{product.price}</h2>
          <p className="text-md mb-1">Choose Variants</p>
          <div className="w-45 p-2 bg-lime-100 border border-lime-600 rounded-md flex flex-col justify-center items-center mb-8">
            <h2 className="text-md font-medium mb-1">1 {product.unit}</h2>
            <h2 className=" text-md">₹{product.price}</h2>
          </div>

          {exist ? (
            <div className="flex justify-between items-center gap-2 bg-lime-800 text-white w-35 h-13 px-4 py-3 rounded-lg mb-2 ">
              <button
                className="text-md font-semibold cursor-pointer"
                onClick={() => handledecrease(product._id)}
              >
                {" "}
                -{" "}
              </button>
              <span className="text-md">{exist.quantity}</span>
              <button
                className="text-md font-semibold cursor-pointer"
                onClick={() => handleincrease(product._id)}
              >
                {" "}
                +{" "}
              </button>
            </div>
          ) : (
            <button
              className="flex items-center justify-center gap-1 px-4 py-3 w-35 h-13 bg-lime-800 text-white border border-lime-600 rounded-lg cursor-pointer mb-2 hover:scale-102 transition"
              onClick={() => handleaddcart(product)}
            >
              <HiShoppingCart />
              Add to cart
            </button>
          )}
          <div className="flex flex-col gap-5 bg-slate-100 pl-3 pr-200 py-4 ">
            <div className="flex items-center text-center gap-1">
              <span className="text-green-500 text-3xl">
                <LuLeafyGreen />{" "}
              </span>
              <p>Vegetarian</p>
            </div>
            <div className="flex items-center text-center gap-1">
              <span className="text-3xl">
                <FcCancel />
              </span>
              <p> Product is cancellable till</p>
            </div>
            <div className="flex items-center text-center gap-1">
              <span className="text-3xl">
                <IoReturnUpBack />{" "}
              </span>{" "}
              <p className="text-md font-medium">Non-Returnable</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProductPage;
