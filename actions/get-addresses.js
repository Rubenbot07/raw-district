import { supabase } from '@/lib/supabase/supabaseClient';
export const getAddresses = async(addressId) => {
    const { data, error } = await supabase
        .from('addresses')
        .select('*')
        .eq('id', addressId)
    return {
        addresses: data,
        error
    }
}