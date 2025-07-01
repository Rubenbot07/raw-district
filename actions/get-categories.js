'use server'
import { supabase } from '@/lib/supabase/supabaseClient'
export const getCategories = async () => {
    const { data: categories, error } = await supabase.from('categories').select('*')
    return {
        categories,
        error
    }
}