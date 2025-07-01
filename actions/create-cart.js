'use server';
import { supabase } from '@/lib/supabase/supabaseClient';
import { getUser } from '@/actions/get-user';

export const createCart = async () => {
    const { user, error } = await getUser();
    if (!user) throw new Error(error?.message || 'User not authenticated');

    // Buscar si ya existe un cart activo para el usuario
    const { data: existingCart, error: fetchError } = await supabase
        .from('cart')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'active')
        .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
        // PGRST116: No rows found, lo ignoramos porque significa que no hay cart activo
        throw new Error(`Error fetching cart: ${fetchError.message}`);
    }

    if (existingCart) {
        // Ya existe un cart activo, no creamos uno nuevo
        return existingCart;
    }

    // Si no existe, creamos uno nuevo
    const { data: newCart, error: insertError } = await supabase
        .from('cart')
        .insert({ user_id: user.id, status: 'active' })
        .select()
        .single();

    if (insertError) {
        throw new Error(`Error creating cart: ${insertError.message}`);
    }

    return newCart;
}