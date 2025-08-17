'use client';

import { useRef, useState } from 'react';
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
        <Search className='w-[22px] h-[22px] md:w-6 md:h-6' strokeWidth={1.5} />
      </button>
      <FocusTrap
          active={isOpen}
          focusTrapOptions={{
            onDeactivate: handleClose,
            clickOutsideDeactivates: true,
          }}
        >
          <div
            id="search-panel"
            role="dialog"
            aria-modal="true"
            inert={!isOpen}
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
              className={`fixed inset-0 bg-black bg-opacity-40 z-40 transition-opacity duration-300 ${
                isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
              }`}
              onClick={handleClose}
              aria-hidden="true"
            />

            {/* Modal panel */}
            <div
              className={`flex-1 min-h-0 max-h-fit overflow-y-auto no-scrollbar z-50 relative bg-white w-full px-4 pt-8 pb-4 transform transition-all duration-500 ease-in-out ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-full'}`}
            >
              <SearchInput onClose={handleClose} />
            </div>
          </div>
        </FocusTrap>
    </>
  );
};