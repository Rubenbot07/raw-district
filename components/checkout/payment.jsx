import { SelectableOptions } from "@/components/checkout/selectable-options";
import { RedirectIcon } from "@/components/icons/redirect-icon";
import { useState } from "react";
export const Payment = ({payment, setPayment}) => {
    const [openWallet, setOpenWallet] = useState(true);
    const [openCash, setOpenCash] = useState(false);
    const handleClick = (target) => {
        console.log(payment);
        if(payment === "mercado_pago" && target === "cash") {
            setPayment("cash_on_delivery");
            setOpenWallet(false);
            setOpenCash(true);
        }
        if(payment === "cash_on_delivery" && target === "mercado") {
            setPayment("mercado_pago");
            setOpenCash(false);
            setOpenWallet(true);
        }
    };
    return (
        <section className="flex flex-col gap-3 group">
            <h2>Payment</h2>
            <p className="font-light text-gray-500">All transactions are secure and encrypted</p>
            <div className="flex flex-col">
                <button onClick={() => handleClick('mercado')}>                
                    <SelectableOptions name="mercado_pago" text="Mercado Pago" value={payment} setValue={setPayment} position="top">
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAA7VBMVEX////t6vLLxd6go9CGmcXWz+CCh8FKhMsAitwAnegArvYAvP8Av/8Ajt5Ifsbe2ulSZLIAtvwAwP8Awv8AlOJXbLbj3+uDfrYATbYAw/83br9JcMEAdckAqfIAxv8Aa8qNibxtbLCnqdBUesEAccsAnOgAhdYAW7fo6/UAfdOem8V1ebastNZDQpyTlMNJU6XL0OZVXqrx9/yIlskuMprBvdVDRKEAY7k5esl9i8KjpsoAUq0Atf1ui8soPZ4ANqp7mtKitdyHhbNdb7EAAH26y+Z1bqwAAIUAAHEwW65kj8oAAGsAIZA+OJIqHojeo/tKAAABXElEQVR4AcXRhYHCMAAF0I9LwhVS3B2quLs7+49zaXEW4LVxT/BTFqvNztmsFnxxOF1uj5dQSrwe35/TgRfB7wtQA2NM5EkgGArjLhJlMV4lEnc8EU+mCGOxdCYLU86aLxRLnnLFLwCo8oKUqfhlxRwnmLtRrRqg14wqCwfUdR5k3DSa1YYAQXuuJguI4M6Za8EQquNOR9taxSenCkO400UvJfVtTbzTB2gOuxWpglGMsnFmMGnl1VsXQUVnGnVTMT1CN0AISc8gID9fwNDJQx8zXqthKYmEUE+8A2DFI7UOtdujhIiSDss6xXgriUfqaG5UFdn81sP7s9TaAuhrI0/E8WgVhr2j54teY1xqJ4PL7cvUaI6lDv3gsWwOI9J6C1PkdC6TGLu9CqNMjLnPp1sbV7/s9yOpFDB5y6P1XqvjpZO77vf79W63W+/315wVn5rhfHbJZfPhJn7oH8WJK4f0iacgAAAAAElFTkSuQmCC" alt="" />
                    </SelectableOptions>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openWallet ? 'max-h-[250px]' : 'max-h-0'} border-x-[1px] border-gray-300  bg-gray-100`}>
                    <div className="flex flex-col gap-3 items-center mx-auto p-4 max-w-[300px]">
                       <RedirectIcon />
                       <p className="font-light text-sm text-center">
                            After clicking  "Pay Now", you will be redirected to Mercado Pago to complete your purchase safety.
                        </p> 
                    </div>
                </div>
                <button onClick={() => handleClick('cash')}>
                    <SelectableOptions name="cash_on_delivery" text="Cash on delivery" value={payment} setValue={setPayment} position="bottom"/>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openCash ? 'max-h-[250px]' : 'max-h-0'} border-x-[1px] border-b-[1px] border-gray-300  bg-gray-100`}>
                    <div className="flex flex-col gap-3 items-center mx-auto p-4 w-full">
                       <p className="font-light text-sm text-justify">
                            You can pay for the purchase in cash at the time of receiving your order, you must have the exact cash value.
                            <br /> <br />
                            CASH is only accepted upon receipt of the package. If you prefer to pay by card or transfer, you must use another payment method when purchasing.
                        </p> 
                    </div>
                </div>
            </div>
        </section>
    )
};