'use server';

import { createSupabaseServerClient } from '@/lib/supabase/server';

export const createCart = async ({ type = 'active' } = {}) => {
  const supabase = createSupabaseServerClient();

  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (!user) throw new Error(authError?.message || 'User not authenticated');

  // Buscar carrito activo
  if (type === 'active') {
    const { data: existingCart, error: fetchError } = await supabase
      .from('cart')
      .select('*')
      .eq('user_id', user.id)
      .eq('status', 'active')
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      throw new Error(`Error fetching cart: ${fetchError.message}`);
    }

    if (existingCart) return existingCart;
  }

  // Crear carrito
  const { data: newCart, error: insertError } = await supabase
    .from('cart')
    .insert({ user_id: user.id, status: type })
    .select()
    .single();

  if (insertError) {
    throw new Error(`Error creating cart: ${insertError.message}`);
  }

  return newCart;
};
