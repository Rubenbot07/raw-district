'use server';
import { supabase } from '@/lib/supabase/supabaseClient';

export async function getActiveCart(userId) {
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