import { supabase } from "../lib/supabase/supabaseClient";
export const createOrderItems = async ({orderItems, orderId, cartId}) => {
    
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
    return {
        orderItems: data,
        error
    }
};
