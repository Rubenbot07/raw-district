'use server'
import { createSupabaseServerClient } from '@/lib/supabase/server'

export const getProductById = async (id) => {
    const supabase = createSupabaseServerClient()
    const { data, error } = await supabase
        .from('products')
        .select(`*,
        product_images(
            image_url,
            thumbnail_url,
            position
        )`)
        .eq('id', id)
        .single();
    return {
        product: data,
        error
    }
}