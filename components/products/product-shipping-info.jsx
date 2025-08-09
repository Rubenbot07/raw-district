'use client';
import { Truck, Mail, MessagesSquare, Minus } from "lucide-react";
import { useState } from "react";
import { useTranslations } from 'next-intl';

export const ProductShippingInfo = () => {
  const [isOpenShipping, setIsOpenShipping] = useState(false);
  const t = useTranslations('ShippingInfo');
  const tItems = t.raw('items');

  // Icons array in the same order as tItems
  const icons = [Truck, Mail, MessagesSquare];

  return (
    <section className="border-t border-b border-gray-300 px-2 pt-4">
      {/*Accordion toggle */}
      <button
        onClick={() => setIsOpenShipping(!isOpenShipping)}
        aria-expanded={isOpenShipping}
        aria-controls="shipping-content"
        className="w-full flex justify-between items-center cursor-pointer text-left"
      >
        <h2 className="text-base font-medium">{t("title")}</h2>
        <Minus
          size={20}
          strokeWidth={1.5}
          className={`transition-transform ${isOpenShipping ? 'rotate-0' : 'rotate-180'}`}
          aria-hidden="true"
        />
      </button>

      {/* Collapsible content */}
      <div
        id="shipping-content"
        className={`transition-all overflow-hidden text-[10px] ${
          isOpenShipping ? 'max-h-[1000px] opacity-100 py-4' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="flex flex-col gap-4 px-2">
          {tItems.map((item, index) => {
            const Icon = icons[index] || Truck; // fallback
            return (
              <div key={index} className="flex flex-col">
                <div className="flex items-center gap-2">
                  <Icon size={20} strokeWidth={1.5} aria-hidden="true" />
                  <h3 className="text-sm font-medium">{item.question}</h3>
                </div>
                <p>{item.answer}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};