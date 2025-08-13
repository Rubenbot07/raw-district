'use client';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

export const SearchModalButton = ({ onClose, query }) => {
  const router = useRouter();
  const t = useTranslations('Search');
  const tAriaLabel = useTranslations("AriaLabel");

  const handleSearch = () => {
    onClose();
    if (query.trim()) {
      router.push(`/search?query=${encodeURIComponent(query)}`);
    }
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