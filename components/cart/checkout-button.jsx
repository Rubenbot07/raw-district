'use client'
import Link from "next/link"
import { LockIcon } from "@/components/icons/lock-icon"
import { useCartUIStore } from "@/app/stores/cartUIStore"
import { useUserStore } from "@/app/stores/userStore"
export const CheckoutButton = () => {
    const user = useUserStore((state) => state.user);
    const setOpenCart = useCartUIStore((state) => state.setOpenCart);
    return (
        <Link href={user ? "/checkouts" : "/auth/login"}>
            <button onClick={() => setOpenCart(false)} className="w-full bg-black text-white p-2 flex justify-center gap-3 items-center text-md font-light">
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