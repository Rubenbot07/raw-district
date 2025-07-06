'use client';

import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartUpdated, setCartUpdated] = useState(false);
    const [openCart, setOpenCart] = useState(false);
    const [openPreCart, setOpenPreCart] = useState(false);
    const [selectedProductSlug, setSelectedProductSlug] = useState(null);

    return (
        <CartContext.Provider value={{ 
            cartUpdated,
            setCartUpdated,
            openCart,
            setOpenCart,
            openPreCart, 
            setOpenPreCart,
            selectedProductSlug,
            setSelectedProductSlug
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCartContext = () => {
    return useContext(CartContext);
};