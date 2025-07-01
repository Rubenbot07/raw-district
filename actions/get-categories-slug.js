'use server';
import { supabase } from '@/lib/supabase/supabaseClient';

export async function getCategoryBySlug(slug) {
    
    const { data, error } = await supabase
        .from('categories')
        .select('id')
        .eq('slug', slug)
        .single();

    if (error || !data) return null;

    return data;
}