import { supabase } from '@/lib/supabase/supabaseClient';
export const getProductById = async (id) => {
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