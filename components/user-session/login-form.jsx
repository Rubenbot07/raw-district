'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AuthForm } from "@/components/user-session/auth-form";
import { signInWithEmail } from "@/actions/sign-in-email";
import { getUser } from "@/actions/get-user";
import { createCart } from "@/actions/create-cart";
import { useUserStore } from "@/app/stores/userStore";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fetchUser = useUserStore.getState().fetchUser;
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await signInWithEmail({ email, password });
      const user = await getUser();
      if (user) {
        await createCart(user.id);
      }
      await fetchUser();
      router.push("/");
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      aria-labelledby="login-title"
      className="max-w-md mx-auto border border-gray-200 rounded-lg p-6"
    >
      <h1 id="login-title" className="text-2xl font-semibold mb-2">
        Login
      </h1>
      <p className="text-sm text-gray-600 mb-6">
        Enter your email below to login to your account.
      </p>

      <form onSubmit={handleLogin} noValidate>
        <div className="flex flex-col gap-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              placeholder="m@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              autoComplete="email"
              aria-required="true"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Link
                href="/auth/forgot-password"
                className="text-sm underline hover:text-blue-600"
              >
                Forgot your password?
              </Link>
            </div>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              autoComplete="current-password"
              aria-required="true"
            />
          </div>

          {error && (
            <p className="text-sm text-red-600" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 px-4 bg-black text-white rounded-md hover:bg-gray-900 disabled:opacity-50"
            aria-disabled={isLoading}
            aria-busy={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </div>

        <p className="mt-4 text-center text-sm">
          Don’t have an account?{" "}
          <Link href="/auth/sign-up" className="underline hover:text-blue-600">
            Sign up
          </Link>
        </p>
      </form>

      <div className="mt-6">
        <AuthForm />
      </div>
    </section>
  );
}