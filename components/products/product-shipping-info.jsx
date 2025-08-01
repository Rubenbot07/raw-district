'use client'
import { Truck, Mail, MessagesSquare, Minus } from "lucide-react";
import { useState } from "react";

export const ProductShippingInfo = () => {
    const [isOpenShipping, setIsOpenShipping] = useState(false);
    return (
        <div onClick={() => setIsOpenShipping(!isOpenShipping)} className="relative cursor-pointer flex flex-col justify-center gap-4 px-2 pt-4 border-t-[1px] border-b-[1px] border-gray-300">
            <div className="flex justify-between">
                <h2>Shippings</h2>
                <button><Minus size={20} strokeWidth={1.5} /></button>
            </div>
            <div className={`transition-all ${isOpenShipping ? 'opacity-100 py-4' : 'h-0 opacity-0'} px-2 flex flex-col gap-4 text-[10px]`}>
                <div className="flex flex-col">
                    <Truck size={20} strokeWidth={1.5} />
                    <h3 className="text-sm font-medium">Express Shipping</h3>
                    <p>In Dosquebradas the delivery time is 0 to 2 business days and nationally 1 to 3 business days.</p>
                </div>
                <div className="flex flex-col">
                    <Mail size={20} strokeWidth={1.5} />
                    <h3 className="text-sm font-medium">Track you purchase</h3>
                    <p>Once your purchase is confirmed, you will receive an email with a real-time tracking link</p>
                </div>
                <div className="flex flex-col">
                    <MessagesSquare size={20} strokeWidth={1.5} />
                    <h3 className="text-sm font-medium">Purchase Confirmation</h3>
                    <p>You will receive a confirmation email once your purchase is confirmed. Please check your spam/junk or promotions folder before contacting us</p>
                </div>
            </div>
        </div>
    );
};