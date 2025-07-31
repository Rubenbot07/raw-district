'use client'
import { useRouter, useSearchParams } from 'next/navigation';

export const ProductsPagination =  ({ currentPage }) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const totalPages = 4

    const goToPage = (page) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', page);
        router.push(`?${params.toString()}`);
    }

    return (
    <div className="flex justify-center gap-2 mt-6">
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 border-[1px] border-black disabled:opacity-50 disabled:border-gray-300"
      >
        Previous
      </button>
      <span className="px-4 py-1">Page {currentPage}</span>
      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 border-[1px] border-black disabled:opacity-50 disabled:border-gray-300"
      >
        Next
      </button>
    </div>
    )

}