'use client';
export const ProductCartItem = ({ product, quantity, removeFromCart }) => {
  return (
    <div className="bg-white p-4 rounded shadow-md flex items-center gap-4">
      <div>
        <h3>{product.name}</h3>
        <p>Price: ${product.price}</p>
        <p>Quantity: {quantity}</p>
        <button
          onClick={removeFromCart}
          className="text-red-500 hover:underline"
        >
          Remove from Cart
        </button>
      </div>
    </div>
  );
}