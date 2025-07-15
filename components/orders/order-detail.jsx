import { formatPrice } from "@/utils/formatPrice";

export const OrderDetail = ({quantity, total, paymentMethod, shipping_method, status}) => {
    const tax = formatPrice(Number(total) * 19 / 100 || 0)
    const totalPrice = formatPrice(total || 0)
    return (
        <div className="flex flex-col gap-3 border-t-[1px] p-4 text-sm">
            <div className="flex justify-between ">
                <span>Suptotal {quantity} articles</span>
                <span>{totalPrice}</span>
            </div>
            <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shipping_method === 'shipping' ? 'Standard' : 'Pickup'}</span>
            </div>
            <div className="flex justify-between">
                <span>Payment</span>
                <span>{paymentMethod === 'mercado_pago' ? 'Mercado Pago' : 'Cash on delivery'}</span>
            </div>
            <div className="flex justify-between text-lg font-medium">
                <span>Total</span>
                <span>{totalPrice}</span>
            </div>
            <p className="text-sm text-gray-500 font-light">Includes {tax} in taxes</p>
            <p className={`${status === 'pending' ? 'text-yellow-500' : 'text-green-500'}`}>Status {status?.toUpperCase()}</p>
        </div>
    )
}