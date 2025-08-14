'use server'
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createCart } from "@/actions/create-cart";
export const updateCart = async (cartId) => {
    const supabase = createSupabaseServerClient();
        const { error } = await supabase
        .from('cart')
        .update({ status: 'completed' })
        .eq('id', cartId);
    
        if (error) {
            console.error("Error updating cart status:", error);
        }

        const newCart = await createCart();
        return newCart
};