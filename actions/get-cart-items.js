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
        categories (
          name
        ),
        product_images (
          image_url,
          thumbnail_url,
          position
        )
      )
    `)
    .eq('cart_id', cartId);

  if (error) throw new Error(error.message);
  return data;
}