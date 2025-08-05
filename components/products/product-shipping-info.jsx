'use client';
import { Truck, Mail, MessagesSquare, Minus } from "lucide-react";
import { useState } from "react";

export const ProductShippingInfo = () => {
  const [isOpenShipping, setIsOpenShipping] = useState(false);

  return (
    <section className="border-t border-b border-gray-300 px-2 pt-4">
      {/* Encabezado del acordeón */}
      <button
        onClick={() => setIsOpenShipping(!isOpenShipping)}
        aria-expanded={isOpenShipping}
        aria-controls="shipping-content"
        className="w-full flex justify-between items-center cursor-pointer text-left"
      >
        <h2 className="text-base font-medium">Shipping Information</h2>
        <Minus
          size={20}
          strokeWidth={1.5}
          className={`transition-transform ${isOpenShipping ? 'rotate-0' : 'rotate-180'}`}
          aria-hidden="true"
        />
      </button>

      {/* Contenido colapsable */}
      <div
        id="shipping-content"
        className={`transition-all overflow-hidden text-[10px] ${isOpenShipping ? 'max-h-[1000px] opacity-100 py-4' : 'max-h-0 opacity-0'}`}
      >
        <div className="flex flex-col gap-4 px-2">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <Truck size={20} strokeWidth={1.5} aria-hidden="true" />
              <h3 className="text-sm font-medium">Express Shipping</h3>
            </div>
            <p>
              In Dosquebradas the delivery time is 0 to 2 business days and nationally 1 to 3 business days.
            </p>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <Mail size={20} strokeWidth={1.5} aria-hidden="true" />
              <h3 className="text-sm font-medium">Track your purchase</h3>
            </div>
            <p>
              Once your purchase is confirmed, you will receive an email with a real-time tracking link.
            </p>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <MessagesSquare size={20} strokeWidth={1.5} aria-hidden="true" />
              <h3 className="text-sm font-medium">Purchase Confirmation</h3>
            </div>
            <p>
              You will receive a confirmation email once your purchase is confirmed. Please check your spam/junk or promotions folder before contacting us.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
