function ProductCard({
  product,
  onAddcart,
  onIncrease,
  onDecrease,
  btnControl,
  exist
}) {
  return (
    <div className=" bg-white-100 hover:shadow-lg border border-blue-300 rounded-lg ">
      <div className="flex flex-col gap-2 rounded-xl">
        <img
          className="w-full h-50 object-cover rounded "
          src={product.image}
        />
        <h2 className="text-md font-medium ml-2 mb-3">{product.name}</h2>
        <h4 className="text-md font-bold ml-2">Rs {product.price}</h4>
      </div>

      <div className="flex justify-between m-2">
        <p className="pr-10 pl-2 pt-1 pb-1 bg-slate-100 rounded">1 {product.unit}</p>

        {exist ? (
          <div className="flex items-center text-lg font-semibold ">
            <button onClick={() => onDecrease(product.id)} className="bg-orange-500 px-2 border border-blue-200 hover:text-white rounded" >-</button>
            <span className="px-2 bg-white border border-blue-200">{exist.quantity}</span>

            <button onClick={() => onIncrease(product.id)} className="bg-orange-500 px-2 border border-blue-200 hover:text-white rounded" >+</button>
          </div>
        ) : (
          <button
            className="pl-5 pr-5 pt-1 pb-1 text-red-900 hover:text-white bg-orange-200 hover:bg-orange-500 rounded cursor-pointer"
            onClick={() => onAddcart(product)}
          >
           🛒Add 
          </button>
        )}
      </div>
    </div>
  );
}
export default ProductCard;
