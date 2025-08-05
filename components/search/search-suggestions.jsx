import { SearchProductCard } from '@/components/search/search-product-card';

export const SearchSuggestions = ({ suggestions, onClose }) => {
  return (
    <section
      className="md:w-full py-3 flex flex-col gap-4"
      aria-labelledby="search-suggestions-heading"
    >
      <h2
        id="search-suggestions-heading"
        className="py-1 border-b-[1px] border-gray-300 text-sm font-medium"
      >
        Products
      </h2>

      <ul className="flex gap-2" role="list">
        {suggestions.map((suggestion) => (
          <li key={suggestion.id} role="listitem">
            {/* Delegamos el onClick al componente interno */}
            <SearchProductCard product={suggestion} onClick={onClose} />
          </li>
        ))}
      </ul>
    </section>
  );
};