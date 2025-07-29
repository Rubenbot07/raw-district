import { useEffect } from 'react';
import { useCartStore } from '@/app/stores/cartStore';

export const useQuickCartCleanup = () => {
  const cart = useCartStore((state) => state.cart);
  const deleteQuickCart = useCartStore((state) => state.deleteQuickCart);

  // Se ejecuta cuando el componente se desmonta
  useEffect(() => {
    return () => {
      if (cart?.status === 'quick') {
        deleteQuickCart(cart.id);
      }
    };
  }, [cart]);

  // Se ejecuta si el user cierra o recarga la página
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (cart?.status === 'quick') {
        const payload = JSON.stringify({ cartId: cart.id });
        const blob = new Blob([payload], { type: 'application/json' });
        navigator.sendBeacon('/api/delete-cart', blob);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [cart]);
};