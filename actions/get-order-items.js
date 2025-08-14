'use server'
import { createSupabaseServerClient } from '@/lib/supabase/server'

export const getOrderItems = async (orderId) => {
    const supabase = createSupabaseServerClient()
    const { data, error } = await supabase
        .from('order_items')
        .select('*')
        .eq('order_id', orderId)
    return {
        data,
        error
    }
}