'use client';
import { GiftsNavDesktop } from "@/components/nav/gifts-nav-desktop";
import { SearchWrapper } from "@/components/search/search-wrapper";
import { BurguerMenu } from "@/components/nav/burguer-menu";
import { usePathname } from "next/navigation";
import Link from "next/link";

export const NavOptions = () => {
  const pathname = usePathname();
  const hiddenOnRoutes = ['/auth', '/checkouts', '/profile', '/orders'];
  const shouldHide = hiddenOnRoutes.some(route => pathname.startsWith(route));

  if (shouldHide) return null;

  return (
    <div className="flex items-center gap-2 col-start-1">
      {/* Desktop Navigation */}
      <nav aria-label="Main navigation" className="hidden md:flex">
        <ul className="flex gap-4">
          <li>
            <GiftsNavDesktop />
          </li>

          <li className="relative group">
            <Link
              href="/about"
              className="hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-black"
            >
              About
            </Link>
          </li>

          <li className="relative group">
            <Link
              href="/brand"
              className="hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-black"
            >
              Brand
            </Link>
          </li>
        </ul>
      </nav>

      {/* Mobile Menu */}
      <div className="md:hidden">
        <BurguerMenu />
      </div>

      {/* Mobile Search */}
      <div className="md:hidden flex items-center">
        <SearchWrapper />
      </div>
    </div>
  );
};