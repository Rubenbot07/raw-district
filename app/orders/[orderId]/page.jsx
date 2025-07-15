import { OrderSummary } from "@/components/orders/order-summary";
import { getOrderItems } from "@/actions/get-order-items";
export default async function Page({ params }) {
    const { orderId } = await params;
    const { data, error } = await getOrderItems(orderId)
    if (error) {
        console.error(error)
        return
    }

    return (
        <section>
            <OrderSummary orderItems={data} orderId={orderId} />
        </section>
    )
}