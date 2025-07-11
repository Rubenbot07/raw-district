'use client'
import { useCartContext } from "@/app/context/CartContext";
import { formatPrice } from "@/utils/formatPrice";
import { ChevronDown } from "@/components/icons/chevron-down-icon";
import { OrderSummaryCart } from "@/components/order-summary-cart";
import { useState } from "react";
import { OrderSummaryDetail } from "@/components/order-summary-detail";
export const OrderSummary = () => {
    const [open, setOpen] = useState(false);
    const { cart, cartItems } = useCartContext();
    const formattedPrice = formatPrice(cart?.total_price || 0)
    const tax = (cart?.total_price || 0) * 0.19
    return (
        <section className="max-w-xl lg:max-w-5xl mx-auto">
            <div onClick={() => setOpen(!open)} className=" lg:hidden bg-gray-100 p-4">
                <div className="flex justify-between items-center">
                    <div className="text-sm flex items-center gap-2 ">
                        <span>Order Summary</span>
                        <span><ChevronDown /></span>
                    </div>
                    <p className="font-medium text-xl">{formattedPrice}</p>
                </div>
            </div>
            {open &&
                <div className="lg:hidden">
                    <OrderSummaryCart cart={cart} cartItems={cartItems}>
                        <OrderSummaryDetail totalPrice={formattedPrice} totalQuantity={cart?.total_quantity} shippingPrice={formatPrice(50000)} tax={formatPrice(tax)} />
                    </OrderSummaryCart>
                </div>
            }
            <div className="hidden lg:block">
                <OrderSummaryCart cartItems={cartItems} >
                    <OrderSummaryDetail totalPrice={formattedPrice} totalQuantity={cart?.total_quantity} shippingPrice={formatPrice(50000)} tax={formatPrice(tax)} />
                </OrderSummaryCart>
            </div>
        </section>
    )
}