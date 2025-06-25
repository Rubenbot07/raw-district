import { EditForm } from '@/components/edit-form'
import { createClient } from '@/lib/supabase/server'
export default async function EditFormPage () {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>
            <EditForm userInfo={user}/>
        </div>
    )
}