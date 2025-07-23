'use client'
import { Heart } from "lucide-react";
import { WashingMachine } from "lucide-react";
import { Shield } from "lucide-react";
import { Minus } from "lucide-react";
import { useState } from "react";

export const ProductFAQsInfo = () => {
    const [isOpenFAQ, setIsOpenFAQ] = useState(false);
    return (
        <div onClick={() => setIsOpenFAQ(!isOpenFAQ)} className="relative cursor-pointer flex flex-col justify-center gap-4 px-2 pt-4 border-b-[1px] border-gray-300">
            <div className="flex justify-between">
                <h2>FAQs</h2>
                <button><Minus size={20} strokeWidth={1.5} /></button>
            </div>
            <div className={`transition-all ${isOpenFAQ ? 'opacity-100 py-4' : 'h-0 opacity-0'} px-2 flex flex-col gap-4 text-[10px]`}>
                <div className="flex flex-col">
                    <Heart size={20} strokeWidth={1.5} />
                    <h3 className="text-sm font-medium">Can you advise me?</h3>
                    <p>Of course! Write to us on Whatsapp (+57) 300 687 0774</p>
                </div>
                <div className="flex flex-col">
                    <WashingMachine size={20} strokeWidth={1.5} />
                    <h3 className="text-sm font-medium">Washing recommendations</h3>
                    <p>Review the washing instructions on the garment label. The label is located on the inside of the garment. However, we recommend washing our products with cold water and letting them dry naturally. <strong>Do not tumble dry or iron the prints</strong></p>
                </div>
                <div className="flex flex-col">
                    <Shield size={20} strokeWidth={1.5} />
                    <h3 className="text-sm font-medium">Payment methods</h3>
                    <p>Payments on the website are processed through Mercado Pago and are 100% secure. We accept money orders</p>
                </div>
            </div>
        </div>
    );
};