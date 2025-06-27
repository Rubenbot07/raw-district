'use client'
import { supabase } from "@/lib/supabase/supabaseClient"
import { ProductCartItem } from "./product-cart-item"
export const Cart =  ({cart, cartItems}) => {
    const removeFromCart = async (itemId) => {
        const { error } = await supabase
            .from('cart_items')
            .delete()
            .eq('id', itemId)
        if (error) {
            console.error('Error removing item from cart:', error)
        }
        else {
            console.log('Item removed from cart successfully')
            // Optionally, you can trigger a re-fetch of the cart items here
        }
    }
    return (
        <>  
        {cartItems ? (
            <ul className='flex flex-col gap-4'>
                {cartItems.map((item) => (
                <li key={item.id} className="cart-item">
                    <ProductCartItem product={item.products} quantity={item.quantity} removeFromCart={() => removeFromCart(item.id)}/>
                </li>
                ))}
                <p>Total: {cart[0].total_price}</p>
                <p>Quantity: {cart[0].total_quantity}</p>
            </ul>
            ) : (
                <p>Your cart is empty.</p>
            )}
        </>
    )
}