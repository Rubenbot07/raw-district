import Link from "next/link"
import { AuthButton } from "@/components/user-session/auth-button"
import { CartWrapper } from "@/components/cart/cart-wrapper"
import { getUser } from "@/actions/get-user"

export const Nav = async () => {
    const { user, error } = await getUser();
    const userId = user ? user.id : null;

    return (
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
            <div className="flex gap-5 items-center font-semibold">
              <Link href={"/"}>Raw District</Link>
              <div className="flex items-center gap-2">
              </div>
            </div>
            <AuthButton user={user}/>
            <CartWrapper userId={userId}/>
          </div>
        </nav>
    )
}