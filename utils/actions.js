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
export const updateUserMetadata = async (formData) => {
    const supabase = await createClient()

    const address = formData.get('address')
    const phone = formData.get('phone')

    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
        throw new Error('No active session')
    }

    const { error } = await supabase.auth.updateUser({
        data: { address, phone }
    })

    if (error) {
        throw new Error(error.message)
    }

    redirect('/profile')
}

export async function logoutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
}

const signInWithGoogle = signInWith('google')

export { signInWithGoogle }
