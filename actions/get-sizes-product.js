'use server'
import { createSupabaseServerClient } from '@/lib/supabase/server'


export const getSizesProduct = async (productId) => {
    const supabase = createSupabaseServerClient()
     const { data } = await supabase
                .from('product_sizes')
                .select('*')
                .eq('product_id', productId);
    return {
        sizes: data,
        error: null
    }
}