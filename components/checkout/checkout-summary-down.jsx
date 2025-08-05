'use client'
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { CheckoutSummaryCart } from "@/components/checkout/checkout-summary-cart";

export const CheckoutSummaryDown = ({ cartItems }) => {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  return (
    <section className="lg:hidden">
      {/* Botón accesible para expandir/contraer */}
      <button
        type="button"
        onClick={handleToggle}
        aria-expanded={open}
        aria-controls="checkout-summary-cart"
        className="w-full flex justify-between items-center p-3 focus:outline-none focus:ring-2 focus:ring-black"
      >
        <h2 className="font-normal text-2xl">Order Summary</h2>

        <div className="flex gap-2 items-center text-sm">
          <span>{open ? 'Hide' : 'Show'}</span>
          <span
            className={`transition-transform ${open ? 'rotate-180' : ''}`}
            aria-hidden="true"
          >
            <ChevronDown />
          </span>
        </div>
      </button>

      {/* Contenido expandible con id y role */}
      {open && (
        <div
          id="checkout-summary-cart"
          role="region"
          aria-label="Cart items in order summary"
        >
          <CheckoutSummaryCart cartItems={cartItems} />
        </div>
      )}
    </section>
  );
};