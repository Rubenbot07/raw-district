'use client';

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useTranslations } from 'next-intl';

export const GiftsNavDesktop = () => {
  const priceFilters = [200000, 300000, 400000];
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const t = useTranslations('Nav');

  // Cierra el menú si haces clic fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        !buttonRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMenu = () => setIsOpen(prev => !prev);

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-controls="gifts-dropdown"
        onClick={toggleMenu}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className="cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-black"
      >
        {t('gifts')}
        <span className={`absolute left-0 bottom-0 h-[1px] w-full bg-black origin-left transition-transform duration-300 ${
          isOpen ? "scale-x-100" : "scale-x-0"
        }`} />
      </button>

      <div
        id="gifts-dropdown"
        ref={menuRef}
        role="menu"
        className={`absolute top-full left-0 z-50 bg-white shadow-md py-6 px-4 w-max text-xs transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <ul className="flex flex-col gap-3">
          <li className="relative group w-fit" role="menuitem">
            <Link href="/gifts?type=gift-cards">
              {t('giftCard')}
            </Link>
            <span className="absolute left-0 bottom-0 h-[1px] w-full bg-black origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
          </li>

          {priceFilters.map(price => (
            <li key={price} className="relative group w-fit" role="menuitem">
              <Link href={`/gifts?price_lt=${price}`}>
                {t('lessThan')} ${price.toLocaleString()}
              </Link>
              <span className="absolute left-0 bottom-0 h-[1px] w-full bg-black origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
