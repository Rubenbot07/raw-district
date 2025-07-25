'use client';

import Link from "next/link";
import { useState } from "react";

const priceFilters = [200000, 300000, 400000];

export const GiftsNav = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="relative cursor-pointer">Gifts</span>
      <span className={`absolute left-0 bottom-0 h-[1px] w-full bg-black origin-left transition-transform duration-300 ${
        isHovered ? "scale-x-100" : "scale-x-0"
      }`} />

      <ul className={`${
        isHovered ? 'opacity-100' : 'opacity-0'
      } text-xs flex flex-col gap-3 absolute w-max top-8 bg-white z-50 py-6 px-4 transition-opacity duration-300 ease-in-out`}>
        
        <li className="relative group w-fit">
          <Link href="/gifts?type=gift-cards">
            Gift cards
          </Link>
          <span className="absolute left-0 bottom-0 h-[1px] w-full bg-black origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
        </li>

        {priceFilters.map(price => (
          <li key={price} className="relative group w-fit">
            <Link href={`/gifts?price_lt=${price}`}>
              Less than ${price.toLocaleString()}
            </Link>
            <span className="absolute left-0 bottom-0 h-[1px] w-full bg-black origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
          </li>
        ))}
      </ul>
    </div>
  );
};