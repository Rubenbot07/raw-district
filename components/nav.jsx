import Link from "next/link"
import { AuthButton } from "@/components/user-session/auth-button"
import { CartWrapper } from "@/components/cart/cart-wrapper"
import { getUser } from "@/actions/get-user"
import Image from "next/image"
import { SearchCheckIcon } from "lucide-react"

export const Nav = async () => {
    const { user } = await getUser();
    const userId = user ? user.id : null;
    return (
        <nav className="w-full flex justify-between h-16 items-center md:px-8">
          <div className="w-full h-auto flex justify-between items-center p-3 text-sm">
            <div>menu</div>
            <div className="flex text-xl items-center font-semibold">
              <Link href={"/"}>
                <Image src='/LogoRD.webp' alt=""  width={200} height={150}/>
              </Link>
            </div>
            <div className="flex items-center md:gap-2">
              <AuthButton user={user}/>
              <SearchCheckIcon />
              <CartWrapper userId={userId}/>
            </div>
          </div>
        </nav>
    )
}