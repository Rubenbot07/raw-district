'use client';
import { supabase } from '@/lib/supabase/supabaseClient';
import { Cart } from '@/components/cart';
import { useEffect, useState } from 'react';

export const CartWrapper = ({ userId }) => {
    const [cart, setCart] = useState(null);
    const [cartItems, setCartItems] = useState(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const fetchCartData = async () => {
            const { data: cartData, error: cartError } = await supabase
                .from('cart')
                .select('*')
                .eq('user_id', userId)
                .eq('status', 'active');

            if (cartError) {
                console.error('Error fetching cart:', cartError);
                return;
            }

            setCart(cartData?.[0]);

            if (cartData?.[0]) {
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

                setCartItems(itemsData);
            }
        };

        fetchCartData();
    }, [userId]);

    console.log('Cart:', cart);
  return (
    <div className="bg-white z-50 absolute top-20 right-10 h-auto w-auto flex flex-col items-center justify-center">
      <h2 onClick={() => setOpen(!open)}>Shopping Cart</h2>
      {
        open && 
        <Cart cart={cart} cartItems={cartItems} />
      }
    </div>
  );
}