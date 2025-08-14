'use server'
import { createSupabaseServerClient } from '@/lib/supabase/server'

export const deleteCart = async (cartId) => {
    const supabase = createSupabaseServerClient();
    const { error } = await supabase
    .from('cart')
    .delete()
    .eq('id', cartId);
    return error
}