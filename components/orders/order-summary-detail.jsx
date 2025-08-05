'use client'

import { useState, useEffect } from "react";
import { getAddresses } from "@/actions/get-addresses";
import { OrderDetail } from "@/components/orders/order-detail";
import { OrderShippingDetail } from "@/components/orders/order-shipping-detail";

export const OrderSummaryDetail = ({ order }) => {
  const [address, setAddress] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAddress = async () => {
      if (!order.shipping_address_id) return;

      setIsLoading(true);
      try {
        const { addresses, error } = await getAddresses(order.shipping_address_id);
        if (error) {
          console.error("Error fetching address:", error);
          return;
        }
        setAddress(addresses);
      } catch (err) {
        console.error("Unexpected error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAddress();
  }, [order.shipping_address_id]);

  return (
    <section aria-labelledby="order-summary-detail" className="flex flex-col gap-4">
      <h2 id="order-summary-detail" className="sr-only">Order Summary Detail</h2>

      <OrderDetail
        quantity={order.total_quantity}
        total={order.total_price}
        paymentMethod={order.payment_method}
        status={order.status}
        shipping_method={order.shipping_method}
      />

      {order.shipping_method === 'shipping' && (
        <>
          {isLoading ? (
            <div className="text-sm text-gray-500">Loading shipping address...</div>
          ) : (
            address && <OrderShippingDetail address={address} />
          )}
        </>
      )}
    </section>
  );
};