'use server';
import { cache } from 'react'
import { createSupabaseServerClient } from '@/lib/supabase/server'

export const getCategoryBySlug = cache(async (slug) => {
    const supabase = createSupabaseServerClient()
    
    const { data, error } = await supabase
        .from('categories')
        .select('id, name, slug')
        .eq('slug', slug)
        .single();

    if (error || !data) return null;

    return data;
})