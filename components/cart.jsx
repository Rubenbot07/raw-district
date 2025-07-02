'use client'
import { ProductCartItem } from "./product-cart-item"
import { useState, useEffect } from "react";
import { getCartItems } from "@/actions/get-cart-items";
import { supabase } from "@/lib/supabase/supabaseClient";
import { useCartContext } from "@/app/context/addCartContext";

export const Cart =  ({cart}) => {
    const [open, setOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const { cartUpdated, setCartUpdated } = useCartContext();
    useEffect(() => {
        if(!cart) {
            setCartItems([]);
            return
        };
        const fetchCartItems = async () => {
            const cartItems = await getCartItems(cart.id);
            setCartItems(cartItems);
        }

        fetchCartItems();

        const channel = supabase
        .channel(`cart_items_${cart.id}`, {
             config: {
                broadcast: { self: true }
            }
        })
        .on(
            'postgres_changes',
            { event: '*', schema: 'public', table: 'cart_items' },
            (payload) => {
                console.log('Change received!', payload);
                fetchCartItems();
                // router.refresh();
            }
        )
        .subscribe();

    return () => {
        supabase.removeChannel(channel);
    };        
    }, [cart?.id]);

     useEffect(() => {
        if (cartUpdated) {
            const fetchCartItems = async () => {
                const items = await getCartItems(cart.id);
                setCartItems(items);
            };

            fetchCartItems();
            setCartUpdated(false); // Reset del flag
        }
    }, [cartUpdated]);


    return (
        <div className="">
            <button onClick={() => setOpen(!open)} className="mb-4">
                Shopping Cart
            </button>
            <div className={`z-50 absolute top-20 right-0 bg-white h-auto w-auto flex flex-col items-center justify-center p-4 shadow-lg ${open ? 'block' : 'hidden'}`}>
                {cartItems && cartItems.length ? (
                    <ul className='flex flex-col gap-4'>
                        {cartItems.map((item) => (
                        <li key={item.id} className="cart-item">
                            <ProductCartItem product={item.products} quantity={item.quantity} itemId={item.id}/>
                        </li>
                        ))}
                        {/* <p>Total: {cart?.total_price}</p>
                        <p>Quantity: {cart?.total_quantity}</p> */}
                    </ul>
                    ) : (
                        <p>Your cart is empty.</p>
                    )}
            </div>

        </div>
    )
}