import { supabase } from '@/lib/supabase/supabaseClient';

export async function getCartItems(cartId) {
  const { data, error } = await supabase
    .from('cart_items')
    .select(`
      *,
      products (
        id,
        name,
        price,
        description,
        i18n_key,
        categories (
          name
        ),
        product_images (
          image_url,
          thumbnail_url,
          position
        ),
        product_sizes (
          id,
          size,
          stock,
          sku
        )
      )
    `)
    .eq('cart_id', cartId);
  if (error) throw new Error(error.message);
  return data;
}