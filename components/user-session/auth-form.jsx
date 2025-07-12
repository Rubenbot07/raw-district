'use client'
import { signInWithGoogle } from "@/actions/sign-in-google"

export const AuthForm = () => {
    const handleGoogleSignIn = async () => {
        await signInWithGoogle()
    }
    return (
        <div>
            <form>
                <button formAction={handleGoogleSignIn} type="submit" className="btn btn-primary">
                    Sign in with Google
                </button>
            </form>
        </div>
    )
}