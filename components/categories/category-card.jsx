import Link from "next/link";
import Image from "next/image";

export const CategoryCard = ({ category }) => {
  return (
    <Link
      href={`/category/?category=${category.slug}`}
      className="w-[90vw] flex-shrink-0 max-w-md md:w-[40vw] xl:max-w-none xl:w-full"
    >
      <div className="relative group w-full aspect-[3/4] lg:aspect-[4/3] xl:aspect-[3/4] overflow-hidden rounded-lg border border-gray-200">
        <Image
          src={category.category_image}
          alt={category.name}
          fill
          sizes="(max-width: 768px) 90vw, (max-width: 1024px) 40vw, 100vw"
          className="object-cover object-center rounded-lg transition-transform duration-500 group-hover:scale-110"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <h2 className="text-3xl font-semibold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white z-10">
          {category.name.toUpperCase()}
        </h2>
      </div>
    </Link>
  );
};