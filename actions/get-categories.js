'use server'
import { cache } from 'react'
import { supabase } from '@/lib/supabase/supabaseClient'
export const getCategories = cache(async () => {
    const { data: categories, error } = await supabase.from('categories').select('*')
    return {
        categories,
        error
    }
})