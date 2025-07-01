'use server'
import { supabase } from '../lib/supabase/supabaseClient';
export const getProducts = async () => {
      const { data: products, error } = await supabase
    .from('products')
    .select(`*,
    categories(
      name
    ),
    product_images(
      image_url,
      thumbnail_url,
      position
    )
`)

    return {
        products,
        error
    }
}