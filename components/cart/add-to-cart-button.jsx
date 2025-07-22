'use client';
import { useState } from "react";
import { useCartStore } from "@/app/stores/cartStore";
import { useCartUIStore } from "@/app/stores/cartUIStore";
export function AddToCartButton({ product, product_size_id, productId, quantity = 1, unit_price }) {
  const [loading, setLoading] = useState(false)
  const setCartUpdated = useCartStore((state) => state.setCartUpdated);
  const addToCart = useCartStore((state) => state.addToCart);
  const cartItems = useCartStore((state) => state.cartItems);
  const setCartItems = useCartStore((state) => state.setCartItems);
  const setOpenCart = useCartUIStore((state) => state.setOpenCart);
  const setOpenPreCart = useCartUIStore((state) => state.setOpenPreCart);
  const addToCartLocal = useCartStore((state) => state.addToCartLocal);
  const handleAddToCart = async () => {
    setLoading(true)
    const previousCart = [...cartItems];
    addToCartLocal({ product, productId, quantity, product_size_id});
    setOpenCart(true)
    setOpenPreCart(false)
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
      className=" px-4 py-2 bg-white border-[1px] border-black text-sm w-full"
      onClick={handleAddToCart}
    >
      {loading ? 'Loading' : 'ADD TO CART'}
    </button>
  );
}