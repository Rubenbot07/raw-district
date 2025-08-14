'use server'
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
export const completeUserProfile = async (formData) => {
    const supabase = await createSupabaseServerClient()
    const fullName = formData.get("fullName");
    const address = formData.get("address");
    const phone = formData.get("phone");
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
        throw new Error('No active session')
    }

    const { error: updateUserError } = await supabase.auth.updateUser({
        data: { full_name: fullName, address, phone },
    });
    if (updateUserError) {
        throw new Error(updateUserError.message);
    }

    redirect("/");
}