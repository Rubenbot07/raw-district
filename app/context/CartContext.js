'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { getCartItems } from '@/actions/get-cart-items';
import { getActiveCart } from '@/actions/get-active-cart';
import { useUserContext } from './UserContext'; 
import { supabase } from '@/lib/supabase/supabaseClient';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartUpdated, setCartUpdated] = useState(false);
    const [openCart, setOpenCart] = useState(false);
    const [openPreCart, setOpenPreCart] = useState(false);
    const [selectedProductSlug, setSelectedProductSlug] = useState(null);
    const [cart, setCart] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const { user } = useUserContext();


    useEffect(() => {
        const loadCart = async () => {
            const activeCart = await getActiveCart(user?.id);
            if(activeCart) {
                setCart(activeCart);
            }

            const items = await getCartItems(activeCart.id);
            if(items) {
                setCartItems(items);
            } else {
                setCart(null)
                setCartItems([]);
            }
        }

        loadCart();
        const channel = supabase
        .channel('public:cart_items')
        .on(
            'postgres_changes',
            { event: '*', schema: 'public', table: 'cart_items' },
            (payload) => {
                console.log('Change received!', payload);
                loadCart();
            }
        )
        .subscribe();

        return () => {
        supabase.removeChannel(channel);
        };
    }, [user?.id])

    return (
        <CartContext.Provider value={{ 
            cartUpdated,
            setCartUpdated,
            openCart,
            setOpenCart,
            openPreCart, 
            setOpenPreCart,
            selectedProductSlug,
            setSelectedProductSlug,
            cart,
            setCart,
            cartItems,
            setCartItems
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCartContext = () => {
    return useContext(CartContext);
};