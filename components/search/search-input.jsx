'use client';
import { useState, useEffect, useCallback } from 'react';
import { SearchSuggestions, PopularSearches, SearchModalButton } from '@/components/search';
import { Search, X } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';

export const SearchInput = ({ onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const router = useRouter();

  const t = useTranslations('Search');
  const tAriaLabel = useTranslations("AriaLabel");
  const locale = useLocale();
  const handleClose = () => {
    setQuery('');
    onClose();
  };

  const handleSubmit = useCallback(() => {
    const q = query.trim();
    if (!q) return;
    const params = new URLSearchParams({ query: q, locale });
    handleClose();
    router.push(`/search?${params.toString()}`);
  }, [query, locale, router]);

  useEffect(() => {
    const fetchResults = async (query) => {
      if (!query.trim()) {
        setResults([]);
        return;
      }

      try {
        const res = await fetch(`/api/search-products?query=${encodeURIComponent(query)}&locale=${locale}`);
        if (!res.ok) throw new Error('Fetch error');
        const data = await res.json();
        setResults(data.results || []);
      } catch (error) {
        console.error('Error fetching search results:', error);
        setResults([]);
      }
    };

    const delayDebounce = setTimeout(() => {
      fetchResults(query);
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  return (
    <div
      className="relative w-full p-4 lg:w-3/4 mx-auto"
      role="search"
      aria-label={t('searchProducts')}
    >
      <div className="flex items-center gap-5">
        <Search aria-hidden="true" />

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleSubmit();
            }
          }}
          placeholder={t('searchProducts')}
          aria-label={t('searchProducts')}
          className="w-full px-3 py-1 rounded outline-none"
        />

        {query.length > 0 && (
          <button
            type="button"
            className="text-[10px]"
            onClick={() => setQuery('')}
            aria-label={tAriaLabel("clearSearchInput")}
          >
            {t('clear')}
          </button>
        )}
        <button
          type="button"
          onClick={handleClose}
          aria-label={tAriaLabel("closeSearch")}
          >
          <X aria-hidden="true" />
        </button>
      </div>

      <div className="flex flex-col w-full gap-x-4 md:flex-row">
        <PopularSearches onClose={handleClose} />

        {results.length > 0 && (
          <SearchSuggestions suggestions={results} onClose={onClose} />
        )}
      </div>
      <SearchModalButton query={query} onClose={onClose} />
    </div>
  );
};