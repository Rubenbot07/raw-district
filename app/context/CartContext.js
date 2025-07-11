'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { getCartItems } from '@/actions/get-cart-items';
import { getActiveCart } from '@/actions/get-active-cart';
import { useUserContext } from './UserContext'; 
import { supabase } from '@/lib/supabase/supabaseClient';
import { addToCart as addToCartAction } from '@/actions/add-to-cart';
import { removeFromCart as removeFromCartAction } from '@/actions/remove-from-cart';

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
    }, [user?.id, cart?.id, cartUpdated]);

        useEffect(() => {
        if (cartUpdated && cart) {
            const fetchCartItems = async () => {
                const items = await getCartItems(cart.id);
                const activeCart = await getActiveCart(user?.id);
                setCart(activeCart);
                setCartItems(items);
                setTotalPrice(activeCart?.total_price);
                setTotalQuantity(activeCart?.total_quantity);
            };
            fetchCartItems();
            setCartUpdated(false);
        }
    }, [cartUpdated, cart, user?.id]);

    const removeFromCart = async (itemId) => {
        try {
            await removeFromCartAction(itemId)
        } catch (error) {
            console.log(error)
        }
    }

    const addToCart = async ({ productId, quantity = 1, unit_price, product_size_id, replaceQuantity = false }) => {
        try {
            await addToCartAction({ productId, quantity, unit_price, product_size_id, replaceQuantity });
        } catch (error) {
            console.error(error);
            setCartItems(prevItems => prevItems.filter(item => item.product_id !== productId));
            setTotalPrice(prevPrice => prevPrice - unit_price);
            setTotalQuantity(prevQuantity => prevQuantity - quantity);
        }
    }

    const addToCartLocal = ({ product, quantity = 1, product_size_id }) => {
        const itemId = crypto.randomUUID();
      
        setCartItems((prevItems) => {
          const existingItem = prevItems.find(
            item =>
              item.product_id === product.id &&
              item.product_size_id === product_size_id
          );
      
          if (existingItem) {
            return prevItems.map(item =>
              item.product_id === product.id && item.product_size_id === product_size_id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            );
          } else {
            return [
              ...prevItems,
              {
                id: itemId,
                cart_id: null,
                product_id: product.id,
                product_size_id,
                quantity,
                unit_price: product.price,
                added_at: new Date().toISOString(),
                products: product,
              },
            ];
          }
        });
      };
    const updateItemQuantityLocal = (itemId, newQuantity) => {
        setCartItems((prevItems) =>
          prevItems.map((item) =>
            item.id === itemId
              ? { ...item, quantity: newQuantity }
              : item
          )
        );
    };

    const removeFromCartLocal = (itemId) => {
         const newCart = [...cartItems]
         const equalId = (element) => element.id === itemId
         const index = newCart.findIndex(equalId)
         newCart.splice(index, 1)
         setCartItems(newCart)
    }

    // Calcula la cantidad total de productos en el carrito localmente
    const getCartTotalQuantityLocal = () => {
        return cartItems.reduce((acc, item) => acc + (item.quantity || 0), 0);
    };

    // Calcula el precio total del carrito localmente
    const getCartTotalPriceLocal = () => {
        return cartItems.reduce((acc, item) => acc + ((item.unit_price || 0) * (item.quantity || 0)), 0);
    };
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
            setTotalQuantity,
            addToCart,
            updateItemQuantityLocal,
            addToCartLocal,
            getCartTotalQuantityLocal,
            getCartTotalPriceLocal,
            removeFromCart,
            removeFromCartLocal
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCartContext = () => {
    return useContext(CartContext);
};