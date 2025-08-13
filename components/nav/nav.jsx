import Link from "next/link";
import { AuthButton } from "@/components/user-session/auth-button";
import { CartWrapper } from "@/components/cart/cart-wrapper";
import { getUser } from "@/actions/get-user";
import { SearchWrapper } from "@/components/search/search-wrapper";
import Image from "next/image";
import { NavOptions } from "@/components/nav/nav-options";
import { getTranslations } from "next-intl/server";

export const Nav = async () => {
  const { user } = await getUser();
  const userId = user ? user.id : null;
  const t = await getTranslations("AriaLabel");

  return (
    <header className="w-full sticky top-0 z-50 bg-white">
      <nav
        className="w-full h-16 flex items-center md:px-8"
        role="navigation"
        aria-label={t("mainNav")}
      >
        <div className="w-full grid grid-cols-4 items-center p-3 text-sm relative">
          
          {/* 🧭 Left: NavOptions (e.g., menu or filters) */}
          <NavOptions />

          {/* 🏷 Center: Logo */}
          <div className="flex items-center justify-center col-start-2 col-span-2">
            <Link href="/" aria-label={t("goHome")}>
              <Image
                src="/LogoRD.webp"
                alt="RAWDISTRIC logo"
                width={200}
                height={26}
                className="cursor-pointer"
                priority
              />
            </Link>
          </div>

          {/* 🛍 Right: Auth, Search, Cart */}
          <section
            className="flex items-center gap-1 md:gap-2 col-start-4 justify-end"
            aria-label={t("userActions")}
          >
            <AuthButton user={user} />

            <div className="hidden md:block">
              <SearchWrapper />
            </div>

            <CartWrapper userId={userId} />
          </section>
        </div>
      </nav>
    </header>
  );
};