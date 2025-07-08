'use client';
import { useState } from "react";
import { useCartContext } from "@/app/context/CartContext";

export function AddToCartButton({ product, product_size_id, productId, quantity = 1, unit_price }) {
  const [loading, setLoading] = useState(false)
  const { setCartUpdated, addToCart, addToCartLocal, cartItems, setCartItems } = useCartContext();
  const handleAddToCart = async () => {
    setLoading(true)
    const previousCart = [...cartItems];
    addToCartLocal({ product, productId, quantity, product_size_id, unit_price });
    try {
      await addToCart({
        productId,
        quantity,
        unit_price,
        product_size_id
      });
      setCartUpdated(true);
      console.log('Product added to cart successfully');
    } catch (error) {
      console.error('Error adding to cart:', error);
      setCartItems(previousCart);
    } finally {
      setLoading(false)
    }
  };

  return (
    <button
      className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
      onClick={handleAddToCart}
    >
      {loading ? 'Loading' : 'Add To Cart'}
    </button>
  );
}