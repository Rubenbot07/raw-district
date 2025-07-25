import Link from "next/link"
import { AuthButton } from "@/components/user-session/auth-button"
import { CartWrapper } from "@/components/cart/cart-wrapper"
import { getUser } from "@/actions/get-user"
import { SearchWrapper } from "@/components/search/search-wrapper"
import Image from "next/image"
import { NavOptions } from "@/components/nav/nav-options"

export const Nav = async () => {
    const { user } = await getUser();
    const userId = user ? user.id : null;
    return (
      <nav className="w-full h-16 flex items-center md:px-8 bg-white sticky top-0 z-50">
        <div className="w-full grid grid-cols-4 items-center p-3 text-sm relative">
          {/* 🧭 Left: Search (mobile only) */}
          <NavOptions />

          {/* 🏷 Center: Logo */}
          <div className="flex items-center justify-center col-start-2 col-span-2">
            <Link href="/">
              <Image src="/LogoRD.webp" alt="" width={200} height={26} className="cursor-pointer"/>
            </Link>
          </div>

          {/* 🛍 Right: Auth, Cart, Search (desktop only) */}
          <div className="flex items-center gap-1 md:gap-2 col-start-4 justify-end">
            <AuthButton user={user} />
            <div className="hidden md:block">
              <SearchWrapper />
            </div>
            <CartWrapper userId={userId} />
          </div>
          
        </div>
      </nav>
    )
}