'use client'
import { GiftsNavDesktop } from "@/components/nav/gifts-nav-desktop"
import { SearchWrapper } from "@/components/search/search-wrapper"
import { BurguerMenu } from "@/components/nav/burguer-menu"
import { usePathname } from "next/navigation"

export const NavOptions = () => {
    const pathname = usePathname();
    const hiddenOnRoutes = ['/auth', '/checkouts', '/profile', '/orders']
     const shouldHide = hiddenOnRoutes.some(route => pathname.startsWith(route))

    if(shouldHide) return null

    return (
        <div className="flex items-center gap-2 col-start-1">
            <ul className="hidden md:flex gap-4 cursor-pointer">
              <li className="relative">
                    <GiftsNavDesktop />
                    <span className="absolute left-0 bottom-0 h-[1px] w-full bg-black origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
              </li>
              <li className="relative group">
                    <span>About</span>
                    <span className="absolute left-0 bottom-0 h-[1px] w-full bg-black origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
              </li>
              <li className="relative group">
                    <span>Brand</span>
                    <span className="absolute left-0 bottom-0 h-[1px] w-full bg-black origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
              </li>
            </ul>
            <div className="md:hidden">
              <BurguerMenu />
            </div>
            <div className="flex  items-center md:hidden">
              <SearchWrapper />
            </div>
        </div>
    )
}