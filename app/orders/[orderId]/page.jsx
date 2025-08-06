import { OrderSummary } from "@/components/orders/order-summary";
import { getOrderItems } from "@/actions/get-order-items";


export const metadata = {
  title: "Order Detail",
  description: "Order detail page",
}

export default async function Page({ params }) {
  const { orderId } = params;

  const { data: orderItems, error } = await getOrderItems(orderId);

  if (error) {
    console.error(error);
    return (
      <main className="py-10 px-4 max-w-2xl mx-auto">
        <section
          role="alert"
          className="bg-red-100 border border-red-300 text-red-800 rounded-md p-4"
        >
          <h1 className="text-lg font-semibold mb-2">Error loading order</h1>
          <p>{error.message || "Something went wrong while fetching the order."}</p>
        </section>
      </main>
    );
  }

  return (
    <main
      className="py-10 px-4 max-w-2xl mx-auto"
      aria-labelledby="order-summary-title"
    >
      <section>
        <OrderSummary orderItems={orderItems} orderId={orderId} />
      </section>
    </main>
  );
}