import { EditForm } from '@/components/profile/edit-form';
import { getUser } from '@/actions/get-user';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

export const metadata = {
  title: "Edit Profile",
  description: "Edit profile page",
}

export default async function EditFormPage() {
  const { user, error } = await getUser();
  const t = await getTranslations("Profile");

  if (error) {
    console.error("Error fetching user:", error);
    return (
      <main className="py-10 px-4 max-w-xl mx-auto">
        <section
          role="alert"
          className="bg-red-100 border border-red-300 text-red-800 rounded-md p-4"
        >
          <h1 className="text-lg font-semibold mb-2">{t("Error")}</h1>
          <p>{error.message || "We couldn't retrieve your profile information."}</p>
        </section>
      </main>
    );
  }

  return (
    <main
      className="flex flex-col gap-8 mx-auto lg:max-w-4xl px-4 py-10 h-screen"
      aria-labelledby="edit-profile-title"
    >
      <header className="flex items-center gap-2">
        <Link
          href="/profile"
          aria-label="Go back to profile"
          className="text-gray-600 hover:text-black transition"
        >
          <ArrowLeft size={20} />
        </Link>
        <h1 id="edit-profile-title" className="text-2xl font-medium">
          {t("editTitle")}
        </h1>
      </header>

      <EditForm userInfo={user} />
    </main>
  );
}