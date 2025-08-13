'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { useTranslations } from 'next-intl';

export const ScrollTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const t = useTranslations('AriaLabel');

  useEffect(() => {
    function toggleVisibility() {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    }

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    // Esperar a que el scroll termine antes de enfocar
    setTimeout(() => {
      const mainElement = document.querySelector('nav');
      if (mainElement instanceof HTMLElement) {
        mainElement.setAttribute('tabindex', '-1'); // Asegura que pueda recibir foco
        mainElement.focus();
      }
    }, 500); // 0.5s para dar tiempo al scroll
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 p-2 bg-black text-white shadow-lg hover:bg-gray-800 transition"
      aria-label={t("scrollToTop")}
    >
      <ArrowUp size={24} />
    </button>
  );
}