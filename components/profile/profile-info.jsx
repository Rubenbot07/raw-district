'use client';
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

export const ProfileInfo = ({ user }) => {
  const t = useTranslations("Profile");
  const tPurchaseForm = useTranslations("PurchaseForm");
  const tCommon = useTranslations("Common");
  const tAriaLabel = useTranslations("AriaLabel");
  
  return (
    <section
      className="flex flex-col gap-8 mx-auto w-full lg:max-w-4xl p-4 h-screen"
      aria-labelledby="profile-heading"
    >
      <div className="flex items-center gap-2">
        <Link href="/" aria-label={tAriaLabel("goHome")}>
          <ArrowLeft size={20} />
        </Link>
        <h1 id="profile-heading" className="text-2xl font-medium">
          {t("title")}
        </h1>
      </div>

      <div
        className="flex flex-col gap-2 bg-gray-100 p-4 rounded-[8px] text-sm"
        role="region"
        aria-label={tAriaLabel("userProfileInfo")}
      >
        <dl className="grid grid-cols-1 gap-4">
          <div>
            <dt className="text-gray-600">{tPurchaseForm("name")}</dt>
            <dd>{user?.user_metadata.full_name}</dd>
          </div>
          <div>
            <dt className="text-gray-600">{tCommon("email")}</dt>
            <dd>{user?.email}</dd>
          </div>
          <div>
            <dt className="text-gray-600">{tPurchaseForm("address")}</dt>
            <dd>{user?.user_metadata.address}</dd>
          </div>
          <div>
          <dt className="text-gray-600">{tPurchaseForm("phone")}</dt>
            <dd>{user?.user_metadata.phone}</dd>
          </div>
        </dl>
      </div>

      <Link
        href="/profile/edit"
        className="bg-black text-white py-2 text-center rounded-[8px] self-start w-32"
        aria-label={t("edit")}
      >
        {t("edit")}
      </Link>
    </section>
  );
};