import Link from "next/link"
import { AuthButton } from "@/components/user-session/auth-button"
import { CartWrapper } from "@/components/cart/cart-wrapper"
import { getUser } from "@/actions/get-user"

export const Nav = async () => {
    const { user } = await getUser();
    const userId = user ? user.id : null;
    return (
        <nav className="w-full flex justify-center h-16">
          <div className="w-full max-w-5xl flex justify-between items-center p-3 text-sm">
            <div>menu</div>
            <div className="flex text-xl items-center font-semibold">
              <Link href={"/"}>Raw District</Link>
            </div>
            <div className="flex items-center ">
              <AuthButton user={user}/>
              <CartWrapper userId={userId}/>
            </div>
          </div>
        </nav>
    )
}