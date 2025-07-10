'use client'
import { DeliveryOptions } from '@/components/delivery-options';
import { useCartContext } from '@/app/context/CartContext';
import { useUserContext } from '@/app/context/UserContext';
import { useState } from 'react';
export const CheckoutInfo = () => {
    const [showLogout, setShowLogout] = useState(false);
    const { cart, cartItems } = useCartContext();
    const { user } = useUserContext();
    return (
        <section className="bg-white h-auto w-auto flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold text-center">CHECKOUT INFO</h1>   
            <div className='flex flex-col gap-2 border-b-[1px] border-gray-300'>
                <p>Account</p>
                <p>{user.email}</p>
            </div>
            <DeliveryOptions />
        </section>
    );
}