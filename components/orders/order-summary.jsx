'use client'
import { useState, useEffect } from "react"
import { getOrderById } from "@/actions/get-order-by-id"
import { OrderSummaryItem } from "@/components/orders/order-summary-item"
import { OrderSummaryDetail } from "@/components/orders/order-summary-detail"
export const OrderSummary = ({orderItems,orderId}) => {
        const [order, setOrder] = useState([])
        useEffect(() => {
            const fetchOrders = async () => {
                if (!orderId) return
                const { order, error } = await getOrderById(orderId)
                if (error) {
                    console.error(error)
                    return
                }
                setOrder(order)
            }
            fetchOrders()
        }, [orderId])

        console.log(order)
    return (
        <section className="flex flex-col gap-4 max-w-4xl mx-auto p-4">
            Order Summary
            <ul className="flex flex-col p-4 border-[1px] border-black rounded-[8px]">
                {orderItems?.map(item => (
                    <OrderSummaryItem key={item.id} productId={item.product_id} quantity={item.quantity} size={item.size} unit_price={item.unit_price} subtotal={item.subtotal} />
                ))}
            </ul>
            <OrderSummaryDetail order={order} />
        </section>
    )
}