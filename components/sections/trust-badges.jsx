import { Lock, Truck, RefreshCcw, Star } from "lucide-react";

export const TrustBadges = () => {
  return (
    <section
      className="flex justify-center w-full p-4"
      aria-label="Customer trust and service benefits"
    >
      <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 w-full mx-auto max-w-[1700px] items-center px-4 py-8">
        <li className="flex flex-col gap-2 items-center text-center">
          <Lock size={40} strokeWidth={1.2} aria-hidden="true" />
          <h3>SECURE PAYMENTS</h3>
          <p className="text-xs">
            We accept <strong>Credit and Money Orders</strong> through{' '}
            <strong className="underline">Mercado Pago</strong>.
          </p>
        </li>

        <li className="flex flex-col gap-2 items-center text-center">
          <Truck size={40} strokeWidth={1.2} aria-hidden="true" />
          <h3>EXPRESS SHIPPING</h3>
          <p className="text-xs">
            In less than <strong>2 days</strong> you will have the package in your hands.
          </p>
        </li>

        <li className="flex flex-col gap-2 items-center text-center">
          <RefreshCcw size={40} strokeWidth={1.2} aria-hidden="true" />
          <h3>QUICK AND EASY CHANGES</h3>
          <p className="text-xs">
            You have up to <strong>30 days</strong> to make exchanges and/or returns.
          </p>
        </li>

        <li className="flex flex-col gap-2 items-center text-center">
          <Star size={40} strokeWidth={1.2} aria-hidden="true" />
          <h3>PREMIUM QUALITY</h3>
          <p className="text-xs">
            All our products are manufactured with the most{' '}
            <strong>high quality standards</strong> in Colombia.
          </p>
        </li>
      </ul>
    </section>
  );
};