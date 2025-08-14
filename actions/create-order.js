'use server'
import { createSupabaseServerClient } from '@/lib/supabase/server'

export const createOrder = async ({status, user_id, shipping_address_id, payment_method, shipping_method, total_price }) => {
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase
    .from('orders')
    .insert({
        status: status,
        user_id: user_id,
        shipping_address_id: shipping_address_id,
        payment_method: payment_method,
        shipping_method: shipping_method,
        total_price: total_price
    })
    .select()
    .single();
    return {
        order: data,
        error
    }
};