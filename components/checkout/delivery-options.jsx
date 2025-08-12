'use client'
import { SelectableOptions } from "@/components/checkout/selectable-options";
import { Store, Truck } from "lucide-react";
import { useTranslations } from "next-intl";

export const DeliveryOptions = ({ delivery, setDelivery }) => {
    const t = useTranslations("Delivery");
    const tCommon = useTranslations("Common");
    const handleClick = (target) => {
        if (delivery !== target) {
            setDelivery(target);
        }
    };

    return (
        <section className="flex flex-col gap-2 w-full">
            <h2 id="delivery-heading" className="text-lg font-semibold">{t("title")}</h2>
            
            {/* Radio Group */}
            <div role="radiogroup" aria-labelledby="delivery-heading" className="flex flex-col">
                <button
                    role="radio"
                    aria-checked={delivery === "shipping"}
                    aria-label={tCommon("shipping")}
                    onClick={() => handleClick("shipping")}
                    className="text-left"
                >
                    <SelectableOptions
                        name="shipping"
                        text={tCommon("shipping")}
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
                    aria-label={tCommon("pickup")}
                    onClick={() => handleClick("pickup")}
                    className="text-left"
                >
                    <SelectableOptions
                        name="pickup"
                        text={tCommon("pickup")}
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