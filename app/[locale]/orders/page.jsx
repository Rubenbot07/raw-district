import { OrdersWrapper } from "@/components/orders/orders-wrapper";
import { useTranslations  } from "next-intl";

export const metadata = {
  title: "Orders",
  description: "Orders page",
}


export default function Page() {
  const t = useTranslations("Orders");
  return (
    <main
      className="flex flex-col gap-6 mx-auto lg:max-w-4xl py-8 px-4"
      aria-labelledby="orders-page-title"
    >
      <header>
        <h1 id="orders-page-title" className="text-2xl font-bold">
          {t("title")}
        </h1>
      </header>
      <OrdersWrapper />
    </main>
  );
}