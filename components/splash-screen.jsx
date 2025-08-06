'use client';

import { useEffect, useState } from 'react';

export default function SplashScreen({ children }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular carga (puedes reemplazar esto por lógica real)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 segundos de splash

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        <img
          src="/LogoRD.webp"
          alt="Logo"
          className="w-auto h-auto animate-pulse"
        />
      </div>
    );
  }

  return <>{children}</>;
}