'use server'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

const signInWith = provider => async () => {
  const supabase = createSupabaseServerClient()
  console.log('Redirect URL en producción:', process.env.NEXT_PUBLIC_SITE_URL);
  const auth_callbackUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: auth_callbackUrl,
    },
  })

  console.log('signInWith', provider, data)
  if (error) {
    console.error('Error signing in with', provider, error)
    throw error
  }
  redirect(data.url || '/')
}

const signInWithGoogle = signInWith('google')

export { signInWithGoogle }