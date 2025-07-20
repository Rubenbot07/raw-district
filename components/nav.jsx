import Link from "next/link"
import { AuthButton } from "@/components/user-session/auth-button"
import { CartWrapper } from "@/components/cart/cart-wrapper"
import { getUser } from "@/actions/get-user"
import { SearchWrapper } from "@/components/search/search-wrapper"
import Image from "next/image"

export const Nav = async () => {
    const { user } = await getUser();
    const userId = user ? user.id : null;
    return (
        <nav className="w-full flex justify-between h-16 items-center md:px-8 relative" >
          <div className="w-full h-auto flex justify-between items-center p-3 text-sm">
            <div>menu</div>
            <div className="">
              <Link href={"/"}>
                <Image src='/LogoRD.webp' alt="" width={200} height={26} />
              </Link>
            </div>
            <div className="flex items-center gap-1 md:gap-2">
              <AuthButton user={user}/>
              <SearchWrapper />
              <CartWrapper userId={userId}/>
            </div>
          </div>
        </nav>
    )
}