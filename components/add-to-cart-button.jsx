'use client';
import { addToCart } from "@/actions/add-to-cart";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartContext } from "@/app/context/CartContext";

export function AddToCartButton({ product_size_id, productId, quantity = 1, unit_price }) {
  const [loading, setLoading] = useState(false);
  const { setCartUpdated } = useCartContext();
  const handleAddToCart = async () => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
      onClick={handleAddToCart}
      disabled={loading}
    >
      {loading ? "Adding..." : "Add to cart"}
    </button>
  );
}