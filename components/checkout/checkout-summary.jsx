'use client'
import { formatPrice } from "@/utils/formatPrice";
import { ChevronDown } from "lucide-react";
import { CheckoutSummaryCart } from "@/components/checkout/checkout-summary-cart";
import { useState } from "react";
import { CheckoutSummaryDetail } from "@/components/checkout/checkout-summary-detail";
import { useCartStore } from "@/app/stores/cartStore";
export const CheckoutSummary = () => {
    const [open, setOpen] = useState(false);
    const [rotate, setRotate] = useState(false);
    const cart = useCartStore((state) => state.cart);
    const cartItems = useCartStore((state) => state.cartItems);
    const getCartTotalPriceLocal = useCartStore((state) => state.getCartTotalPriceLocal);
    const getCartTotalQuantityLocal = useCartStore((state) => state.getCartTotalQuantityLocal);
    const totalPrice = getCartTotalPriceLocal() || 0;
    const totalQuantity = getCartTotalQuantityLocal() || 0;
    const formattedPrice = formatPrice(totalPrice || 0)
    const tax = ( totalPrice || 0) * 0.19
    return (
        <section className="max-w-xl lg:max-w-5xl mx-auto">
            <div onClick={() => setOpen(!open)} className=" lg:hidden bg-gray-100 p-4">
                <div className="flex justify-between items-center"  onClick={() => setRotate(!rotate)}>
                    <div className="text-sm flex items-center gap-2 ">
                        <span>Order Summary</span>
                        <span className={`transform transition-transform duration-300 ${rotate ? "rotate-180" : ""}`}>
                            <ChevronDown />
                        </span>
                    </div>
                    <p className="font-medium text-xl">{formattedPrice}</p>
                </div>
            </div>
            {open &&
                <div className="lg:hidden">
                    <CheckoutSummaryCart cart={cart} cartItems={cartItems}>
                        <CheckoutSummaryDetail totalPrice={formattedPrice} totalQuantity={totalQuantity} shippingPrice={formatPrice(50000)} tax={formatPrice(tax)} />
                    </CheckoutSummaryCart>
                </div>
            }
            <div className="hidden lg:block">
                <CheckoutSummaryCart cartItems={cartItems} >
                    <CheckoutSummaryDetail totalPrice={formattedPrice} totalQuantity={totalQuantity} shippingPrice={formatPrice(50000)} tax={formatPrice(tax)} />
                </CheckoutSummaryCart>
            </div>
        </section>
    )
}