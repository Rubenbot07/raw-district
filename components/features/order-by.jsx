'use client';

import { useState, useEffect, useRef } from 'react';
import { useSearchParams, usePathname } from 'next/navigation';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

export const OrderBy = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Order by');

  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);

  const options = [
    { label: 'Price, lower to higher', value: 'price_asc' },
    { label: 'Price, higher to lower', value: 'price_desc' },
    { label: 'Alphabetically, A,Z', value: 'name_asc' },
    { label: 'Alphabetically, Z,A', value: 'name_desc' },
  ];

  useEffect(() => {
    const sort = searchParams.get('sort');
    const option = options.find((o) => o.value === sort);
    if (option) {
      setSelectedOption(option.label);
    } else {
      setSelectedOption('Order by');
    }
  }, [searchParams]);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  // Cerrar si clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !buttonRef.current?.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const buildUrl = (sort) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', sort);
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="flex items-center relative w-full justify-end">
      <button
        ref={buttonRef}
        onClick={toggleDropdown}
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls="orderby-options"
        className="flex items-center gap-2 px-8 py-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
      >
        <span>{selectedOption}</span>
        <ChevronDown
          size={16}
          className={`${isOpen ? 'rotate-180' : ''} transition-transform duration-300 ease-in-out`}
        />
      </button>

      {isOpen && (
        <ul
          ref={dropdownRef}
          id="orderby-options"
          role="listbox"
          tabIndex={-1}
          onKeyDown={handleKeyDown}
          className="absolute top-12 right-0 bg-white shadow-lg rounded-md p-4 w-48 z-10 text-xs flex flex-col gap-2"
        >
          {options.map((opt) => (
            <li key={opt.value} role="option" aria-selected={selectedOption === opt.label}>
              <Link
                href={buildUrl(opt.value)}
                scroll={false}
                onClick={() => {
                  setSelectedOption(opt.label);
                  setIsOpen(false);
                }}
                className="block w-full cursor-pointer hover:underline focus:outline-none focus-visible:ring-1 focus-visible:ring-black"
              >
                {opt.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};