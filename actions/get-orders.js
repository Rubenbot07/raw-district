'use server'
import { createSupabaseServerClient } from '@/lib/supabase/server'

export const getOrders = async (userId) => {
    const supabase = createSupabaseServerClient()
    const { data, error } = await supabase
        .from('orders')
        .select(`*,
            order_items(
                product_id,
                quantity,
                size,
                unit_price,
                subtotal
            )`)
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
    const orders = data.map(order => ({
        ...order,
        total_quantity: order.order_items.reduce((total, item) => total + item.quantity, 0),
        total_price: order.order_items.reduce((total, item) => total + item.subtotal, 0),
    }));
    return {
        orders,
        error
    }
}