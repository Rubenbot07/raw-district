'use client'
import { ProductCartItem } from "./product-cart-item"
import { useState, useEffect } from "react";
import { getCartItems } from "@/actions/get-cart-items";
import { supabase } from "@/lib/supabase/supabaseClient";
import { useCartContext } from "@/app/context/addCartContext";
import { CartIcon } from './icons/CartIcon'
export const Cart =  ({cart}) => {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(cart?.total_price || 0);
    const [totalQuantity, setTotalQuantity] = useState(cart?.total_quantity || 0);
    const { cartUpdated, setCartUpdated, openCart, setOpenCart } = useCartContext();
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

    return (
<>
    {/* Fondo semitransparente cuando el carrito está abierto */}
    {openCart && (
      <div
        className="fixed inset-0 bg-black bg-opacity-40 z-40"
        onClick={() => setOpenCart(false)}
        aria-label="Close cart overlay"
      />
    )}
    <div
      className={`
        fixed top-0 right-0 z-50 h-full w-[350px] max-w-full bg-white shadow-lg transition-transform duration-300
        flex flex-col items-center justify-start p-4
        ${openCart ? 'translate-x-0' : 'translate-x-full'}
      `}
      style={{ willChange: 'transform' }}
    >
      <button onClick={() => setOpenCart(false)} className="mb-4 self-end">
        Close
      </button>
      <h2 className="mb-4 text-lg font-bold">Shopping Cart</h2>
      {cartItems && cartItems.length ? (
        <ul className="flex flex-col gap-4 w-full">
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
    {/* Botón para abrir el carrito */}
    <button
      onClick={() => setOpenCart(true)}
      className="px-4 py-2 relative"
    >
      <CartIcon />
      <span className="absolute top-1 right-2 bg-black text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">{totalQuantity}</span>
    </button>
  </>
    )
}