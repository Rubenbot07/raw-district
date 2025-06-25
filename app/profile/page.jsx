import Link from "next/link";
import { createClient } from "@/lib/supabase/server";


export default async function Profile() {
  
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error) {
    console.error("Error fetching user:", error);
    return <p>Error loading profile</p>;
  }
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <div>
        <p>Name {user?.user_metadata.full_name}</p>
        <p>Email {user?.email}</p>
        <p>Address {user?.user_metadata.address}</p>
        <p>Phone {user?.user_metadata.phone}</p>
      </div>
      <Link href="/profile/edit">Edit</Link>
    </div>
  );
}