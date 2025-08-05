import { formatPrice } from "@/utils/formatPrice";

export const OrderDetail = ({ quantity, total, paymentMethod, shipping_method, status }) => {
  const tax = formatPrice((Number(total) * 0.19) || 0);
  const totalPrice = formatPrice(total || 0);

  const getShippingLabel = () => {
    return shipping_method === 'shipping' ? 'Standard Shipping' : 'In-store Pickup';
  };

  const getPaymentLabel = () => {
    return paymentMethod === 'mercado_pago' ? 'Mercado Pago' : 'Cash on Delivery';
  };

  const statusColor = status === 'pending' ? 'text-yellow-600' : 'text-green-600';

  return (
    <section aria-labelledby="order-summary-title" className="flex flex-col gap-3 border-t p-4 text-sm">
      <h2 id="order-summary-title" className="sr-only">Order Summary</h2>

      <div className="flex justify-between">
        <span>Subtotal ({quantity} item{quantity !== 1 ? 's' : ''})</span>
        <span>{totalPrice}</span>
      </div>

      <div className="flex justify-between">
        <span>Shipping</span>
        <span>{getShippingLabel()}</span>
      </div>

      <div className="flex justify-between">
        <span>Payment</span>
        <span>{getPaymentLabel()}</span>
      </div>

      <div className="flex justify-between text-base font-medium">
        <span>Total</span>
        <span>{totalPrice}</span>
      </div>

      <p className="text-gray-500 text-sm">Includes {tax} in taxes</p>

      <p className={`text-sm font-semibold ${statusColor}`}>
        Status: {status?.toUpperCase()}
      </p>
    </section>
  );
};