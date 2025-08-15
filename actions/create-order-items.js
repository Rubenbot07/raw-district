'use server'
import { createSupabaseServerClient } from '@/lib/supabase/server'

export const createOrderItems = async ({orderItems, orderId}) => {
    const supabase = createSupabaseServerClient()
    
    const itemsPayload = orderItems.map((item) => ({
        order_id: orderId,
        product_id: item.product_id,
        quantity: item.quantity,
        size: item.products.product_sizes.find(size => size.id === item.product_size_id)?.size,
        unit_price: item.unit_price,
    }))
    const { data, error } = await supabase
    .from('order_items')
    .insert(itemsPayload);

    if (error) {
        console.error("Error creating order items:", error);
    }    

    for (const item of itemsPayload) {
        const { error: stockError } = await supabase.rpc("update_stock", {
        p_product_id: item.product_id,
        p_size: item.size,
        p_quantity: item.quantity,
        });

        if (stockError) {
        console.error("Error decrementing stock:", stockError);
        return { orderItems: null, error: stockError };
        }
    }
    return {
        orderItems: data,
        error
    }
};
