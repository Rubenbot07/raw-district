'use client';

import { useState, useEffect } from "react";
import { getOrderById } from "@/actions/get-order-by-id";
import { OrderSummaryItem } from "@/components/orders/order-summary-item";
import { OrderSummaryDetail } from "@/components/orders/order-summary-detail";
import { useTranslations } from "next-intl";

export const OrderSummary = ({ orderItems = [], orderId }) => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const t = useTranslations("OrderSummary");

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) return;

      setLoading(true);
      try {
        const { order, error } = await getOrderById(orderId);
        if (error) {
          console.error("Failed to fetch order:", error);
          return;
        }
        setOrder(order);
      } catch (err) {
        console.error("Unexpected error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  return (
    <section
      aria-labelledby="order-summary-title"
      className="flex flex-col gap-6 max-w-4xl mx-auto p-4"
    >
      <h1 id="order-summary-title" className="text-xl font-semibold">
        {t("title")}
      </h1>

      <div role="list" className="flex flex-col p-4 border border-black rounded-[8px]">
        {orderItems.length > 0 ? (
          orderItems.map((item) => (
            <OrderSummaryItem
              key={item.id}
              productId={item.product_id}
              quantity={item.quantity}
              size={item.size}
              unit_price={item.unit_price}
              subtotal={item.subtotal}
            />
          ))
        ) : (
          <p className="text-sm text-gray-500">{t("notFound")}</p>
        )}
      </div>

      {loading ? (
        <p className="text-sm text-gray-500">{t("loading")}</p>
      ) : (
        order && <OrderSummaryDetail order={order} />
      )}
    </section>
  );
};