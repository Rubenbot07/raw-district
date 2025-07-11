import { CheckoutInfo } from "@/components/checkout-info"
import { OrderSummary } from "@/components/order-summary"
export default function Page() {
    return (
        <section>
            <div className="grid grid-cols-1 lg:grid-cols-2 max-w-xl lg:max-w-5xl mx-auto">
                <div className="block w-full lg:hidden">
                    <OrderSummary />
                </div>
                <CheckoutInfo />
                <div className="hidden lg:block lg:col-start-2 p-8">
                    <OrderSummary />
                </div>
            </div>
        </section>
    )
}