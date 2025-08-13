'use client';
import { useState } from "react";
import { logoutAction } from "@/actions/logout";
import { useTranslations } from "next-intl";

export function LogoutButton() {
  const [loading, setLoading] = useState(false);
  const t = useTranslations("Profile");
  const tAriaLabel = useTranslations("AriaLabel");
  const handleLogout = async () => {
    setLoading(true);
    try {
      await logoutAction();
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed", error);
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      type="button"
      aria-label={tAriaLabel("logoutOfYourAccount")}
      disabled={loading}
      className="text-left"
    >
      {loading ? t('loginOut') : t('logout')}
    </button>
  );
}