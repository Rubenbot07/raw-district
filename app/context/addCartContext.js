'use client';

import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartUpdated, setCartUpdated] = useState(false);

    return (
        <CartContext.Provider value={{ cartUpdated, setCartUpdated }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCartContext = () => {
    return useContext(CartContext);
};