export default function CartItem({
  name,
  price,
  quantity,
  itemId,
  image,
  onQuantityChange,
  onRemove,
}) {
  return (
    <div
      className="flex flex-col sm:flex-row items-center justify-between p-4 bg-white/50 border border-stone-200 rounded-md shadow-sm transform hover:scale-[1.01] transition-transform"
      data-testid="cart-item"
    >
      <div className="flex items-center gap-6">
        <div className="w-24 h-24 bg-stone-100 rounded-lg overflow-hidden p-2 flex items-center justify-center">
          <img
            src={image || '/assets/chai-logo.png'}
            alt={name}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="text-center sm:text-left">
          <h3 className="text-3xl font-bold text-amber-900 font-['Amatic_SC']" data-testid="cart-item-name">
            {name}
          </h3>
          <p className="text-lg text-stone-500 font-['Patrick_Hand']" data-testid="cart-item-unit-price">
            ₹{price} each
          </p>
          <div className="flex items-center gap-3 mt-2">
            <button
              type="button"
              aria-label="decrease quantity"
              data-testid="qty-decrease"
              onClick={() => onQuantityChange(quantity - 1)}
              className="w-8 h-8 rounded-full border-2 border-stone-300 flex items-center justify-center hover:border-orange-500 hover:text-orange-600 transition-colors font-bold"
            >
              −
            </button>
            <span data-testid="cart-item-qty" className="text-xl font-bold font-['Patrick_Hand']">{quantity}</span>
            <button
              type="button"
              aria-label="increase quantity"
              data-testid="qty-increase"
              onClick={() => onQuantityChange(quantity + 1)}
              className="w-8 h-8 rounded-full border-2 border-stone-300 flex items-center justify-center hover:border-orange-500 hover:text-orange-600 transition-colors font-bold"
            >
              +
            </button>
          </div>
          <button
            type="button"
            className="text-red-500 text-sm font-['Patrick_Hand'] underline cursor-pointer mt-1"
            data-testid="remove-item"
            onClick={() => onRemove(itemId)}
          >
            Remove
          </button>
        </div>
      </div>
      <div className="mt-4 sm:mt-0 text-3xl font-bold text-orange-800 font-['Amatic_SC']" data-testid="cart-item-line-total">
        ₹{price * quantity}
      </div>
    </div>
  );
}
