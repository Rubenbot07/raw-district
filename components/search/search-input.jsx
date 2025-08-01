'use client'
import { useState, useEffect } from 'react';
import { SearchSuggestions, PopularSearches, SearchModalButton } from '@/components/search';
import { Search, X } from "lucide-react";


export const SearchInput = ({onClose}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleClose = () => {
    setQuery('');
    onClose();
  };

  useEffect(() => {
    const fetchResults = async (query) => {
      if (!query.trim()) {
        setResults([]);
        return;
      }

      try {
        const res = await fetch(`/api/search-products?query=${query}`);
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
    }, 300); // Debounce to avoid too many requests

    return () => clearTimeout(delayDebounce);
  }, [query]);


  return (
    <div className=" relative w-full p-4 lg:w-3/4 mx-auto">
        <div className='flex items-center gap-5'>
            <Search />
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar productos..."
                className="w-full px-3 py-1 rounded outline-none"
            />
            {query.length > 0 && (
                <button className='text-[10px]' onClick={() => setQuery('')}>CLEAR</button>
            )}
            <button onClick={handleClose}><X /></button>
        </div>
        <div className='flex flex-col w-full gap-x-4 md:flex-row'>
            <PopularSearches onClose={handleClose}/>
            {results.length > 0 && (
                <SearchSuggestions suggestions={results} onClose={onClose}/>
            )}
        </div>
        <SearchModalButton query={query} onClose={onClose} />
    </div>
  );
};