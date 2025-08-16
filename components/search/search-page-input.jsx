'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { useTranslations } from 'next-intl';

export const SearchPageInput = ({ query }) => {
  const [input, setInput] = useState(query);
  const router = useRouter();
  const t = useTranslations('Search');
  const tAriaLabel = useTranslations("AriaLabel");

  const handleSearch = () => {
    if (input === query) return;
    if (input.trim().length > 0) {
      router.push(`/search?query=${encodeURIComponent(input)}&limit=8`);
    }
  };

  return (
    <div
      className="flex justify-between max-w-xl w-full mx-auto p-4"
      role="search"
      aria-label={tAriaLabel("searchPageInput")}
    >
      <div className="w-full flex justify-between py-2 px-4 border-[1px] border-r-0 border-gray-300 text-xs">
        <label htmlFor="search-input" className="sr-only">{t("searchProducts")}</label>
        <input
          id="search-input"
          type="text"
          className="outline-none w-3/4"
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder={t("searchProducts")}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          aria-label={tAriaLabel("searchProducts")}
        />
        {input.length > 0 && (
          <button
            type="button"
            onClick={() => setInput('')}
            className="text-[10px]"
            aria-label={tAriaLabel("clearSearchInput")}
          >
            {t("clear")}
          </button>
        )}
      </div>
      <button
        type="button"
        className="bg-black py-2 px-4"
        onClick={handleSearch}
        aria-label={t("search")}
      >
        <Search color="white" aria-hidden="true" />
      </button>
    </div>
  );
};