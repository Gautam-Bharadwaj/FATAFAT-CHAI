export default function CartItem({
  name,
  price,
  quantity,
  itemId,
  onQuantityChange,
  onRemove,
}) {
  return (
    <div
      className="cart-item flex items-center gap-4 border-b py-3"
      data-testid="cart-item"
    >
      <div className="flex-1">
        <p className="font-medium" data-testid="cart-item-name">
          {name}
        </p>
        <p
          className="text-sm text-stone-600"
          data-testid="cart-item-unit-price"
        >
          ₹{price} each
        </p>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label="decrease quantity"
          data-testid="qty-decrease"
          onClick={() => onQuantityChange(quantity - 1)}
        >
          −
        </button>
        <span data-testid="cart-item-qty">{quantity}</span>
        <button
          type="button"
          aria-label="increase quantity"
          data-testid="qty-increase"
          onClick={() => onQuantityChange(quantity + 1)}
        >
          +
        </button>
      </div>
      <p
        className="w-24 text-right font-semibold"
        data-testid="cart-item-line-total"
      >
        ₹{price * quantity}
      </p>
      <button
        type="button"
        className="text-red-600 text-sm"
        data-testid="remove-item"
        onClick={() => onRemove(itemId)}
      >
        Remove
      </button>
    </div>
  );
}
