import { CheckoutInfo } from "@/components/checkout/checkout-info";
import { CheckoutSummary } from "@/components/checkout/checkout-summary";

export default function Page() {
  return (
    <main
      className="max-w-xl lg:max-w-5xl mx-auto"
      aria-label="Checkout page"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Checkout summary (mobile only) */}
        <aside
          className="block w-full lg:hidden"
          aria-label="Order summary"
        >
          <CheckoutSummary />
        </aside>

        {/* Checkout form / inputs */}
        <section
          className="w-full"
          aria-labelledby="checkout-form-title"
        >
          <CheckoutInfo />
        </section>

        {/* Checkout summary (desktop only) */}
        <aside
          className="hidden lg:block lg:col-start-2 p-8 h-screen overflow-y-auto sticky top-0"
          aria-label="Order summary"
        >
          <CheckoutSummary />
        </aside>
      </div>
    </main>
  );
}