'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const ProductsPagination = ({ currentPage, totalPages }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const goToPage = (page) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page);
    router.push(`?${params.toString()}`);
  };

  return (
    <nav
      className="flex justify-center gap-2 p-8"
      aria-label="Pagination"
    >
      {/* Previous Button */}
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Go to previous page"
        className="flex items-center justify-center w-8 h-8 border border-black disabled:opacity-30 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-black"
      >
        <ChevronLeft size={14} />
      </button>

      {/* Page Numbers */}
      {Array.from({ length: totalPages }, (_, index) => {
        const page = index + 1;
        const isActive = currentPage === page;

        return (
          <button
            key={page}
            onClick={() => goToPage(page)}
            aria-label={`Go to page ${page}`}
            aria-current={isActive ? 'page' : undefined}
            className={`w-8 h-8 text-sm border border-black transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-black ${
              isActive ? 'bg-black text-white' : 'hover:bg-gray-100'
            }`}
          >
            {page}
          </button>
        );
      })}

      {/* Next Button */}
      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Go to next page"
        className="flex items-center justify-center w-8 h-8 border border-black  disabled:opacity-30 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-black"
      >
        <ChevronRight size={14} />
      </button>
    </nav>
  );
};