'use client'
import Link from "next/link"
import { LockIcon } from "@/components/icons/lock-icon"
import { useUserContext } from "@/app/context/UserContext"
export const CheckoutButton = () => {
    const { user } = useUserContext();
    return (
        <Link href={user ? "/checkouts" : "/auth/login"}>
            <button className="w-full bg-black text-white p-2 flex justify-center gap-3 items-center text-md font-light">
                <span>
                    <LockIcon />
                </span>
                <span>
                    CHECKOUT
                </span>
            </button>
        </Link>
    )
}