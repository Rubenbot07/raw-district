'use client';
import { getSizeById } from "@/actions/get-size-by-id";
import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { formatPrice } from "@/utils/formatPrice";
import { useCartStore } from "@/app/stores/cartStore";
import { useUserStore } from "@/app/stores/userStore";
import { toast } from "react-toastify";
export const ProductCartItem = ({ product, quantity, itemId, sizeId }) => {
  const [open, setOpen] = useState(false);
  const [productSize, setProductSize] = useState(null);
  const [rotate, setRotate] = useState(false);
  const cartItems = useCartStore((state) => state.cartItems);
  const setCartItems = useCartStore((state) => state.setCartItems);
  const setCartUpdated = useCartStore((state) => state.setCartUpdated);
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const removeFromCartLocal = useCartStore((state) => state.removeFromCartLocal);
  const updateItemQuantityLocal = useCartStore((state) => state.updateItemQuantityLocal);
  const user = useUserStore((state) => state.user);

  const formattedPrice = formatPrice(product.price)  
  useEffect(() => {
    const fetchProductSize = async () => {
      const { size, error } = await getSizeById(sizeId);
      if (error) {
        console.error("Error fetching product size:", error);
        return;
      }
      setProductSize(size);
      // setCartUpdated(false);
    };
    fetchProductSize();
  }, [sizeId]);

  const handleQuantityChange = async (newQuantity) => {
    const previousQuantity = quantity;
    updateItemQuantityLocal(itemId, newQuantity);
    if(user) {
      const result = await addToCart({
        product,
        productId: product.id,
        quantity: newQuantity,
        unit_price: product.price,
        product_size_id: sizeId,
        replaceQuantity: true
      });

      if (!result.success) {
        updateItemQuantityLocal(itemId, previousQuantity);
        toast.error("Failed to update product quantity in cart" + result.error);
        
      }
    }

    setCartUpdated(true);
    toast.success(`Product quantity updated successfully to ${newQuantity}`);

  }
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
  const handleAnimation = () => {
    setRotate(!rotate);
    setOpen(!open);
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
          <div onClick={handleAnimation} className="relative flex items-center justify-between gap-2 border border-black p-2 max-w-24">
            <button>{quantity}</button>
            <span className={`transform transition-transform duration-300 ${rotate ? "rotate-180" : ""}`} onClick={() => setRotate(!rotate)}>
              <ChevronDown />
            </span>
            <ul className={`absolute top-full left-0 h-24 w-full border border-black bg-white overflow-y-scroll px-3 ${open ? "block" : "hidden"}`}>
              {[...Array(10)].map((_, i) => (
                  <li key={i} onClick={() => handleQuantityChange(i + 1)}>
                    {i + 1}
                  </li>
              ))}
            </ul>
          </div>
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