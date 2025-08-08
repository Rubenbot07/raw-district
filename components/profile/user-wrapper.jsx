'use client';
import { CircleUserRound, ChevronDown } from "lucide-react";
import Link from "next/link";
import { LogoutButton } from "@/components/user-session/logout-button";
import { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";

export const UserWrapper = ({ user, children }) => {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef(null);
  const menuRef = useRef(null);
  const t = useTranslations("Profile");

  const toggleMenu = () => setOpen((prev) => !prev);
  const closeMenu = () => setOpen(false);

  // Cerrar menú con Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closeMenu();
        buttonRef.current?.focus();
      }
    };
    if (open) {
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("keydown", handleKeyDown);
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={toggleMenu}
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls="user-menu"
        className="flex items-center gap-1 "
      >
        <CircleUserRound strokeWidth={1.5} />
        <span className={`transition-transform ${open ? "rotate-180" : ""}`}>
          <ChevronDown size={10} />
        </span>
        <span className="sr-only">{t("userMenu")}</span>
      </button>

      {open && (
        <div
          ref={menuRef}
          id="user-menu"
          role="menu"
          className="min-w-[200px] z-50 flex flex-col gap-2 absolute top-12 -right-4 bg-white shadow-xl border border-gray-300 rounded-[8px] p-4"
        >
          <div className="flex items-center gap-2 text-gray-500 border-b border-gray-300 py-2">
            <CircleUserRound color="gray" strokeWidth={1.5} />
            <p>{user ? user.email :  t("guest") }</p>
          </div>

          <div className="flex flex-col gap-4 items-start text-sm">
            {user ? (
              <>
                <Link href="/profile" role="menuitem">{t("title")}</Link>
                <Link href="/orders" role="menuitem">{t("orders") }</Link>
                <LogoutButton />
              </>
            ) : (
              children
            )}
          </div>
        </div>
      )}
    </div>
  );
};