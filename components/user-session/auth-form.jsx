'use client'
import { signInWithGoogle } from "@/actions/sign-in-google"
import { GoogleIcon } from "@/components/icons/google-icon"

export const AuthForm = () => {
    const handleGoogleSignIn = async () => {
        await signInWithGoogle()
    }
    return (
        <div>
            <form className="p-4">
                <button formAction={handleGoogleSignIn} type="submit" className="flex justify-center mx-auto p-2 border-[1px] border-gray-300 rounded-[8px] w-full gap-2 items-center">
                    <span>Sign in with Google</span>
                    <span> <GoogleIcon width={20} height={20}/></span>
                </button>
            </form>
        </div>
    )
}