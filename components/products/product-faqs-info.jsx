'use client';
import { Heart, WashingMachine, Shield, Minus } from "lucide-react";
import { useState } from "react";
import { useTranslations } from 'next-intl';

export const ProductFAQsInfo = () => {
  const [isOpenFAQ, setIsOpenFAQ] = useState(false);
  const t = useTranslations('FAQ');
  const tItems = t.raw('items');

  // Icons array in the same order as tItems
  const icons = [Heart, WashingMachine, Shield];

  return (
    <section className="border-b border-gray-300 px-2 pt-4">
      {/* Accordion toggle */}
      <button
        onClick={() => setIsOpenFAQ(!isOpenFAQ)}
        aria-expanded={isOpenFAQ}
        aria-controls="faq-content"
        className="w-full flex justify-between items-center text-left cursor-pointer"
      >
        <h2 className="text-base font-medium">{t("title")}</h2>
        <Minus
          size={20}
          strokeWidth={1.5}
          className={`transition-transform ${isOpenFAQ ? 'rotate-0' : 'rotate-180'}`}
          aria-hidden="true"
        />
      </button>

      {/* FAQs content */}
      <div
        id="faq-content"
        className={`transition-all overflow-hidden text-[10px] ${
          isOpenFAQ ? 'max-h-[1000px] opacity-100 py-4' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="flex flex-col gap-4 px-2">
          {tItems.map((item, index) => {
            const Icon = icons[index] || Heart; // fallback
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