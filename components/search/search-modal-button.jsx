'use client';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';

export const SearchModalButton = ({ onClose, query }) => {
  const router = useRouter();
  const t = useTranslations('Search');
  const tAriaLabel = useTranslations("AriaLabel");
  const locale = useLocale(); 

 const handleSearch = () => {
    onClose();
    const q = query.trim();
    if (!q) return;

    // Construye los query params de forma segura (encoding incluido)
    const params = new URLSearchParams({ query: q, locale });

    router.push(`/search?${params.toString()}`);
  };

  return (
    <>
      {query.length > 0 && (
        <button
          type="button"
          onClick={handleSearch}
          className="flex items-center gap-2 px-4 py-2 border-[1px] border-black"
          aria-label={`${tAriaLabel("searchFor")} ${query}`}
        >
          <span>{t("search")} "{query}"</span>
          <ArrowRight size={10} aria-hidden="true" />
        </button>
      )}
    </>
  );
};