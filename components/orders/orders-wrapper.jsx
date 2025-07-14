'use client'
import { getOrders } from "@/actions/get-orders"
import { useState, useEffect } from "react"
import { useUserStore } from "@/app/stores/userStore"
import { formatPrice } from "@/utils/formatPrice"
import Link from "next/link"
export const OrdersWrapper = () => {
    const user = useUserStore(state => state.user)
    const [orders, setOrders] = useState([])
    useEffect(() => {
        const fetchOrders = async () => {
            if (!user?.id) return
            const { orders, error } = await getOrders(user.id)
            if (error) {
                console.error(error)
                return
            }
            setOrders(orders)
        }
        fetchOrders()
    }, [user])
    return (
        <section className="bg-white h-auto w-auto flex flex-col gap-7 p-4">
            <ul className="flex flex-col gap-4">
            {
                orders?.map(order => {
                    const date = new Date(order.created_at);
                    const formattedDate = date.toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    });
                    return (                        
                        <li className="text-sm" key={order.id}>
                            <Link href={`/orders/${order.id}`} className="relative flex gap-3 flex-wrap justify-between border-[1px] items-center border-black p-4 rounded-[8px]">
                                <div className="flex flex-col gap-2">
                                    <p className="text-gray-500 text-xs">Order ID: {order.id}</p>
                                    <p>{formattedDate}</p>
                                </div>
                                <div className="flex gap-2">
                                    <p className="font-semibold">Total: {formatPrice(order.total_price)} ({order.total_quantity})</p>
                                </div>
                                <p className={`absolute top-[-6px] right-2 text-xs w-16 text-center rounded-[4px] ${order.status === 'pending' ? 'bg-yellow-400 text-black' : 'bg-green-400 text-black'}`}>{order.status.toUpperCase()}</p>
                            </Link>
                        </li>
                    )
                })   
            }
            </ul>
        </section>
    )
}