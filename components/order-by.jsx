'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

export const OrderBy = ({ price = null }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [rotated, setRotated] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Order by');

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
    setRotated((prev) => !prev);
  };

  const handleSelect = (label) => {
    setSelectedOption(label);
    setIsOpen(false);
    setRotated(false);
  };

  const options = [
    { label: 'Price, lower to higher', value: 'price_asc' },
    { label: 'Price, higher to lower', value: 'price_desc' },
    { label: 'Alphabetically, A,Z', value: 'name_asc' },
    { label: 'Alphabetically, Z,A', value: 'name_desc' },
  ];

  return (
    <div className="flex items-center relative w-full justify-end">
      <button onClick={toggleDropdown} className="flex items-center gap-2 p-8">
        <span>{selectedOption}</span>
        <ChevronDown
          size={16}
          className={`${rotated ? 'rotate-180' : ''} transition-transform duration-300 ease-in-out`}
        />
      </button>

      <ul
        className={`absolute top-20 right-0 transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-all duration-300 ease-in-out bg-white shadow-lg rounded-md p-4 w-48 z-10 text-xs flex flex-col gap-2`}
      >
        {options.map((opt) => (
          <li key={opt.value} className="cursor-pointer hover:underline">
            <Link
              href={`/gifts?price_lt=${price}&sort=${opt.value}`}
              onClick={() => handleSelect(opt.label)}
            >
              {opt.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};