import { supabase } from '@/lib/supabase/supabaseClient';
import { createClient } from '@/lib/supabase/server';
import { Cart } from '@/components/cart';

export const CartWrapper = async () => {
    // Initialize Supabase client
    const supabaseClient = await createClient();
    // Fetch cart items from the database
    const { data: user } = await supabaseClient.auth.getUser();
    const { data: cart, error } = await supabase
        .from('cart')
        .select('*')
        .eq('user_id', user?.user?.id)
        .eq('status', 'active');
    const { data: cartItems } = await supabase
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
        .eq('cart_id', cart?.[0]?.id);

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
        <Cart cart={cart} cartItems={cartItems} />
    </div>
  );
}