import { formatPrice } from "@/utils/formatPrice";
import { OrderSummaryDetail } from "@/components/order-summary-detail";
export const OrderSummaryCart = ({cartItems, children}) => {
    return (
        <section className="flex flex-col gap-4 px-2">
            <div className="flex flex-col gap-4 max-h-96 overflow-y-scroll p-4">
                {cartItems?.map(item => (
                    <div key={item.id} className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 relative">
                                <img className="w-full h-full object-cover rounded-xl" src={item.products.product_images[0].thumbnail_url} alt="" /> 
                                <div>
                                    <span className="text-xs absolute top-[-6px] right-[-6px] bg-gray-800 opacity-70 text-white rounded-full w-6 h-6 flex items-center justify-center">{item.quantity}</span>
                                </div>
                            </div>
                            <div>
                                <p className="text-sm">{item.products.name}</p>
                            </div>
                        </div>
                        <span className="text-sm ">{formatPrice(item.products.price * item.quantity)}</span>
                    </div>
                ))}
            </div>
            <hr />
            {children}
        </section>
    )
}