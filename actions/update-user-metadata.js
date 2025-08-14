'use server'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { redirect} from 'next/navigation'
export const updateUserMetadata = async (formData) => {
    const supabase = await createSupabaseServerClient()

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
