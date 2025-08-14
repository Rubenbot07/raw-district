'use server'
import { createSupabaseServerClient } from '@/lib/supabase/server'

export async function getUser() {
      const supabase = createSupabaseServerClient();
      const { data: { user }, error } = await supabase.auth.getUser();
      return {
          user,
          error
      }
}