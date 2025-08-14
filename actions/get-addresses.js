'use server'
import { createSupabaseServerClient } from '@/lib/supabase/server'

export const getAddresses = async(addressId) => {
    const supabase = createSupabaseServerClient()
    const { data, error } = await supabase
        .from('addresses')
        .select('*')
        .eq('id', addressId)
    return {
        addresses: data,
        error
    }
}