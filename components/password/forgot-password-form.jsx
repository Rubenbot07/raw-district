'use client';

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const supabase = createClient();

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/update-password`,
      });
      if (error) throw error;
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto p-6 bg-white border border-gray-200 rounded-md shadow-md">
      {success ? (
        <div role="alert" aria-live="polite" className="space-y-4 text-center">
          <h2 className="text-2xl font-semibold">Check Your Email</h2>
          <p className="text-sm text-gray-600">
            If your account exists, we’ve sent password reset instructions to your email.
          </p>
        </div>
      ) : (
        <form
          onSubmit={handleForgotPassword}
          className="space-y-6"
          aria-labelledby="reset-title"
        >
          <div>
            <h2 id="reset-title" className="text-2xl font-semibold text-center mb-1">
              Reset Your Password
            </h2>
            <p className="text-sm text-gray-600 text-center">
              Enter your email and we’ll send you a link to reset your password.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {error && (
            <p className="text-sm text-red-500" role="alert">
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
            {isLoading ? "Sending..." : "Send Reset Email"}
          </button>

          <p className="text-sm text-center text-gray-600 mt-4">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-black underline hover:text-gray-800">
              Login
            </Link>
          </p>
        </form>
      )}
    </div>
  );
}