'use server'
import { cache } from 'react'
import { createSupabaseServerClient } from '@/lib/supabase/server'

export const getCategories = cache(async () => {
    const supabase = createSupabaseServerClient()
    const { data: categories, error } = await supabase.from('categories').select('*')
    return {
        categories,
        error
    }
})