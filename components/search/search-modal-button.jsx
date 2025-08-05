'use client';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';

export const SearchModalButton = ({ onClose, query }) => {
  const router = useRouter();

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
          aria-label={`Search for ${query}`}
        >
          <span>Search "{query}"</span>
          <ArrowRight size={10} aria-hidden="true" />
        </button>
      )}
    </>
  );
};