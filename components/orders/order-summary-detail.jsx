
export const OrderSummaryDetail = ({totalPrice, totalQuantity, shippingPrice, tax}) => {
    return (
        <section className="flex flex-col gap-3 px-2">
            <div className="flex justify-between text-sm">
                <span>Subtotal {totalQuantity} articles</span>
                <span>{totalPrice}</span>
            </div>
            <div className="flex justify-between text-sm">
                <span>Shipping </span>
                <span>{totalPrice < 200000  ? shippingPrice : 'Free'}</span>
            </div>
            <div>
                <div className="flex justify-between text-lg font-medium">
                    <span>Total</span>
                    <span>{totalPrice}</span>
                </div>
            </div>
            <p className="text-sm text-gray-500 font-light">Includes {tax} in taxes</p>
        </section>
    )
}