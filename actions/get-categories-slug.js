'use server';
import { cache } from 'react'
import { supabase } from '@/lib/supabase/supabaseClient';

export const getCategoryBySlug = cache(async (slug) => {
    
    const { data, error } = await supabase
        .from('categories')
        .select('id, name, slug')
        .eq('slug', slug)
        .single();

    if (error || !data) return null;

    return data;
})