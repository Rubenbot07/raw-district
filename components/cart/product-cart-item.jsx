'use client';
import { getSizeById } from "@/actions/get-size-by-id";
import { CartItemQuantityHandler } from "@/components/cart/cart-item-quantity-handler";
import { useState, useEffect } from "react";
import { formatPrice } from "@/utils/formatPrice";
import { useCartStore } from "@/app/stores/cartStore";
import { toast } from "react-toastify";
export const ProductCartItem = ({ product, quantity, itemId, sizeId }) => {
  const [productSize, setProductSize] = useState(null);
  const cartItems = useCartStore((state) => state.cartItems);
  const setCartItems = useCartStore((state) => state.setCartItems);
  const setCartUpdated = useCartStore((state) => state.setCartUpdated);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const removeFromCartLocal = useCartStore((state) => state.removeFromCartLocal);
  const formattedPrice = formatPrice(product.price)  
  
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
    <div className="bg-white p-4 flex items-center gap-4">
      <div className="flex gap-4">
        <figure className="w-20 h-20 py-2">
          <img src={product.product_images[0].thumbnail_url} alt={product.name} />
        </figure>
        <div className="flex flex-col gap-2">
          <h3 className="text-xs">{product.name}</h3>
          <p className="text-xs"> <strong>Size: </strong> {productSize?.size}</p>
          <p className="text-sm font-semibold">{formattedPrice}</p>
          <CartItemQuantityHandler
            product={product}
            sizeId={sizeId}
            itemId={itemId}
            quantity={quantity}
            setCartUpdated={setCartUpdated}
          />
          <button
            onClick={() => handleRemoveFromCart(itemId)}
            className="text-black text-start text-xs"
          >
            REMOVE
          </button>
        </div>
      </div>
    </div>
  );
}