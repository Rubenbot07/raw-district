export const CheckoutSummaryDetail = ({
  totalPrice,
  totalQuantity,
  shippingPrice,
  tax,
}) => {
  const shippingDisplay = totalPrice < 200000 ? shippingPrice : "Free";

  return (
    <section
      className="flex flex-col gap-3 px-2"
      aria-labelledby="order-summary-heading"
    >
      <h2 id="order-summary-heading" className="sr-only">
        Order Summary
      </h2>

      <dl className="text-sm space-y-2">
        {/* Subtotal */}
        <div className="flex justify-between">
          <dt>Subtotal ({totalQuantity} {totalQuantity === 1 ? "item" : "items"})</dt>
          <dd>{totalPrice}</dd>
        </div>

        {/* Shipping */}
        <div className="flex justify-between">
          <dt>Shipping</dt>
          <dd>{shippingDisplay}</dd>
        </div>

        {/* Total */}
        <div className="flex justify-between text-lg font-medium">
          <dt>Total</dt>
          <dd>{totalPrice}</dd>
        </div>
      </dl>

      {/* Taxes */}
      <p className="text-sm text-gray-500 font-light">
        Includes {tax} in taxes
      </p>
    </section>
  );
};