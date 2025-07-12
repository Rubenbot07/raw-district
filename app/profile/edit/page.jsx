import { EditForm } from '@/components/profile/edit-form'
import { createClient } from '@/lib/supabase/server'
import { getUser } from '@/actions/get-user'
export default async function EditFormPage () {
    const { user, error } = await getUser()
    if (error) {
        console.error("Error fetching user:", error);
        return <p>Error loading profile</p>;
    }
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>
            <EditForm userInfo={user}/>
        </div>
    )
}