'use client'
import { Search } from "lucide-react"
import { useState } from "react"
import { SearchInput } from '@/components/search/search-input'
import { usePathname } from "next/navigation"
export const SearchWrapper = () => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const hiddenOnRoutes = ['/auth', '/checkouts', '/profile', '/orders']
     const shouldHide = hiddenOnRoutes.some(route => pathname.startsWith(route))

    if(shouldHide) return null
    return (
        <>
            <Search strokeWidth={1.5} onClick={() => setIsOpen(!isOpen)}/> 
            {isOpen && (
            <div
                className="fixed inset-0 bg-black bg-opacity-40 z-40"
                onClick={() => setIsOpen(false)}
                aria-label="Close cart overlay"
            />
            )}
            <div className={`fixed right-0 top-0 z-40 bg-white w-full min-h-32 px-4 pt-8 pb-4 transform  transition-all duration-500 ease-in-out ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
                <SearchInput onClose={() => setIsOpen(false)} />
            </div>
        </>
    )
}