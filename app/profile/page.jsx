import { getUser } from "@/actions/get-user";
import { ProfileInfo } from "@/components/profile/profile-info";

export const metadata = {
  title: "Profile",
  description: "Profile page",
}

export default async function Profile() {
  const { user, error } = await getUser();

  if (error || !user) {
    console.error("Error fetching user:", error);
    return (
      <main className="py-10 px-4 max-w-xl mx-auto">
        <section
          role="alert"
          className="bg-red-100 border border-red-300 text-red-800 rounded-md p-4"
        >
          <h1 className="text-lg font-semibold mb-2">Error loading profile</h1>
          <p>{error?.message || "We couldn't retrieve your profile information."}</p>
        </section>
      </main>
    );
  }

  return (
    <main className="py-10 max-w-4xl mx-auto" aria-labelledby="profile-title">
      <ProfileInfo user={user} />
    </main>
  );
}