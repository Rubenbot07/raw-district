'use client';
import { useCartContext } from "@/app/context/addCartContext";
import { removeFromCart } from "@/actions/remove-from-cart";
import { addToCart } from "@/actions/add-to-cart";
import { getSizeById } from "@/actions/get-size-by-id";
import { useState, useEffect } from "react";
export const ProductCartItem = ({ product, quantity, itemId, sizeId }) => {
  const [open, setOpen] = useState(false);
  const [productSize, setProductSize] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setCartUpdated } = useCartContext();
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
    setLoading(true);
    try {
      await addToCart({
        productId: product.id,
        quantity: newQuantity,
        unit_price: product.price,
        product_size_id: sizeId,
        replaceQuantity: true
      });
      setCartUpdated(true);
      setLoading(false);
    } catch (error) {
      console.error("Error adding to cart:", error);
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
  return (
    <div className="bg-white p-4 rounded shadow-md flex items-center gap-4">
      <div>
        <h3>{product.name}</h3>
        <p>Price: ${product.price}</p>
        <p>Size: {productSize?.size}</p>
        <div onClick={() => setOpen(!open)} className="relative flex items-center justify-between gap-2 border border-black p-3 max-w-24">
          <button disabled={loading} className="disabled:opacity-50">{quantity}</button>
          <span>⬇️</span>
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
          className="text-red-500 hover:underline"
        >
          Remove from Cart
        </button>
      </div>
    </div>
  );
}