'use client';
import { useFormatPrice } from "@/utils/formatPrice";
import { ChevronDown } from "lucide-react";
import { CheckoutSummaryCart } from "@/components/checkout/checkout-summary-cart";
import { useState } from "react";
import { CheckoutSummaryDetail } from "@/components/checkout/checkout-summary-detail";
import { useCartStore } from "@/app/stores/cartStore";
import { useTranslations } from "next-intl";

export const CheckoutSummary = () => {
  const [open, setOpen] = useState(false);
  const t = useTranslations("OrderSummary");
  const tCheckout = useTranslations("Checkout");
  const cart = useCartStore((state) => state.cart);
  const cartItems = useCartStore((state) => state.cartItems);
  const getCartTotalPriceLocal = useCartStore((state) => state.getCartTotalPriceLocal);
  const getCartTotalQuantityLocal = useCartStore((state) => state.getCartTotalQuantityLocal);

  const totalPrice = getCartTotalPriceLocal() || 0;
  const totalQuantity = getCartTotalQuantityLocal() || 0;
  const formattedPrice = useFormatPrice();
  const tax = totalPrice * 0.19;
  return (
    <section className="max-w-xl lg:max-w-5xl mx-auto" aria-labelledby="checkout-summary-title">
      <h2 id="checkout-summary-title" className="sr-only">{tCheckout("title")}</h2>

      {/* Mobile Accordion Button */}
      <div className="lg:hidden bg-gray-100 p-4">
        <button
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="checkout-summary-mobile"
          className="w-full flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-black"
        >
          <div className="text-sm flex items-center gap-2">
            <span>{t("title")}</span>
            <span
              className={`transform transition-transform duration-300 ${open ? "rotate-180" : ""}`}
              aria-hidden="true"
            >
              <ChevronDown />
            </span>
          </div>
          <p className="font-medium text-xl">{formattedPrice(totalPrice)}</p>
        </button>
      </div>

      {/* Mobile Collapsible Summary */}
      {open && (
        <div
          id="checkout-summary-mobile"
          className="lg:hidden"
          role="region"
          aria-label="Order summary details"
        >
          <CheckoutSummaryCart cart={cart} cartItems={cartItems}>
            <CheckoutSummaryDetail
              totalPrice={formattedPrice(totalPrice)}
              totalQuantity={totalQuantity}
              shippingPrice={formattedPrice(50000)}
              tax={formattedPrice(tax)}
            />
          </CheckoutSummaryCart>
        </div>
      )}

      {/* Desktop Summary */}
      <div className="hidden lg:block" role="region" aria-label="Order summary details for desktop">
        <CheckoutSummaryCart cartItems={cartItems}>
          <CheckoutSummaryDetail
            totalPrice={formattedPrice(totalPrice)}
            totalQuantity={totalQuantity}
            shippingPrice={formattedPrice(50000)}
            tax={formattedPrice(tax)}
          />
        </CheckoutSummaryCart>
      </div>
    </section>
  );
};