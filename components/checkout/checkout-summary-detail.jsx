import { useTranslations } from "next-intl";
export const CheckoutSummaryDetail = ({
  totalPrice,
  totalQuantity,
  shippingPrice,
  tax,
}) => {
  const t = useTranslations("OrderSummary");
  const tCommon = useTranslations("Common");
  const shippingDisplay = totalPrice < 200000 ? shippingPrice : t("free");
  return (
    <section
      className="flex flex-col gap-3 px-2"
      aria-labelledby="order-summary-heading"
    >
      <h2 id="order-summary-heading" className="sr-only">
        {t("title")}
      </h2>

      <dl className="text-sm space-y-2">
        {/* Subtotal */}
        <div className="flex justify-between">
          <dt>Subtotal ({totalQuantity} {totalQuantity === 1 ? tCommon("item") : `${tCommon("item")}s`})</dt>
          <dd>${totalPrice}</dd>
        </div>

        {/* Shipping */}
        <div className="flex justify-between">
          <dt>{tCommon("shipping")}</dt>
          <dd>{shippingDisplay}</dd>
        </div>

        {/* Total */}
        <div className="flex justify-between text-lg font-medium">
          <dt>{tCommon("total")}</dt>
          <dd>${totalPrice}</dd>
        </div>
      </dl>

      {/* Taxes */}
      <p className="text-sm text-gray-500 font-light">
        {t("includes")} {tax} {t("taxes")}
      </p>
    </section>
  );
};