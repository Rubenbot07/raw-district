import { OrdersWrapper } from "@/components/orders/orders-wrapper";

export default async function Page() {
    return (
        <section className="flex flex-col gap-4 mx-auto lg:max-w-4xl">
            <h1 className="text-2xl p-4">Orders</h1>
            <ul>
                <OrdersWrapper />
            </ul>
        </section>
    )
}