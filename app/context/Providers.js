'use client'
import { UserProvider } from "./UserContext"
import { CartProvider } from './CartContext'
export const Providers = ({children, initialUser}) => {
    return (
        <UserProvider initialUser={initialUser}>
            <CartProvider>
                {children}
            </CartProvider>
        </UserProvider>
    )
}