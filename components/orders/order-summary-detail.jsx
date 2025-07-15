'use client'
import { useState, useEffect } from "react";
import { getAddresses } from "@/actions/get-addresses";
import { OrderDetail } from "@/components/orders/order-detail";
import { OrderShippingDetail } from "@/components/orders/order-shipping-detail";
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
    return (
        <div>
            <OrderDetail quantity={order.total_quantity} total={order.total_price}  paymentMethod={order.payment_method} status={order.status} shipping_method={order.shipping_method}/>
            {
                order.shipping_method === 'shipping' && address && <OrderShippingDetail address={address} />
            }
        </div>
    )
}