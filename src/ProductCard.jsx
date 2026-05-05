function ProductCard({ product, onAddcart, onIncrease, onDecrease }) {
  return (
    <div>
      <img src={product.image} width="180" />
      <h2>{product.name}</h2>
      <h4>Rs {product.price} / kg</h4>
      <button onClick={() => onAddcart(product)}>Add to cart</button>
      <button onClick={() => onIncrease(product.id)}>
        Qty+
      </button>
      <button onClick={() => onDecrease(product.id)}>
        Qty-
      </button>
    </div>
  );
}
export default ProductCard;
