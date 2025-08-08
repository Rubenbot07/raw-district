import Link from 'next/link';
import { useTranslations } from 'next-intl';

export const PopularSearches = ({ onClose }) => {
  const t = useTranslations('Search');
  const tCategory = useTranslations('Category');
  return (
    <section
      className="md:w-1/3 py-3"
      aria-labelledby="popular-searches-heading"
    >
      <h2
        id="popular-searches-heading"
        className="py-1 border-b-[1px] border-gray-300 text-base font-medium"
      >
        {t('popularSearches')}
      </h2>

      <ul className="flex flex-col gap-2 py-4">
        <li>
          <Link
            href="/category/?category=t-shirts"
            onClick={onClose}
            className="hover:underline focus:outline-none focus:ring-2 focus:ring-black rounded"
          >
            {tCategory('t-shirts')}
          </Link>
        </li>
        <li>
          <Link
            href="/category/?category=hoodies"
            onClick={onClose}
            className=" hover:underline focus:outline-none focus:ring-2 focus:ring-black rounded"
          >
            {tCategory('hoodies')}
          </Link>
        </li>
        <li>
          <Link
            href="/category/?category=caps"
            onClick={onClose}
            className=" hover:underline focus:outline-none focus:ring-2 focus:ring-black rounded"
          >
            {tCategory('caps')}
          </Link>
        </li>
      </ul>
    </section>
  );
};