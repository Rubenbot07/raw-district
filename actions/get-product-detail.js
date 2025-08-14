'use server'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { cache } from 'react';


export const getProductDetail = cache(async (slug) => {
    const supabase = createSupabaseServerClient()
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