'use server'
import { supabase } from '@/lib/supabase/supabaseClient';
import { Cart } from '@/components/cart';
// import { useEffect, useState } from 'react';

export const CartWrapper = async ({ userId }) => {
    
    // const [cart, setCart] = useState(null);
    // const [cartItems, setCartItems] = useState(null);
    // const [open, setOpen] = useState(false);
    if(!userId) {
        return (
            <div className="bg-white h-auto w-auto flex flex-col items-center justify-center">
                <p>Please log in to view your cart.</p>
            </div>
        );
    }

    const { data: cartData, error: cartError } = await supabase
        .from('cart')
        .select('*')
        .eq('user_id', userId)
        .eq('status', 'active');
        if (cartError) {
            console.error('Error fetching cart:', cartError);
            return;
        }
        console.log('cartData', cartData);
                const { data: itemsData, error: itemsError } = await supabase
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
                    .eq('cart_id', cartData[0].id);
    
                if (itemsError) {
                    console.error('Error fetching cart items:', itemsError);
                    return;
                }
    // }, [userId]);

  return (
    <div className="bg-white h-auto w-auto flex flex-col items-center justify-center">
        <Cart cart={userId ? cartData : null} cartItems={userId ? itemsData : []} />
    </div>
  );
}