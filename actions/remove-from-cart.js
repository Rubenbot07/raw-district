'use server';

import { createSupabaseServerClient } from "@/lib/supabase/server";

export const removeFromCart = async (itemId) => {
    const supabase =  createSupabaseServerClient();

    const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('id', itemId);

    if (error) {
        console.error('Error removing item from cart:', error);
    }
};