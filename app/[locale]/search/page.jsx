'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { SearchPageInput } from '@/components/search/search-page-input';
import { ProductCard } from '@/components/products/product-card';
import { ProductsLayout } from '@/components/products/products-layout';
import { useTranslations, useLocale } from 'next-intl';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';
  const limitParam = searchParams.get('limit') || '10';
  const limit = parseInt(limitParam, 10) || 10;

  const t = useTranslations('Search');
  const locale = useLocale();

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query.trim()) {
        setResults([]);
        return;
      }

      setLoading(true);
      try {
        // construir params incluyendo locale
        const params = new URLSearchParams({ query, limit: String(limit), locale });
        const res = await fetch(`/api/search-products?${params.toString()}`);
        if (!res.ok) throw new Error(`Error: ${res.status}`);
        const data = await res.json();
        setResults(data.results || []);
      } catch (error) {
        console.error('Error fetching search results:', error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query, limit, locale]); // <-- asegurarse de re-fetch si cambia el locale

  return (
    <main
      className="flex flex-col gap-4 py-8"
      aria-labelledby="search-title"
    >
      <header>
        <h1 id="search-title" className="text-xl font-bold px-4">
          {t('title')}
        </h1>
      </header>

      <SearchPageInput query={query} />

      <section
        aria-live="polite"
        className="w-full border border-gray-300 text-xs text-center p-4"
      >
        {query.trim() ? (
          <p>
            {results.length} {t('result')}{results.length !== 1 ? 's' : ''} {t('foundFor')} "<strong>{query}</strong>"
          </p>
        ) : (
          <p className="text-gray-500">{t('enterSearch')}</p>
        )}
      </section>

      {loading ? (
        <div className="w-full text-center p-8" role="status" aria-live="polite">
          <p className="text-gray-500">{t('loading')}</p>
        </div>
      ) : results.length > 0 ? (
        <ProductsLayout>
          {results.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ProductsLayout>
      ) : query.trim() ? (
        <div className="w-full text-center p-8" role="alert">
          <p>{t('notFound')} "<strong>{query}</strong>"</p>
        </div>
      ) : null}
    </main>
  );
}