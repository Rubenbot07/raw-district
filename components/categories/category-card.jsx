import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";

export const CategoryCard = ({ category }) => {
  const t = useTranslations("Category");
  const tAriaLabel = useTranslations("AriaLabel");
  return (
    <Link
      href={`/category/?category=${category.slug}`}
      className="w-[90vw] flex-shrink-0 max-w-md md:w-[40vw] lg:w-full xl:max-w-none xl:w-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      aria-label={`${tAriaLabel("browseProductsIn")} ${t(category.slug)}`}
    >
      <div className="relative group w-full aspect-[3/4] lg:aspect-[4/3] xl:aspect-[3/4] overflow-hidden rounded-lg border border-gray-200">
        <Image
          src={category.category_image}
          alt={`${tAriaLabel("category")} ${t(category.slug)}`}
          fill
          sizes="(max-width: 768px) 90vw, (max-width: 1024px) 40vw, 100vw"
          className="object-cover object-center rounded-lg transition-transform duration-500 group-hover:scale-110"
          priority
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-black/40"
        />
        <h2
          className="text-3xl font-semibold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white z-10"
          aria-hidden="true"
        >
          {t(category.slug).toLocaleUpperCase() || category.name}
        </h2>
      </div>
    </Link>
  );
};