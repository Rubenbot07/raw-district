import { supabase } from  '@/lib/supabase/supabaseClient'
export const getOrders = async (userId) => {
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