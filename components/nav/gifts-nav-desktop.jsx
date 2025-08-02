'use client';

import Link from "next/link";
import { useState } from "react";

export const GiftsNavDesktop = () => {
  const priceFilters = [200000, 300000, 400000];
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <span
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)} 
        className="relative cursor-pointer">
          Gifts
      </span>
      <span className={`absolute left-0 bottom-0 h-[1px] w-full bg-black origin-left transition-transform duration-300 ${
        isHovered ? "scale-x-100" : "scale-x-0"
      }`} />
      <div 
        className={`absolute top-0 left-0 z-50 h-max ${isHovered ? 'opacity-100' : 'opacity-0'}  py-8`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <ul className={`${
          isHovered ? 'opacity-100 block' : 'opacity-0 hidden'
        } text-xs flex flex-col gap-3 w-max bg-white z-50 py-6 px-4 transition-opacity duration-800 ease-in-out`}>
          
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
    </>
  );
};