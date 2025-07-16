'use client'
import { DeliveryOptions } from '@/components/checkout/delivery-options';
import { StoreBranches } from '@/components/checkout/store-branches';
import { PurchaseForm } from '@/components/checkout/purchase-form';
import { Payment } from '@/components/checkout/payment';
import { ChevronDown } from 'lucide-react';
import { CheckoutSummaryDetail } from '@/components/checkout/checkout-summary-detail';
import { CheckoutSummaryCart } from '@/components/checkout/checkout-summary-cart';
import { formatPrice } from '@/utils/formatPrice';  
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCheckoutHandler } from '@/app/hooks/useCheckoutHandler';
import { useUserStore } from '@/app/stores/userStore';
import { useCartStore } from '@/app/stores/cartStore';
export const CheckoutInfo = () => {
  const [delivery, setDelivery] = useState("shipping");
  const [payment, setPayment] = useState("mercado_pago");
  const [formData, setFormData] = useState({ name: "", surname: "", identification: "", address: "", city: "", state: "", zip: "", phone: "" });
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rotate, setRotate] = useState(false);

  const user = useUserStore((state) => state.user);
  const cart = useCartStore((state) => state.cart);
  const cartItems = useCartStore((state) => state.cartItems);
  const setCartItems = useCartStore((state) => state.setCartItems);
  const setCart = useCartStore((state) => state.setCart);
  const setCartUpdated = useCartStore((state) => state.setCartUpdated);
  const getCartTotalPriceLocal = useCartStore((state) => state.getCartTotalPriceLocal);
  const getCartTotalQuantityLocal = useCartStore((state) => state.getCartTotalQuantityLocal);
  const router = useRouter();

  const { handleCheckout } = useCheckoutHandler({
    user, cart, cartItems, setCartItems, setCart, setCartUpdated, router, setLoading
  });

  const totalPrice = getCartTotalPriceLocal() || 0;
  const totalQuantity = getCartTotalQuantityLocal() || 0;

  const handleBuyNow = () => {
    handleCheckout({ delivery, payment, formData }).catch(console.error);
  };

  return (
    <section className="bg-white h-auto w-auto flex flex-col gap-7 lg:border-r-[1px] p-4">
      <div className='flex flex-col gap-2 border-b-[1px] border-gray-400 py-3'>
        <p className='font-light text-sm text-gray-500'>Account</p>
        <p>{user?.email}</p>
      </div>

      <DeliveryOptions delivery={delivery} setDelivery={setDelivery} />
      {delivery === "shipping"
        ? <PurchaseForm formData={formData} setFormData={setFormData} />
        : <StoreBranches />
      }

      <Payment payment={payment} setPayment={setPayment} />

      <div className='flex justify-between items-center p-3 lg:hidden'>
        <h2 className="font-normal text-2xl">Order Summary</h2>
        <div onClick={() => setOpen(!open)} className="flex gap-2 items-center text-sm cursor-pointer">
          <span onClick={() => setRotate(!rotate)}>Show</span>
          <span className={`transition-transform ${rotate ? 'rotate-180' : ''}`}>
            <ChevronDown/>
          </span>
        </div>
      </div>

      {open && <CheckoutSummaryCart cartItems={cartItems} />}

      <div className='lg:hidden'>
        <CheckoutSummaryDetail
          totalPrice={formatPrice(totalPrice)}
          totalQuantity={totalQuantity}
          shippingPrice={formatPrice(50000)}
          tax={formatPrice((cart?.total_price || 0) * 0.19)}
        />
      </div>

      <button className="bg-black text-white py-3 text-center rounded-[8px]" onClick={handleBuyNow}>
        {loading ? "Loading..." : "Buy Now"}
      </button>
    </section>
  );
};