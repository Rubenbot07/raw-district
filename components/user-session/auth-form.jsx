'use client';
import { signInWithGoogle } from "@/actions/sign-in-google";
import { GoogleIcon } from "@/components/icons/google-icon";

export const AuthForm = () => {
  const handleGoogleSignIn = async (e) => {
    e.preventDefault(); // Evita que el form recargue la página
    await signInWithGoogle();
  };

  return (
    <section aria-labelledby="auth-title" className="p-4">
      <h2 id="auth-title" className="sr-only">Authentication form</h2>

      <form onSubmit={handleGoogleSignIn}>
        <button
          type="submit"
          className="flex justify-center mx-auto p-2 border border-gray-300 rounded-[8px] w-full gap-2 items-center"
          aria-label="Sign in with Google"
        >
          <span>Sign in with Google</span>
          <GoogleIcon width={20} height={20} aria-hidden="true" />
        </button>
      </form>
    </section>
  );
};