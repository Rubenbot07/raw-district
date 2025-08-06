'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { SearchPageInput } from '@/components/search/search-page-input';
import { ProductCard } from '@/components/products/product-card';
import { ProductsLayout } from '@/components/products/products-layout';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';
  const limit = searchParams.get('limit') || 10;

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query.trim()) return;

      setLoading(true);
      try {
        const res = await fetch(`/api/search-products?query=${query}&limit=${limit}`);
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
  }, [query, limit]);

  return (
    <main
      className="flex flex-col gap-4 py-8"
      aria-labelledby="search-title"
    >
      <header>
        <h1 id="search-title" className="text-xl font-bold px-4">
          Search Results
        </h1>
      </header>

      <SearchPageInput query={query} />

      <section
        aria-live="polite"
        className="w-full border border-gray-300 text-xs text-center p-4"
      >
        {query.trim() ? (
          <p>
            {results.length} result{results.length !== 1 ? 's' : ''} found for "<strong>{query}</strong>"
          </p>
        ) : (
          <p className="text-gray-500">Enter a search term to begin.</p>
        )}
      </section>

      {loading ? (
        <div className="w-full text-center p-8" role="status" aria-live="polite">
          <p className="text-gray-500">Loading...</p>
        </div>
      ) : results.length > 0 ? (
        <ProductsLayout>
          {results.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ProductsLayout>
      ) : query.trim() ? (
        <div className="w-full text-center p-8" role="alert">
          <p>No results found for "<strong>{query}</strong>"</p>
        </div>
      ) : null}
    </main>
  );
}