'use client';
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const ProfileInfo = ({ user }) => {
  return (
    <section
      className="flex flex-col gap-8 mx-auto w-full lg:max-w-4xl p-4 h-screen"
      aria-labelledby="profile-heading"
    >
      <div className="flex items-center gap-2">
        <Link href="/" aria-label="Go back to homepage">
          <ArrowLeft size={20} />
        </Link>
        <h1 id="profile-heading" className="text-2xl font-medium">
          Profile
        </h1>
      </div>

      <div
        className="flex flex-col gap-2 bg-gray-100 p-4 rounded-[8px] text-sm"
        role="region"
        aria-label="User profile information"
      >
        <dl className="grid grid-cols-1 gap-4">
          <div>
            <dt className="text-gray-600">Name</dt>
            <dd>{user?.user_metadata.full_name}</dd>
          </div>
          <div>
            <dt className="text-gray-600">Email</dt>
            <dd>{user?.email}</dd>
          </div>
          <div>
            <dt className="text-gray-600">Address</dt>
            <dd>{user?.user_metadata.address}</dd>
          </div>
          <div>
            <dt className="text-gray-600">Phone</dt>
            <dd>{user?.user_metadata.phone}</dd>
          </div>
        </dl>
      </div>

      <Link
        href="/profile/edit"
        className="bg-black text-white py-2 text-center rounded-[8px] self-start w-32"
        aria-label="Edit profile"
      >
        Edit
      </Link>
    </section>
  );
};