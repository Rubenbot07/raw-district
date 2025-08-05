'use client'
import { SelectableOptions } from "@/components/checkout/selectable-options";
import { Store, Truck } from "lucide-react";

export const DeliveryOptions = ({ delivery, setDelivery }) => {
    const handleClick = (target) => {
        if (delivery !== target) {
            setDelivery(target);
        }
    };

    return (
        <section className="flex flex-col gap-2 w-full">
            <h2 id="delivery-heading" className="text-lg font-semibold">Delivery</h2>
            
            {/* Radio Group */}
            <div role="radiogroup" aria-labelledby="delivery-heading" className="flex flex-col">
                <button
                    role="radio"
                    aria-checked={delivery === "shipping"}
                    aria-label="Shipping"
                    onClick={() => handleClick("shipping")}
                    className="text-left"
                >
                    <SelectableOptions
                        name="shipping"
                        text="Shipping"
                        value={delivery}
                        setValue={setDelivery}
                        position="top"
                    >
                        <Truck size={20} />
                    </SelectableOptions>
                </button>

                <button
                    role="radio"
                    aria-checked={delivery === "pickup"}
                    aria-label="Pickup"
                    onClick={() => handleClick("pickup")}
                    className="text-left"
                >
                    <SelectableOptions
                        name="pickup"
                        text="Pickup"
                        value={delivery}
                        setValue={setDelivery}
                        position="bottom"
                    >
                        <Store size={20} />
                    </SelectableOptions>
                </button>
            </div>
        </section>
    );
};