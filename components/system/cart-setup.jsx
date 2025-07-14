'use client';

import { useEffect } from 'react';
import { useCartStore } from '@/app/stores/cartStore';
import { supabase } from '@/lib/supabase/supabaseClient';
import { useUserStore } from '@/app/stores/userStore';

export const CartSetup = () => {
  const user = useUserStore((state) => state.user);
  const {
    cart,
    loadCart,
    refreshCartIfUpdated,
    cartUpdated
  } = useCartStore();

  // Cargar carrito inicial
  useEffect(() => {
    if (user?.id) {
      loadCart(user.id);
    }
  }, [user?.id]);

  // Sincronizar si el store indica que hay cambios
  useEffect(() => {
    if (user?.id && cartUpdated) {
      refreshCartIfUpdated(user.id);
    }
  }, [user?.id, cartUpdated]);

  // Listeners realtime de Supabase
  useEffect(() => {
    if (!user?.id || !cart?.id) return;

    const cartItemsChannel = supabase
      .channel('public:cart_items', {
        config: { broadcast: { self: true } }
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'cart_items' }, () => {
        loadCart(user.id);
      })
      .subscribe();

    const cartChannel = supabase
      .channel(`cart_${cart.id}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'cart' }, () => {
        loadCart(user.id);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(cartItemsChannel);
      supabase.removeChannel(cartChannel);
    };
  }, [user?.id, cart?.id]);

  return null;
};