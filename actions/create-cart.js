'use server'
import { getUser } from "@/actions/get-user";
import { supabase } from "@/lib/supabase/supabaseClient";
export const createCart = async ({ type = 'active' } = {}) => {
    const { user, error } = await getUser();
    if (!user) throw new Error(error?.message || 'User not authenticated');

    // Si el tipo es 'active', busca si ya existe uno
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

        if (existingCart) {
            return existingCart;
        }
    }

    // Crea el carrito (puede ser 'active', 'quick', etc.)
    const { data: newCart, error: insertError } = await supabase
        .from('cart')
        .insert({ user_id: user.id, status: type })
        .select()
        .single();

    if (insertError) {
        throw new Error(`Error creating cart: ${insertError.message}`);
    }

    return newCart;
}