'use server'
import { createSupabaseServerClient } from '@/lib/supabase/server'

export const getOrderById = async (orderId) => {
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
        .eq('id', orderId)
        .single();
    const order = {
        ...data,
        total_quantity: data.order_items.reduce((total, item) => total + item.quantity, 0),
    }
    return {
        order,
        error
    }
}