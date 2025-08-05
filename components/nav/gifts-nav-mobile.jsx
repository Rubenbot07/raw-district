import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

export const GiftsNavMobile = ({ onOpen }) => {
  const priceFilters = [200000, 300000, 400000];
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen((prev) => !prev);

  return (
    <div>
      <button
        type="button"
        onClick={toggle}
        aria-expanded={isOpen}
        aria-controls="gifts-submenu"
        className="flex items-center gap-1 w-fit focus-visible:outline focus-visible:outline-2 focus-visible:outline-black"
      >
        <span>Gifts</span>
        <ChevronDown
          size={16}
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        />
      </button>

      <ul
        id="gifts-submenu"
        className={`transition-all duration-300 ease-in-out flex flex-col gap-2 text-xs pl-4 mt-2 ${
          isOpen ? "opacity-100 max-h-[500px]" : "opacity-0 max-h-0 overflow-hidden"
        }`}
        inert={!isOpen ? true : undefined}
      >
        <li>
          <Link
            href="/gifts?type=gift-cards"
            onClick={onOpen}
            className="hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-black"
          >
            Gift cards
          </Link>
        </li>
        {priceFilters.map((price) => (
          <li key={price}>
            <Link
              href={`/gifts?price_lt=${price}`}
              onClick={onOpen}
              className="hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-black"
            >
              Less than ${price.toLocaleString()}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};