import { supabase } from '@/lib/supabase/supabaseClient';
export const deleteCart = async (cartId) => {
    const { error } = await supabase
    .from('cart')
    .delete()
    .eq('id', cartId);
    return error
}