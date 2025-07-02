'use client';
import { supabase } from "@/lib/supabase/supabaseClient"
import { useCartContext } from "@/app/context/addCartContext";
export const ProductCartItem = ({ product, quantity, itemId, size }) => {
  const { setCartUpdated } = useCartContext();
      const removeFromCart = async (itemId) => {
          const { error } = await supabase
              .from('cart_items')
              .delete()
              .eq('id', itemId)
          if (error) {
              console.error('Error removing item from cart:', error)
          }
          else {
              setCartUpdated(true);
              console.log('Item removed from cart successfully')
              //Optionally, you can trigger a re-fetch of the cart items here
          }
      }
  return (
    <div className="bg-white p-4 rounded shadow-md flex items-center gap-4">
      <div>
        <h3>{product.name}</h3>
        <p>Price: ${product.price}</p>
        <p>Quantity: {quantity}</p>
        <button
          onClick={() => removeFromCart(itemId)}
          className="text-red-500 hover:underline"
        >
          Remove from Cart
        </button>
      </div>
    </div>
  );
}