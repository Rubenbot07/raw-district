import { CheckoutInfo } from "@/components/checkout/checkout-info"
import { CheckoutSummary } from "@/components/checkout/checkout-summary"
export default function Page() {
    return (
        <section>
            <div className="grid grid-cols-1 lg:grid-cols-2 max-w-xl lg:max-w-5xl mx-auto">
                <div className="block w-full lg:hidden">
                    <CheckoutSummary />
                </div>
                <CheckoutInfo />
                <div className="hidden lg:block lg:col-start-2 p-8">
                    <CheckoutSummary />
                </div>
            </div>
        </section>
    )
}