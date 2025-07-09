import Link from "next/link"
import { LockIcon } from "@/components/icons/lock-icon"
export const CheckoutButton = () => {
    return (
        <Link href='/checkouts'>
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