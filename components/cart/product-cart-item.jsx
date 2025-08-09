'use client';
import { getSizeById } from "@/actions/get-size-by-id";
import { CartItemQuantityHandler } from "@/components/cart/cart-item-quantity-handler";
import { useState, useEffect } from "react";
import { useFormatPrice } from "@/utils/formatPrice";
import { useCartStore } from "@/app/stores/cartStore";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";
export const ProductCartItem = ({ product, quantity, itemId, sizeId }) => {
  const [productSize, setProductSize] = useState(null);
  const cartItems = useCartStore((state) => state.cartItems);
  const setCartItems = useCartStore((state) => state.setCartItems);
  const setCartUpdated = useCartStore((state) => state.setCartUpdated);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const removeFromCartLocal = useCartStore((state) => state.removeFromCartLocal);
  const formattedPrice = useFormatPrice()  
  const t = useTranslations("Cart");
  const tCommon = useTranslations("Common");
  
  useEffect(() => {
    const fetchProductSize = async () => {
      const { size, error } = await getSizeById(sizeId);
      if (error) {
        console.error("Error fetching product size:", error);
        return;
      }
      setProductSize(size);
    };
    fetchProductSize();
  }, [sizeId]);

  const handleRemoveFromCart = async (itemId) => {
    const previousCart = [...cartItems]
    removeFromCartLocal(itemId)
    try {
      await removeFromCart(itemId);
      setCartUpdated(true);
      toast.error('Product removed from cart successfully');
    } catch (error) {
      setCartItems(previousCart)
      console.error("Error removing item from cart:", error);
    }
  }

  return (
     <article
      className="bg-white p-4 flex items-center gap-4"
      aria-label={`Cart item: ${product.name}`}
    >
      <figure className="w-20 h-20 py-2" aria-hidden="true">
        <img
          src={product.product_images[0]?.thumbnail_url}
          alt={`Thumbnail of ${product.name}`}
          className="w-full h-full object-cover"
        />
      </figure>

      <div className="flex flex-col gap-2 w-full">
        <header className="text-xs font-medium" id={`product-name-${itemId}`}>
          {product.name}
        </header>

        <p className="text-xs">
          <strong>{tCommon("size")}:</strong> {productSize?.size}
        </p>

        <p className="text-sm font-semibold">${formattedPrice(product.price)}</p>

        {/* Quantity selector */}
        <CartItemQuantityHandler
          product={product}
          sizeId={sizeId}
          itemId={itemId}
          quantity={quantity}
          setCartUpdated={setCartUpdated}
        />

        <button
          onClick={() => handleRemoveFromCart(itemId)}
          className="text-black text-start text-xs underline focus:outline-black focus-visible:ring-2"
          aria-label={`Remove ${product.name} from cart`}
        >
          {t("removeFromCart")}
        </button>
      </div>
    </article>
  );
}