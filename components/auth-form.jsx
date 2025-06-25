'use client'
import { signInWithGoogle } from "@/utils/actions"

export const AuthForm = () => {
    const handleGoogleSignIn = async () => {
        await signInWithGoogle(next)
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