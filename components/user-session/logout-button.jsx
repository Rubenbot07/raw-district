'use client';
import { useState } from "react";
import { logoutAction } from "@/actions/logout";

export function LogoutButton() {
  const [loading, setLoading] = useState(false);

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
      aria-label="Log out of your account"
      disabled={loading}
      className="text-left"
    >
      {loading ? 'Logging out...' : 'Logout'}
    </button>
  );
}