import { OrdersWrapper } from "@/components/orders/orders-wrapper";

export const metadata = {
  title: "Orders",
  description: "Orders page",
}

export default async function Page() {
  return (
    <main
      className="flex flex-col gap-6 mx-auto lg:max-w-4xl py-8 px-4"
      aria-labelledby="orders-page-title"
    >
      <header>
        <h1 id="orders-page-title" className="text-2xl font-bold">
          Orders
        </h1>
      </header>
      <OrdersWrapper />
    </main>
  );
}