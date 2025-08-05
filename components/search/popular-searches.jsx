import Link from 'next/link';

export const PopularSearches = ({ onClose }) => {
  return (
    <section
      className="md:w-1/3 py-3"
      aria-labelledby="popular-searches-heading"
    >
      <h2
        id="popular-searches-heading"
        className="py-1 border-b-[1px] border-gray-300 text-base font-medium"
      >
        Popular searches
      </h2>

      <ul className="flex flex-col gap-2 py-4">
        <li>
          <Link
            href="/category/?category=t-shirts"
            onClick={onClose}
            className="hover:underline focus:outline-none focus:ring-2 focus:ring-black rounded"
          >
            T-shirts
          </Link>
        </li>
        <li>
          <Link
            href="/category/?category=hoodies"
            onClick={onClose}
            className=" hover:underline focus:outline-none focus:ring-2 focus:ring-black rounded"
          >
            Hoodies
          </Link>
        </li>
        <li>
          <Link
            href="/category/?category=caps"
            onClick={onClose}
            className=" hover:underline focus:outline-none focus:ring-2 focus:ring-black rounded"
          >
            Caps
          </Link>
        </li>
      </ul>
    </section>
  );
};