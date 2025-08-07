'use client';
import { useState } from "react";
import { useUserStore } from "@/app/stores/userStore";
import { useCartStore } from "@/app/stores/cartStore";
import { useCartUIStore } from "@/app/stores/cartUIStore";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";
export const AddToCartButton = ({ product, product_size_id, productId, quantity = 1, unit_price }) => {
  const [loading, setLoading] = useState(false)
  const setCartUpdated = useCartStore((state) => state.setCartUpdated);
  const addToCart = useCartStore((state) => state.addToCart);
  const cartItems = useCartStore((state) => state.cartItems);
  const setCartItems = useCartStore((state) => state.setCartItems);
  const setOpenCart = useCartUIStore((state) => state.setOpenCart);
  const setOpenPreCart = useCartUIStore((state) => state.setOpenPreCart);
  const addToCartLocal = useCartStore((state) => state.addToCartLocal);
  const user = useUserStore((state) => state.user);
  const tAddToCart = useTranslations("Cart");


  const handleAddToCart = async () => {
  setLoading(true);

  const previousCart = [...cartItems];
  addToCartLocal({ product, productId, quantity, product_size_id });
  setOpenCart(true);
  setOpenPreCart(false);
  if(user) {
      const result = await addToCart({
        productId,
        quantity,
        unit_price,
        product_size_id,
      });

    if (!result.success) {
      setCartItems(previousCart);
      toast.error("Failed to add product to cart" + result.error);
    }
  }

  setCartUpdated(true);
  toast.success("Product added to cart successfully");
  setLoading(false);
};

  return (
    <button
      className="px-4 py-2 bg-white border border-black text-sm w-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-black disabled:opacity-50"
      onClick={handleAddToCart}
      disabled={loading}
      aria-busy={loading}
      aria-label={loading ? tAddToCart("loadingAddToCart") : tAddToCart("addToCart")}
    >
      {loading ? tAddToCart("loadingAddToCart") : tAddToCart("addToCart")}
    </button>
  );
}