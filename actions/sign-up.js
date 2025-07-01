import { createClient } from '@/lib/supabase/client';

export const signUp = async ({ email, password }) => {
    const supabase = await createClient();
    const { error } = await supabase.auth.signUp({
        email,
        password,
    });
    
    if (error) {
        throw new Error(error.message);
    }    
}