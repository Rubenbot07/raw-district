'use client'
import { DeliveryOptions } from '@/components/orders/delivery-options';
import { StoreBranches } from '@/components/orders/store-branches';
import { PurchaseForm } from '@/components/orders/purchase-form';
import { Payment } from '@/components/orders/payment';
import { ChevronDown } from '@/components/icons/chevron-down-icon';
import { OrderSummaryDetail } from '@/components/orders/order-summary-detail';
import { OrderSummaryCart } from '@/components/orders/order-summary-cart';
import { formatPrice } from '@/utils/formatPrice';  
import { useCartContext } from '@/app/context/CartContext';
import { useUserContext } from '@/app/context/UserContext';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCheckoutHandler } from '@/app/hooks/useCheckoutHandler';
export const CheckoutInfo = () => {
  const [delivery, setDelivery] = useState("shipping");
  const [payment, setPayment] = useState("mercado_pago");
  const [formData, setFormData] = useState({ name: "", surname: "", identification: "", address: "", city: "", state: "", zip: "", phone: "" });
  const [open, setOpen] = useState(false);

  const { cart, cartItems, setCartItems, setCart, setCartUpdated, getCartTotalPriceLocal, getCartTotalQuantityLocal } = useCartContext();
  const { user } = useUserContext();
  const router = useRouter();

  const { handleCheckout } = useCheckoutHandler({
    user, cart, cartItems, setCartItems, setCart, setCartUpdated, router
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
        <p>{user.email}</p>
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
          <span>Show</span>
          <ChevronDown />
        </div>
      </div>

      {open && <OrderSummaryCart cartItems={cartItems} />}

      <div className='lg:hidden'>
        <OrderSummaryDetail
          totalPrice={formatPrice(totalPrice)}
          totalQuantity={totalQuantity}
          shippingPrice={formatPrice(50000)}
          tax={formatPrice((cart?.total_price || 0) * 0.19)}
        />
      </div>

      <button className="bg-black text-white py-3 text-center rounded-[8px]" onClick={handleBuyNow}>
        Buy Now
      </button>
    </section>
  );
};