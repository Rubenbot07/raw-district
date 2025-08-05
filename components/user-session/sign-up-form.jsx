"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { signUp } from "@/actions/sign-up";
import { createCart } from "@/actions/create-cart";
import { useUserStore } from "@/app/stores/userStore";

export function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, startTransition] = useTransition();

  const router = useRouter();
  const fetchUser = useUserStore.getState().fetchUser;

  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (password !== repeatPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    startTransition(async () => {
      try {
        await signUp({ email, password });
        await createCart();
        await fetchUser();
        setTimeout(() => {
          router.push("/auth/complete-profile-information");
        }, 300);
      } catch (error) {
        setError(error instanceof Error ? error.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    });
  };

  return (
    <section
      aria-labelledby="signup-title"
      className="max-w-md mx-auto border border-gray-200 rounded-lg p-6"
    >
      <h1 id="signup-title" className="text-2xl font-semibold mb-2">
        Sign up
      </h1>
      <p className="text-sm text-gray-600 mb-6">Create a new account</p>

      <form onSubmit={handleSignUp} noValidate>
        <div className="flex flex-col gap-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              autoComplete="email"
              aria-required="true"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              autoComplete="new-password"
              aria-required="true"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label htmlFor="repeat-password" className="block text-sm font-medium">
              Repeat Password
            </label>
            <input
              id="repeat-password"
              type="password"
              required
              autoComplete="new-password"
              aria-required="true"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
          </div>

          {error && (
            <p className="text-sm text-red-600" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading || isPending}
            className="w-full py-2 px-4 bg-black text-white rounded-md hover:bg-gray-900 disabled:opacity-50"
            aria-busy={isLoading || isPending}
            aria-disabled={isLoading || isPending}
          >
            {isLoading || isPending ? "Creating an account..." : "Sign up"}
          </button>
        </div>

        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/auth/login" className="underline hover:text-blue-600">
            Login
          </Link>
        </p>
      </form>
    </section>
  );
}