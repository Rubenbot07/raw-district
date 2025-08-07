'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export const ScrollTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

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
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 p-2 bg-black text-white shadow-lg hover:bg-gray-800 transition"
      aria-label="Scroll to top"
    >
      <ArrowUp size={24} />
    </button>
  );
}