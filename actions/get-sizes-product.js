import { supabase } from '@/lib/supabase/supabaseClient'

export const getSizesProduct = async (productId) => {
     const { data } = await supabase
                .from('product_sizes')
                .select('*')
                .eq('product_id', productId);
    return {
        sizes: data,
        error: null
    }
}