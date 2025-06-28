'use client'
import { supabase } from "@/lib/supabase/supabaseClient" 
import { ProductCartItem } from "./product-cart-item"
import { useState } from "react"

export const Cart =  ({cart, cartItems}) => {
    const [open, setOpen] = useState(false)
    
    return (
        <div className="bg-white h-auto w-auto flex flex-col items-center justify-center p-4 shadow-lg">  
            <button onClick={() => setOpen(!open)}>Shopping Cart</button>
            <div className={`absolute top-20 right-10 flex flex-col items-center gap-4 ${open ? 'block' : 'hidden'}`}>
            {cartItems && cartItems.length ? (
                <ul className='flex flex-col gap-4'>
                    {cartItems.map((item) => (
                    <li key={item.id} className="cart-item">
                        <ProductCartItem product={item.products} quantity={item.quantity} itemId={item.id}/>
                    </li>
                    ))}
                    <p>Total: {cart[0]?.total_price}</p>
                    <p>Quantity: {cart[0]?.total_quantity}</p>
                </ul>
                ) : (
                    <p>Your cart is empty.</p>
                )}
            </div>
        </div>
    )
}