'use client'
import { useState } from "react";
export const DeliveryOptions = () => {
    const [delivery, setDelivery] = useState("shipping");
    return (
        <div className="flex flex-col gap-2 w-96">
            <h3>Delivery</h3>
            <div className="flex flex-col">
                <div onClick={() => setDelivery('shipping')} className={`p-3 flex justify-between cursor-pointer border-[1px]  rounded-[8px] border-b-0 rounded-br-none rounded-bl-none ${delivery === 'shipping' ? 'border-black' : 'border-gray-300'}`}>
                    <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="radio"
                        name="delivery"
                        value="shipping"
                        className="hidden peer"
                        checked={delivery === "shipping"}
                        onChange={(e) => setDelivery(e.target.value)}
                    />
                    <span
                        className="w-4 h-4 rounded-full border-[1px] bg-white border-gray-400 flex items-center justify-center peer-checked:border-black peer-checked:bg-black"
                    >
                        <span
                            className="w-2 h-2 bg-white rounded-full transition-transform"
                        ></span>
                    </span>
                        Shipping
                    </label>
                    <span>🚚</span>
                </div>
                <hr className="border-black"/>
                <div onClick={() => setDelivery('pickup')} className={`p-3 flex justify-between cursor-pointer border-[1px]   rounded-[8px] border-t-0 rounded-tr-none rounded-tl-none ${delivery === 'shipping' ? 'border-gray-300' : 'border-black'}`}>
                    <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="radio"
                        name="delivery"
                        value="pickup"
                        className="hidden peer"
                        checked={delivery === "pickup"}
                        onChange={(e) => setDelivery(e.target.value)}
                    />
                    <span
                        className="w-4 h-4 rounded-full border-[1px] bg-white border-gray-400 flex items-center justify-center peer-checked:border-black peer-checked:bg-black"
                    >
                        <span
                            className="w-2 h-2 bg-white rounded-full transition-transform"
                        ></span>
                    </span>
                        Pickup
                    </label>
                    <span>🏪</span>
                </div>
            </div>
        </div>
    );
};