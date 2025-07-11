'use client'
import { ShippingIcon } from "@/components/icons/shipping-icon";
import { PickupIcon } from "@/components/icons/pickup-icon";
import { SelectableOptions } from "@/components/selectable-options";
export const DeliveryOptions = ({delivery, setDelivery}) => {
    return (
        <section className="flex flex-col gap-2 w-full">
            <h2>Delivery</h2>
            <div className="flex flex-col">
                <SelectableOptions name="shipping" text="Shipping" value={delivery} setValue={setDelivery} position="top">
                    <ShippingIcon />
                </SelectableOptions>
                
                <SelectableOptions name="pickup" text="Pickup" value={delivery} setValue={setDelivery} position="bottom">
                    <PickupIcon />
                </SelectableOptions>
            </div>
        </section>
    );
};