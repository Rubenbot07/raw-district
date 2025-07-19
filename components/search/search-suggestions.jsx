import { SearchProductCard } from '@/components/search/search-product-card';
export const SearchSuggestions = ({suggestions, onClose}) => {
    return (
        <section className='md:w-full py-3 flex flex-col gap-4'>
            <p className='py-1 border-b-[1px] border-gray-300'>Products</p>
            <ul className='flex gap-2'>
                {
                    suggestions.map(suggestion => (
                        <li key={suggestion.id} onClick={onClose}>
                            <SearchProductCard product={suggestion} />
                        </li>
                    ))
                }
            </ul>
        </section>
    )
}