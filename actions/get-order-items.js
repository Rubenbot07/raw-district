import { supabase } from "@/lib/supabase/supabaseClient";
export const getOrderItems = async (orderId) => {
    const { data, error } = await supabase
        .from('order_items')
        .select('*')
        .eq('order_id', orderId)
    return {
        data,
        error
    }
}