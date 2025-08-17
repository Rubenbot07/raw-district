'use client';

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { GiftsNavMobile } from "./gifts-nav-mobile";
import { AlignJustify, X } from "lucide-react";
import { FocusTrap } from "focus-trap-react";
import { useTranslations } from 'next-intl';

export const BurguerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef(null);

  const t = useTranslations('Nav');
  const tAriaLabel = useTranslations('AriaLabel');

  // Restaurar foco al botón hamburguesa cuando se cierra el menú
  useEffect(() => {
    if (!isOpen && triggerRef.current) {
      (triggerRef.current).focus();
    }
  }, [isOpen]);

  return (
    <div className="relative z-50">
      {/* Botón hamburguesa */}
      <button
        ref={triggerRef}
        aria-label={tAriaLabel("openMenu")}
        onClick={() => setIsOpen(true)}
        className="py-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-black"
      >
        <AlignJustify className="w-[22px] h-[22px] md:w-6 md:h-6" aria-hidden="true" />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={() => setIsOpen(false)}
          role="button"
          tabIndex={0}
          aria-label={tAriaLabel("closeMenu")}
          onKeyDown={(e) => e.key === "Enter" && setIsOpen(false)}
        />
      )}

      {/* Menú con focus trap */}
      {isOpen && (
        <FocusTrap
          focusTrapOptions={{
            clickOutsideDeactivates: true,
            escapeDeactivates: true,
            fallbackFocus: () => document.getElementById("mobile-menu") || document.body,
            onDeactivate: () => setIsOpen(false),
          }}
        >
          <div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-menu-title"
            className="fixed top-0 left-0 z-50 w-full min-h-72 bg-white shadow-lg p-8 rounded-md transition-transform duration-500 ease-in-out translate-y-0 opacity-100"
          >
            <div className="flex justify-between items-center">
              <h2 id="mobile-menu-title" className="text-base font-semibold">{t("burguerMenu")}</h2>
              <button
                aria-label={tAriaLabel("closeMenu")}
                onClick={() => setIsOpen(false)}
                className="p-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-black"
              >
                <X size={20} aria-hidden="true" />
              </button>
            </div>

            <ul className="flex flex-col gap-4 mt-6">
              <li>
                <GiftsNavMobile onOpen={() => setIsOpen(false)} />
              </li>
              <li>
                <Link
                  href="/about"
                  onClick={() => setIsOpen(false)}
                  className="hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-black"
                >
                  {t("about")}
                </Link>
              </li>
              <li>
                <Link
                  href="/brand"
                  onClick={() => setIsOpen(false)}
                  className="hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-black"
                >
                  {t("brand")}
                </Link>
              </li>
            </ul>
          </div>
        </FocusTrap>
      )}
    </div>
  );
};