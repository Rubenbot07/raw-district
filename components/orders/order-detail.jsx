import { useFormatPrice } from "@/utils/formatPrice";
import { useTranslations } from "next-intl";

export const OrderDetail = ({ quantity, total, paymentMethod, shipping_method, status }) => {
  const formatPrice = useFormatPrice();
  const tax = formatPrice((Number(total) * 0.19) || 0);
  const totalPrice = formatPrice(total || 0);
  const tOrderSummary = useTranslations("OrderSummary");
  const tCommon = useTranslations("Common");
  const tPayment = useTranslations("Payment"); 
  const getShippingLabel = () => {
    return shipping_method === 'shipping' ? tCommon("standardShipping") : tCommon("storePickup");
  };

  const getPaymentLabel = () => {
    return paymentMethod === 'mercado_pago' ? 'Mercado Pago' : tPayment("cashOnDelivery");
  };

  const statusColor = status === 'pending' ? 'text-yellow-600' : 'text-green-600';

  return (
    <section aria-labelledby="order-summary-title" className="flex flex-col gap-3 border-t p-4 text-sm">
      <h2 id="order-summary-title" className="sr-only">{tOrderSummary("title")}</h2>

      <div className="flex justify-between">
        <span>Subtotal ({quantity} {tCommon("item")}{quantity !== 1 ? 's' : ''})</span>
        <span>${totalPrice}</span>
      </div>

      <div className="flex justify-between">
        <span>{tCommon("shipping")}</span>
        <span>{getShippingLabel()}</span>
      </div>

      <div className="flex justify-between">
        <span>{tPayment("title")}</span>
        <span>{getPaymentLabel()}</span>
      </div>

      <div className="flex justify-between text-base font-medium">
        <span>{tCommon("total")}</span>
        <span>${totalPrice}</span>
      </div>

      <p className="text-gray-500 text-sm">{tOrderSummary("includes")} {tax} {tOrderSummary("taxes")}</p>

      <p className={`text-sm font-semibold ${statusColor}`}>
        {tCommon("status")}: {tCommon(status)}
      </p>
    </section>
  );
};