'use server'
import { createClient } from '../lib/supabase/server'
import { redirect} from 'next/navigation'

const signInWith = provider => async () => {
    const supabase = await createClient()
    const auth_callbackUrl = 'http://localhost:3000/auth/callback'

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