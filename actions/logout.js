'use server'
import { createSupabaseServerClient } from '@/lib/supabase/server'

export async function logoutAction() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
}