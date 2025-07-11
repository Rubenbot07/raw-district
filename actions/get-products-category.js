'use server';
import { cache } from 'react';
import { supabase } from '@/lib/supabase/supabaseClient';

export const getProductsByCategory = cache (async(categoryId) => {
    
    const { data, error } = await supabase
        .from('products')
        .select(`*,
            product_images(
                image_url,
                thumbnail_url,
                position
            ),
            categories(
                name
            )`)
        .eq('category_id', categoryId);

    if (error) return [];

    return data;
})