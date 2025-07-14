import { OrderSummaryItem } from "@/components/orders/order-summary-item"
export const OrderSummary = ({orderItems}) => {

    return (
        <section className="flex flex-col gap-2 max-w-4xl mx-auto p-4">
            Order Summary
            <ul className="flex flex-col border-[1px] border-black rounded-[8px]">
                {orderItems?.map(item => (
                    <OrderSummaryItem key={item.id} productId={item.product_id} quantity={item.quantity} size={item.size} unit_price={item.unit_price} subtotal={item.subtotal} />
                ))}
            </ul>
        </section>
    )
}