'use client'
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
export const ProfileInfo = ({user}) => {
    return (
        <section className="flex flex-col gap-8 mx-auto lg:max-w-4xl p-4 h-screen">
            <div className="flex items-center gap-2">
                <Link href="/">
                    <ArrowLeft size={20}/>
                </Link>
                <h1 className="text-2xl font-medium">Profile</h1>
            </div>
            <div className="flex flex-col gap-2 bg-gray-100 p-4 rounded-[8px] text-sm">
                <div>
                    <p className="text-gray-600">Name</p> 
                    <p>{user?.user_metadata.full_name}</p>
                </div>
                <div>
                    <p className="text-gray-600">Email</p> 
                    <p>{user?.email}</p>
                </div>
                <div>
                    <p className="text-gray-600">Address</p>
                    <p>{user?.user_metadata.address}</p>
                </div>
                <div>
                    <p className="text-gray-600">Phone</p>
                    <p>{user?.user_metadata.phone}</p>
                </div>
            </div>
            <Link href="/profile/edit" className="bg-black text-white py-2 text-center rounded-[8px] self-start w-32">Edit</Link>
        </section>
    )
}