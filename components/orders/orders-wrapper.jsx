'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { getOrders } from "@/actions/get-orders";
import { useUserStore } from "@/app/stores/userStore";
import { useFormatPrice } from "@/utils/formatPrice";
import { useTranslations, useLocale } from "next-intl";

export const OrdersWrapper = () => {
  const user = useUserStore((state) => state.user);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const t = useTranslations("Orders");
  const tCommon = useTranslations("Common");
  const locale = useLocale();
  const formatPrice = useFormatPrice();


  useEffect(() => {
    const fetchOrders = async () => {
      if (!user?.id) return;
      setLoading(true);
      try {
        const { orders, error } = await getOrders(user.id);
        if (error) {
          console.error("Error fetching orders:", error);
          return;
        }
        setOrders(orders);
      } catch (err) {
        console.error("Unexpected error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user]);

  return (
    <section
      aria-labelledby="orders-title"
      className="bg-white w-full min-h-96 flex flex-col gap-7 p-4"
    >

      {loading ? (
        <p className="text-gray-500">{t("loading")}</p>
      ) : orders.length === 0 ? (
        <p className="flex items-center justify-center text-gray-500 h-96">
          {t("noOrders")}
        </p>
      ) : (
        <ul role="list" className="flex flex-col gap-4">
          {orders.map((order) => {
            const date = new Date(order.created_at).toLocaleDateString(locale, {
              day: "numeric",
              month: "long",
              year: "numeric",
            });
            return (
              <li key={order.id} role="listitem" className="text-sm">
                <Link
                  href={`/orders/${order.id}`}
                  className="relative flex flex-col sm:flex-row sm:items-center justify-between border border-black p-4 rounded-[8px] gap-3 hover:bg-gray-50 transition"
                >
                  <div className="flex flex-col gap-1">
                    <p className="text-gray-500 text-xs">{t("order")} ID: {order.id}</p>
                    <p className="font-medium">{date}</p>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                    <p className="font-semibold">
                      {tCommon("total")}: ${formatPrice(order.total_price)}{" "}
                      <span className="text-gray-500">({order.total_quantity} {tCommon("item")}s)</span>
                    </p>
                    <span
                      className={`text-xs text-center px-2 py-[2px] rounded-[4px] w-fit ${
                        order.status === "pending"
                          ? "bg-yellow-400 text-black"
                          : "bg-green-500 text-white"
                      }`}
                    >
                      {tCommon(order.status || "pending")}
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
};