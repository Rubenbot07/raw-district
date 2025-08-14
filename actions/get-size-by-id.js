'use server'
import { createSupabaseServerClient } from '@/lib/supabase/server'

export const getSizeById = async (sizeId) => {
    const supabase = createSupabaseServerClient() 
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