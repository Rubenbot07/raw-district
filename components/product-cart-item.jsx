'use client';
import { useCartContext } from "@/app/context/CartContext";
import { removeFromCart } from "@/actions/remove-from-cart";
import { getSizeById } from "@/actions/get-size-by-id";
import { useState, useEffect } from "react";
import { ChevronDown } from "./icons/chevron-down-icon";
export const ProductCartItem = ({ product, quantity, itemId, sizeId }) => {
  const [open, setOpen] = useState(false);
  const [productSize, setProductSize] = useState(null);
  const [rotate, setRotate] = useState(false);
  const { setCartUpdated, addToCart, updateItemQuantityLocal } = useCartContext();
  const formatedPrice = product.price.toLocaleString('es-CO')
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
    try {
      await addToCart({
        product,
        productId: product.id,
        quantity: newQuantity,
        unit_price: product.price,
        product_size_id: sizeId,
        replaceQuantity: true
      });
      setCartUpdated(true);
    } catch (error) {
      console.error("Error adding to cart:", error);
      updateItemQuantityLocal(itemId, previousQuantity);
    }
  }
  const handleRemoveFromCart = async (itemId) => {
    try {
      await removeFromCart(itemId);
      setCartUpdated(true);
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  }
  const handleAnimation = () => {
    setRotate(!rotate);
    setOpen(!open);
  }
  return (
    <div className="bg-white p-4 rounded shadow-md flex items-center gap-4">
      <div className="flex gap-4">
        <figure className="w-20 h-20 py-2">
          <img src={product.product_images[0].thumbnail_url} alt={product.name} />
        </figure>
        <div className="flex flex-col gap-1">
          <h3 className="text-xs">{product.name}</h3>
          <p className="text-xs"> <strong>Size: </strong> {productSize?.size}</p>
          <p className="text-sm font-semibold">${formatedPrice}</p>
          <div onClick={handleAnimation} className="relative flex items-center justify-between gap-2 border border-black p-2 max-w-24">
            <button>{quantity}</button>
            <span className={`transform transition-transform duration-300 ${rotate ? "rotate-180" : ""}`} onClick={() => setRotate(!rotate)}><ChevronDown /></span>
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
            className="text-black text-start"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}