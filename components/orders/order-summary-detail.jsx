'use client'
import { useState, useEffect } from "react";
import { getAddresses } from "@/actions/get-addresses";
import { OrderPickupDetail } from "./order-pickup-detail";
export const OrderSummaryDetail = ({order}) => {
    const [address, setAddress] = useState(null)
    useEffect(() => {
        const fetchAddress = async () => {
            if(!order.shipping_address_id) return
            try {
                const { addresses, error } = await getAddresses(order.shipping_address_id)
                if (error) {
                    console.error(error)
                    return
                }
                setAddress(addresses)
            } catch(error) {
                console.error(error)
            }
        } 
        fetchAddress()  
    }, [order.shipping_address_id])
    console.log(order)
    return (
        <div>
            <OrderPickupDetail quantity={order.total_quantity} total={order.total_price}  paymentMethod={order.payment_method} status={order.status} />
        </div>
    )
}