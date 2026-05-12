import { HiShoppingCart } from "react-icons/hi"; 
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";

function ProductCard({
  product,
  onAddcart,
  onIncrease,
  onDecrease,
  btnControl,
  exist
}) {
  return (
    <div className=" bg-white-100 hover:shadow-lg border border-slate-200 rounded-lg ">
      <div className="flex flex-col gap-2 rounded-xl">
        <img
          className="w-full h-50 object-contain rounded "
          src={product.image}
        />
        <h2 className="text-md font-medium ml-2 mb-3">{product.name}</h2>
        <h4 className="text-md font-bold ml-2">Rs {product.price}</h4>
      </div>

      <div className="flex justify-between m-2">
        <p className="pl-1 pr-5  py-1 bg-slate-100 rounded">1 {product.unit}</p>

        {exist ? (
          <div className="flex items-center gap-2 bg-lime-700 text-white px-2 py-1 rounded-md">
            <button onClick={() => onDecrease(product.id)} className="cursor-pointer" ><FaMinus/></button>
            <span className="w-3 text-center font-bold">{exist.quantity}</span>

            <button onClick={() => onIncrease(product.id)} className="cursor-pointer" ><FaPlus/></button>
          </div>
        ) : (
          <button
            className="flex items-center gap-1 px-4 py-1 text-lime-900 bg-lime-200 hover:bg-lime-800 hover:text-white rounded-md cursor-pointer"
            onClick={() =>onAddcart(product)}
          >
           <HiShoppingCart/>Add 
          </button>
        )}
      </div>
    </div>
  );
}
export default ProductCard;
