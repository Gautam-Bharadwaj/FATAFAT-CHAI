export default function ProductCard({ name, price, image, onAddToCart }) {
  return (
    <div
      className="product-card border rounded-lg p-4 shadow-sm"
      data-testid="product-card"
    >
      {image ? (
        <img
          src={image}
          alt={name}
          className="h-40 w-full object-contain mb-2"
          data-testid="product-image"
        />
      ) : null}
      <h3 className="text-lg font-semibold" data-testid="product-name">
        {name}
      </h3>
      <p className="text-amber-800 font-bold mt-2" data-testid="product-price">
        ₹{price}
      </p>
      <button
        type="button"
        className="mt-3 px-4 py-2 bg-orange-600 text-white rounded"
        data-testid="add-to-cart"
        onClick={onAddToCart}
      >
        Add to Cart
      </button>
    </div>
  );
}
