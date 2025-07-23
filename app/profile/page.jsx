import Link from "next/link";
import { getUser } from "@/actions/get-user";
import { ProfileInfo } from "@/components/profile/profile-info";

export default async function Profile() {
  
  const { user, error } = await getUser();

  if (error) {
    console.error("Error fetching user:", error);
    return <p>Error loading profile</p>;
  }
  return (
      <ProfileInfo user={user}/>
  );
}