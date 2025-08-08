'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useTranslations } from "next-intl";

export function UpdatePasswordForm() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const tPassword = useTranslations("Password");

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const supabase = createClient();

    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      router.push("/auth/login");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto p-6 bg-white border border-gray-200 rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-2 text-center">{tPassword("resetPassword")}</h2>
      <p className="text-sm text-gray-600 text-center mb-6">
        {tPassword("enterPasswordBelow")}
      </p>

      <form onSubmit={handleUpdatePassword} className="space-y-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-sm font-medium text-gray-700">
            {tPassword("newPassword")}
          </label>
          <input
            id="password"
            type="password"
            required
            placeholder={tPassword("newPassword")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {error && (
          <p className="text-sm text-red-500" role="alert" aria-live="polite">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 px-4 rounded-md text-white font-medium transition ${
            isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-black hover:bg-gray-900"
          }`}
        >
          {isLoading ? tPassword("saving") : tPassword("save")}
        </button>
      </form>
    </div>
  );
}