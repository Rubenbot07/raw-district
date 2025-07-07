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
    const [totalPrice, setTotalPrice] = useState(cart?.total_price || 0);
    const [totalQuantity, setTotalQuantity] = useState(cart?.total_quantity || 0);
    const { user } = useUserContext();


    useEffect(() => {
        const loadCart = async () => {
            const activeCart = await getActiveCart(user?.id);
            if(activeCart) {
                setCart(activeCart);
                setTotalPrice(activeCart.total_price || 0);
                setTotalQuantity(activeCart.total_quantity || 0);
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
        .channel('public:cart_items', {
            config: {
                broadcast: {self: true}
            }
        })

        .on(
            'postgres_changes',
            { event: '*', schema: 'public', table: 'cart_items' },
            (payload) => {
                console.log('Change received!', payload);
                loadCart();
            }
        )
        .subscribe();

        const cartChannel = supabase
        .channel(`cart_${cart?.id}`)
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
        supabase.removeChannel(channel);
        supabase.removeChannel(cartChannel);
        };
    }, [user?.id, cart?.id]);

        useEffect(() => {
        if (cartUpdated && cart) {
            const fetchCartItems = async () => {
                const items = await getCartItems(cart.id);
                const activeCart = await getActiveCart(user?.id);
                setCartItems(items);
                setTotalPrice(activeCart?.total_price);
                setTotalQuantity(activeCart?.total_quantity);
            };
            fetchCartItems();
            setCartUpdated(false);
        }
    }, [cartUpdated, cart, user?.id]);
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
            setCartItems,
            totalPrice,
            setTotalPrice,
            totalQuantity,
            setTotalQuantity
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCartContext = () => {
    return useContext(CartContext);
};