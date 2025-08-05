'use client'
import { useCheckoutForm } from '@/app/hooks/useCheckoutForm';
import { useQuickCartCleanup } from '@/app/hooks/useQuickCartCleanup';
import { useCheckoutHandler } from '@/app/hooks/useCheckoutHandler';
import { useUserStore } from '@/app/stores/userStore';
import { useCartStore } from '@/app/stores/cartStore';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { DeliveryOptions, StoreBranches, PurchaseForm, Payment, CheckoutSummaryDetail, CheckoutSummaryDown, BuyButton } from '@/components/checkout';
import { formatPrice } from '@/utils/formatPrice';  
export const CheckoutInfo = () => {
  const { delivery, setDelivery, payment, setPayment, formData, setFormData } = useCheckoutForm();
  const [loading, setLoading] = useState(false);
  const [invalidFields, setInvalidFields] = useState([]);

  const user = useUserStore((state) => state.user);
  const cart = useCartStore((state) => state.cart);
  const cartItems = useCartStore((state) => state.cartItems);
  const setCartItems = useCartStore((state) => state.setCartItems);
  const setCart = useCartStore((state) => state.setCart);
  const setCartUpdated = useCartStore((state) => state.setCartUpdated);
  const getCartTotalPriceLocal = useCartStore((state) => state.getCartTotalPriceLocal);
  const getCartTotalQuantityLocal = useCartStore((state) => state.getCartTotalQuantityLocal);
  const router = useRouter();
  const { handleCheckout } = useCheckoutHandler({ user, cart, cartItems, setCartItems, setCart, setCartUpdated, router, setLoading });

  useQuickCartCleanup(); // 👈 this hook is used to clean the quick cart if user doesn't finish the checkout

  const totalPrice = getCartTotalPriceLocal() || 0;
  const totalQuantity = getCartTotalQuantityLocal() || 0;

const handleBuyNow = async () => {
  console.log(invalidFields)
  if (delivery === "shipping") {
    const requiredFields = [
      "name", "surname", "identification",
      "address", "city", "state", "zip", "phone"
    ];

    const invalids = requiredFields.filter((field) => {
      const value = formData[field];
      return !value || value.trim() === "";
    });

    if (invalids.length > 0) {
      setInvalidFields(invalids);
      alert("Please fill in all required fields.");
      return;
    }

    setInvalidFields([]); // limpiar errores si todo está bien
  }

  try {
    setLoading(true);
    await handleCheckout({ delivery, payment, formData });
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};

  return (
    <section
      className="bg-white h-auto w-auto flex flex-col gap-7 lg:border-r-[1px] p-4"
      aria-labelledby="checkout-heading"
    >
      <h2 id="checkout-heading" className="sr-only">Checkout information</h2>

      <div className="flex flex-col gap-2 border-b-[1px] border-gray-400 py-3">
        <p className="font-light text-sm text-gray-500">Account</p>
        <p aria-label={`Current user email: ${user?.email}`}>{user?.email}</p>
      </div>

      <DeliveryOptions delivery={delivery} setDelivery={setDelivery} />

      {delivery === "shipping" ? (
        <PurchaseForm formData={formData} setFormData={setFormData} invalidFields={invalidFields} />
      ) : (
        <StoreBranches />
      )}

      <Payment payment={payment} setPayment={setPayment} />

      <CheckoutSummaryDown cartItems={cartItems} />

      <div className="lg:hidden">
        <CheckoutSummaryDetail
          totalPrice={formatPrice(totalPrice)}
          totalQuantity={totalQuantity}
          shippingPrice={formatPrice(50000)}
          tax={formatPrice((cart?.total_price || 0) * 0.19)}
        />
      </div>
      <BuyButton onClick={handleBuyNow} loading={loading} />
      {/* Región accesible para lectores de pantalla */}
      <span
        className="sr-only"
        aria-live="assertive"
        aria-atomic="true"
      >
        {loading ? "Processing your order" : ""}
      </span>
    </section>
  );
};