'use server'
import { supabase } from '@/lib/supabase/supabaseClient';
import { cache } from 'react';

export const getProductDetail = cache(async (slug) => {
        const { data: product, error } = await supabase
        .from('products')
        .select(`*,
        product_images(
            image_url,
            thumbnail_url,
            position
        ),
        categories(
            name
        ),
        product_sizes(
            size,
            id,
            stock,
            sku
        )`)
        .eq('slug', slug)
        .single();

    return {
        product,
        error
    }
})