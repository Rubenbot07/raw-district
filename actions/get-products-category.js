'use server';
import { supabase } from '@/lib/supabase/supabaseClient';

export async function getProductsByCategory(categoryId) {
    
    const { data, error } = await supabase
        .from('products')
        .select(`*,
            product_images(
                image_url,
                thumbnail_url,
                position
            )`)
        .eq('category_id', categoryId);

    if (error) return [];

    return data;
}