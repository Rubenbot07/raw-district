'use server';
import { createSupabaseServerClient } from '@/lib/supabase/server'

export async function getActiveCart(userId) {
  const supabase = createSupabaseServerClient();
    if(!userId) {
        return { cart: null, error: 'User ID is required' };
    } 
  const { data, error } = await supabase
    .from('cart')
    .select('*')
    .eq('user_id', userId)
    .eq('status', 'active')
    .single();

  if (error && error.code !== 'PGRST116') throw new Error(error.message);

  return data;
}