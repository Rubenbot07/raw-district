'use client'
import { useState } from "react"
import { ChevronDown } from "lucide-react";
import { CheckoutSummaryCart } from "@/components/checkout/checkout-summary-cart";
export const CheckoutSummaryDown = ({cartItems}) => {
    const [open, setOpen] = useState(false);
    const [rotate, setRotate] = useState(false);

    const handleToggle = () => {
        setOpen(!open);
        setRotate(!rotate);
    };

    return (
        <div onClick={handleToggle}>
            <div className='flex justify-between items-center p-3 lg:hidden'>
            <h2 className="font-normal text-2xl">Order Summary</h2>
            <div className="flex gap-2 items-center text-sm cursor-pointer">
                <span>Show</span>
                <span className={`transition-transform ${rotate ? 'rotate-180' : ''}`}>
                <ChevronDown/>
                </span>
            </div>
            </div>

            {open && <CheckoutSummaryCart cartItems={cartItems} />}
        </div>
    )
}