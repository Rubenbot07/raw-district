'use client'
import { ProductCartItem } from "./product-cart-item"

export const Cart =  ({cart, cartItems}) => {
    console.log( cartItems)
    return (
        <div className="absolute top-20 right-0 bg-white h-auto w-auto flex flex-col items-center justify-center p-4 shadow-lg">  
            {cartItems && cartItems.length ? (
                <ul className='flex flex-col gap-4'>
                    {cartItems.map((item) => (
                    <li key={item.id} className="cart-item">
                        <ProductCartItem product={item.products} quantity={item.quantity} itemId={item.id}/>
                    </li>
                    ))}
                    <p>Total: {cart?.total_price}</p>
                    <p>Quantity: {cart?.total_quantity}</p>
                </ul>
                ) : (
                    <p>Your cart is empty.</p>
                )}
        </div>
    )
}