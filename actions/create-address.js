'use server'
import { createSupabaseServerClient } from '@/lib/supabase/server'

export const createAddress = async ({user_id, email, first_name, last_name, address_line, phone, city, state, identification}) => {
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase
    .from('addresses')
    .insert({
        user_id: user_id,
        email: email,
        first_name: first_name,
        last_name: last_name,
        address_line: address_line,
        phone: phone,
        city: city,
        state: state,
        identification: identification
    })
    .select()
    .single();
    return {
        address: data,
        error
    }
}