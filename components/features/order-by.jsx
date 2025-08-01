'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, usePathname } from 'next/navigation';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

export const OrderBy = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [rotated, setRotated] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Order by');

  const options = [
    { label: 'Price, lower to higher', value: 'price_asc' },
    { label: 'Price, higher to lower', value: 'price_desc' },
    { label: 'Alphabetically, A,Z', value: 'name_asc' },
    { label: 'Alphabetically, Z,A', value: 'name_desc' },
  ];

  // Actualizar la etiqueta al cargar la página o cambiar `sort`
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
    setIsOpen(!isOpen);
    setRotated(!rotated);
  };

  // Construir la URL preservando todos los query params actuales
  const buildUrl = (sort) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', sort);
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="flex items-center relative w-full justify-end ">
      <button onClick={toggleDropdown} className="flex items-center gap-2 px-8 py-4">
        <span>{selectedOption}</span>
        <ChevronDown
          size={16}
          className={`${rotated ? 'rotate-180' : ''} transition-transform duration-300 ease-in-out`}
        />
      </button>

      <ul
        className={`absolute top-12 right-0 transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-all duration-300 ease-in-out bg-white shadow-lg rounded-md p-4 w-48 z-10 text-xs flex flex-col gap-2`}
      >
        {options.map((opt) => (
          <li key={opt.value} className="cursor-pointer hover:underline">
            <Link scroll={false} href={buildUrl(opt.value)} onClick={() => setSelectedOption(opt.label)}>
              {opt.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};