'use client';

import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartUpdated, setCartUpdated] = useState(false);
    const [openCart, setOpenCart] = useState([]);

    return (
        <CartContext.Provider value={{ cartUpdated, setCartUpdated, openCart, setOpenCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCartContext = () => {
    return useContext(CartContext);
};