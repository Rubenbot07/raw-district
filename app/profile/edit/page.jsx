import { EditForm } from '@/components/profile/edit-form'
import { getUser } from '@/actions/get-user'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default async function EditFormPage () {
    const { user, error } = await getUser()
    if (error) {
        console.error("Error fetching user:", error);
        return <p>Error loading profile</p>;
    }
    return (
        <div className='flex flex-col gap-8 mx-auto lg:max-w-4xl p-4'>
            <div className="flex items-center gap-2">
                <Link href="/profile">
                    <ArrowLeft size={20} />
                </Link>
                <h1 className="text-2xl font-medium">Edit Profile</h1>
            </div>
            <EditForm userInfo={user}/>
        </div>
    )
}