import { useState } from "react";
import { toast } from "react-toastify";
import { ChevronDown } from "lucide-react";
import { useCartStore } from "@/app/stores/cartStore";
import { useUserStore } from "@/app/stores/userStore";
export const CartItemQuantityHandler = ({product, sizeId, itemId, quantity, setCartUpdated }) => {
    const addToCart = useCartStore((state) => state.addToCart);
    const updateItemQuantityLocal = useCartStore((state) => state.updateItemQuantityLocal);
    const user = useUserStore((state) => state.user);
    const [open, setOpen] = useState(false);
    const [rotate, setRotate] = useState(false);
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

    const handleAnimation = () => {
        setRotate(!rotate);
        setOpen(!open);
    }
    return (
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
    ) 
}