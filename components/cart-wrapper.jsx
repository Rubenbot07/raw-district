'use client';
import { supabase } from '@/lib/supabase/supabaseClient';
import { Cart } from '@/components/cart';
import { useEffect, useState } from 'react';

export const CartWrapper =  ({ userId }) => {    
    const [open, setOpen] = useState(false);
    const [cart, setCart] = useState(null);
    const [cartItems, setCartItems] = useState(null);
    
useEffect(() => {
    const fetchCartData = async () => {
        if (!userId) {
            setCart(null);
            setCartItems([]);
            return;
        }
        const { data: cartData, error: cartError } = await supabase
            .from('cart')
            .select('*')
            .eq('user_id', userId)
            .eq('status', 'active');

        if (cartError) {
            console.error('Error fetching cart:', cartError);
            setCart(null);
            setCartItems([]);
            return;
        }
        setCart(cartData[0]);

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
            .eq('cart_id', cartData[0]?.id);

        if (itemsError) {
            console.error('Error fetching cart items:', itemsError);
            setCartItems([]);
            return;
        }
        setCartItems(itemsData);
    };

    fetchCartData(); // <-- ¡Llama a la función aquí!

    // Suscripción realtime
    const channel = supabase
        .channel('public:cart_items')
        .on(
            'postgres_changes',
            { event: '*', schema: 'public', table: 'cart_items' },
            (payload) => {
                console.log('Change received!', payload);
                fetchCartData();
            }
        )
        .subscribe();

    return () => {
        supabase.removeChannel(channel);
    };
}, [userId]);

  return (
    <div className="bg-white h-auto w-auto flex flex-col items-center justify-center">
        <button onClick={() => setOpen(!open)}>Shopping Cart</button>
        { open && 
            <Cart cart={userId ? cart : null} cartItems={userId ? cartItems : []} />
        }
    </div>
  );
}