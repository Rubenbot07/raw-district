'use client';
import Form from 'next/form';
import { completeUserProfile } from "@/actions/complete-user-profile";
import { useTranslations } from "next-intl";

export const CompleteProfileForm = () => {
  const t = useTranslations("Profile");
  const tCommon = useTranslations("Common");
  const tPurchaseForm = useTranslations("PurchaseForm");
  
  return (
    <section
      className="flex flex-col gap-6 max-w-md mx-auto"
      aria-labelledby="complete-profile-title"
    >
      <div className="border border-gray-200 shadow-md rounded-[8px]">
        <div className="p-4 border-b border-gray-200">
          <h2 id="complete-profile-title" className="text-2xl font-semibold">
            {t("completeProfile")}
          </h2>
        </div>

        <Form
          action={completeUserProfile}
          className="flex flex-col gap-6 p-4"
          aria-describedby="profile-fields"
        >
          <fieldset className="flex flex-col gap-6" aria-labelledby="profile-fields">
            <legend className="sr-only">{t("profileFields")}</legend>

            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                {tCommon("fullName")}
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                className="mt-1 block w-full border border-gray-300 rounded-[8px] p-2 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                {tPurchaseForm("address")}
              </label>
              <input
                id="address"
                name="address"
                type="text"
                required
                className="mt-1 block w-full border border-gray-300 rounded-[8px] p-2 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                {tPurchaseForm("phone")}
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                className="mt-1 block w-full border border-gray-300 rounded-[8px] p-2 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          </fieldset>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-[8px] font-medium hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-black"
          >
            {t("completeProfile")}
          </button>
        </Form>
      </div>
    </section>
  );
};