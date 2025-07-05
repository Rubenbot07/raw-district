'use client'
import { ProductCartItem } from "./product-cart-item"
import { useState, useEffect } from "react";
import { getCartItems } from "@/actions/get-cart-items";
import { supabase } from "@/lib/supabase/supabaseClient";
import { useCartContext } from "@/app/context/addCartContext";

export const Cart =  ({cart}) => {
    const [open, setOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(cart?.total_price || 0);
    const [totalQuantity, setTotalQuantity] = useState(cart?.total_quantity || 0);
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

        const cartItemsChannel = supabase
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
            }
        )
        .subscribe();

        const cartChannel = supabase
        .channel(`cart_${cart.id}`)
        .on(
            'postgres_changes',
            { event: '*', schema: 'public', table: 'cart' },
                (payload) => {
                    if (payload.new) {
                        setTotalPrice(payload.new.total_price);
                        setTotalQuantity(payload.new.total_quantity);
                    }
                }
        )
        .subscribe();

    return () => {
        supabase.removeChannel(cartItemsChannel);
        supabase.removeChannel(cartChannel);
    };        
    }, [cart?.id]);

    useEffect(() => {
        if (cartUpdated && cart) {
            const fetchCartItems = async () => {
                const items = await getCartItems(cart.id);
                setCartItems(items);
            };
            fetchCartItems();
            setCartUpdated(false);
        }
    }, [cartUpdated, cart]);
    console.log('cartItems', cartItems);

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
                            <ProductCartItem product={item.products} quantity={item.quantity} itemId={item.id} sizeId={item.product_size_id}/>
                        </li>
                        ))}
                        <p>Total: {totalPrice}</p>
                        <p>Quantity: {totalQuantity}</p>
                    </ul>
                    ) : (
                        <p>Your cart is empty.</p>
                    )}
            </div>

        </div>
    )
}