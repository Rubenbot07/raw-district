'use client'
import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const ProductsPagination =  ({ currentPage, totalPages }) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const goToPage = (page) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', page);
        router.push(`?${params.toString()}`);
    }

    return (
    <div className="flex justify-center gap-4 p-8">
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center justify-center w-6 h-6 border-[1px] border-black disabled:hidden"
      >
        <ChevronLeft size={14}/>
      </button>
      {
        Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => goToPage(index + 1)}
            className={`h-6 w-6 text-center text-xs border-[1px] border-black ${
              currentPage === index + 1 ? 'bg-black text-white' : ''
            }`}
          >
            {index + 1}
          </button>
        ))
      }
      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center justify-center w-6 h-6 border-[1px] border-black disabled:hidden"
      >
        < ChevronRight size={14}/>
      </button>
    </div>
    )

}