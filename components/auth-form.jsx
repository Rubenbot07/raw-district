'use client'
import { signInWithGoogle } from "@/utils/actions"

export const AuthForm = ({ buttonText = 'Sign in with Google', next = '/' }) => {
    const handleGoogleSignIn = async () => {
        await signInWithGoogle(next)
    }
    return (
        <div>
            <form>
                <button formAction={handleGoogleSignIn} type="submit" className="btn btn-primary">
                    {buttonText}
                </button>
            </form>
        </div>
    )
}