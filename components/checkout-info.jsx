'use client'
import { DeliveryOptions } from '@/components/delivery-options';
import { StoreBranches } from '@/components/store-branches';
import { PurchaseForm } from './purchase-form';
import { Payment } from '@/components/payment';
import { ChevronDown } from '@/components/icons/chevron-down-icon';
import { OrderSummaryDetail } from '@/components/order-summary-detail';
import { OrderSummaryCart } from '@/components/order-summary-cart';
import { formatPrice } from '@/utils/formatPrice';  
import { useCartContext } from '@/app/context/CartContext';
import { useUserContext } from '@/app/context/UserContext';
import { useState, useEffect } from 'react';
import { createAddress } from '@/actions/create-address';
import { createOrder } from '@/actions/create-order';
export const CheckoutInfo = () => {
    const [delivery, setDelivery] = useState("shipping");
    const [payment, setPayment] = useState("mercado_pago");
    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        identification: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        phone: "",
    });
    const [open, setOpen] = useState(false);
    const { cart, cartItems } = useCartContext();
    const { user } = useUserContext();

    const handleInfo = async () => {
        const createOrders = async (shipping_address_id) => {
            const status = payment === "mercado_pago" ? "paid" : "pending";
            const { data, error} = await createOrder({
                status: status,
                user_id: user.id,
                shipping_address_id: shipping_address_id,
                payment_method: payment.toLocaleLowerCase(),
                shipping_method: delivery.toLocaleLowerCase(),
                total_price: cart.total_price
            })
            if (error) {
                console.error("Error creating order:", error);
            }
        }
        if(delivery === "shipping") {
            const { address, error } = await createAddress({
                user_id: user.id,
                email: user.email,
                first_name: formData.name,
                last_name: formData.surname,
                address_line: formData.address,
                phone: formData.phone,
                city: formData.city,
                state: formData.state,
                identification: formData.identification
            })
            if (error) {
                console.error("Error creating address:", error);
            }
            console.log(address)
            createOrders(address.id);
        }
        if(delivery === "pickup") {
            console.log(user.id, user.email)
            const { address, error } = await createAddress({
                user_id: user.id,
                email: user.email,
                phone: user?.user_metadata?.phone || null,
            })
            if (error) {
                console.error("Error creating address:", error);
            }
            createOrders(address.id);
        }
    }

    return (
        <section className="bg-white h-auto w-auto flex flex-col gap-7 lg:border-r-[1px] p-4">
            <div className='flex flex-col gap-2 border-b-[1px] border-gray-400 py-3'>
                <p className='font-light text-sm text-gray-500'>Account</p>
                <p>{user.email}</p>
            </div>
            <DeliveryOptions delivery={delivery} setDelivery={setDelivery}/>
            {
                delivery === "shipping"
                ? (
                    <PurchaseForm formData={formData} setFormData={setFormData}/>
                ) : (
                    <StoreBranches />
                )
            }
            <Payment payment={payment} setPayment={setPayment} />
            <div className='flex justify-between items-center p-3 lg:hidden'>
                <h2 className=" font-normal text-2xl">Order Summary</h2>
                <div onClick={() => setOpen(!open)} className="flex gap-2 items-center text-sm">
                    <span>Show</span>
                    <span><ChevronDown /></span>
                </div>
            </div>
            {open && <OrderSummaryCart cartItems={cartItems}/>}
            <div className='lg:hidden'>
                <OrderSummaryDetail totalPrice={formatPrice(cart?.total_price || 0)} totalQuantity={cart?.total_quantity} shippingPrice={formatPrice(50000)} tax={formatPrice((cart?.total_price || 0) * 0.19)} />
            </div>
            <button className="bg-black text-white py-3 text-center rounded-[8px]" onClick={handleInfo}>Buy Now</button>
        </section>
    );
}