'use client';

import { useEffect, useRef, useState } from 'react';
import { Search } from 'lucide-react';
import { SearchInput } from '@/components/search/search-input';
import { usePathname } from 'next/navigation';
import { FocusTrap } from 'focus-trap-react';
import { useTranslations } from 'next-intl';

export const SearchWrapper = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const buttonRef = useRef(null); // para devolver el foco
  const hiddenOnRoutes = ['/auth', '/checkouts', '/profile', '/orders'];
  const shouldHide = hiddenOnRoutes.some(route => pathname.startsWith(route));
  const tAriaLabel = useTranslations('AriaLabel');
  
  // Devuelve foco al botón al cerrar
  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      buttonRef.current?.focus();
    }, 0);
  };
  if (shouldHide) return null;
  
  return (
    <>
      <button
        ref={buttonRef}
        aria-label={tAriaLabel("openSearch")}
        onClick={() => setIsOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-controls="search-panel"
      >
        <Search strokeWidth={1.5} />
      </button>

      {isOpen && (
        <FocusTrap
          focusTrapOptions={{
            onDeactivate: handleClose,
            clickOutsideDeactivates: true,
          }}
        >
          <div
            id="search-panel"
            role="dialog"
            aria-modal="true"
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                handleClose();
              }
            }}
            aria-label={tAriaLabel("searchModal")}
            className="fixed inset-0 z-50 flex flex-col"
          >
            {/* Overlay */}
            <div
              className="absolute inset-0 bg-black bg-opacity-40"
              onClick={handleClose}
              aria-hidden="true"
            />

            {/* Modal panel */}
            <div
              className="relative bg-white w-full min-h-32 px-4 pt-8 pb-4 transform transition-all duration-500 ease-in-out translate-y-0 opacity-100"
            >
              <SearchInput onClose={handleClose} />
            </div>
          </div>
        </FocusTrap>
      )}
    </>
  );
};