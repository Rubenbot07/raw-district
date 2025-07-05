import { supabase } from "@/lib/supabase/supabaseClient";
export const removeFromCart = async (itemId) => {
    const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('id', itemId)
    if (error) {
        console.error('Error removing item from cart:', error)
    }
}