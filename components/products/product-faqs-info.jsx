'use client';
import { Heart, WashingMachine, Shield, Minus } from "lucide-react";
import { useState } from "react";

export const ProductFAQsInfo = () => {
  const [isOpenFAQ, setIsOpenFAQ] = useState(false);

  return (
    <section className="border-b border-gray-300 px-2 pt-4">
      <button
        onClick={() => setIsOpenFAQ(!isOpenFAQ)}
        aria-expanded={isOpenFAQ}
        aria-controls="faq-content"
        className="w-full flex justify-between items-center text-left cursor-pointer"
      >
        <h2 className="text-base font-medium">FAQs</h2>
        <Minus
          size={20}
          strokeWidth={1.5}
          className={`transition-transform ${isOpenFAQ ? 'rotate-0' : 'rotate-180'}`}
          aria-hidden="true"
        />
      </button>

      <div
        id="faq-content"
        className={`transition-all overflow-hidden text-[10px] ${
          isOpenFAQ ? 'max-h-[1000px] opacity-100 py-4' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="flex flex-col gap-4 px-2">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <Heart size={20} strokeWidth={1.5} aria-hidden="true" />
              <h3 className="text-sm font-medium">Can you advise me?</h3>
            </div>
            <p>Of course! Write to us on WhatsApp (+57) 300 687 0774</p>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <WashingMachine size={20} strokeWidth={1.5} aria-hidden="true" />
              <h3 className="text-sm font-medium">Washing recommendations</h3>
            </div>
            <p>
              Review the washing instructions on the garment label. The label is located on the inside of the garment. However, we recommend washing our products with cold water and letting them dry naturally. <strong>Do not tumble dry or iron the prints.</strong>
            </p>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <Shield size={20} strokeWidth={1.5} aria-hidden="true" />
              <h3 className="text-sm font-medium">Payment methods</h3>
            </div>
            <p>
              Payments on the website are processed through Mercado Pago and are 100% secure. We accept money orders.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};