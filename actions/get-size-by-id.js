import { supabase } from '@/lib/supabase/supabaseClient';   
export const getSizeById = async (sizeId) => {
    const { data, error } = await supabase
        .from('product_sizes')
        .select('*')
        .eq('id', sizeId)
        .single();
    return {
        size: data,
        error
    }
}