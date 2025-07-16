'use client'
import { SelectableOptions } from "@/components/checkout/selectable-options";
import { Store } from "lucide-react";
import { Truck } from "lucide-react";
export const DeliveryOptions = ({delivery, setDelivery}) => {
    return (
        <section className="flex flex-col gap-2 w-full">
            <h2>Delivery</h2>
            <div className="flex flex-col">
                <SelectableOptions name="shipping" text="Shipping" value={delivery} setValue={setDelivery} position="top">
                    <Truck size={20} />
                </SelectableOptions>
                
                <SelectableOptions name="pickup" text="Pickup" value={delivery} setValue={setDelivery} position="bottom">
                    <Store size={20}/>
                </SelectableOptions>
            </div>
        </section>
    );
};