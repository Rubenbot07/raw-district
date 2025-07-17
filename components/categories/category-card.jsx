import Link from "next/link";
import Image from "next/image";

export const CategoryCard = ({ category }) => {
  return (
    <Link href={`/category/${category.slug}`}>
      <div className="relative h-52 w-80 overflow-hidden rounded-lg border border-gray-200">
        
        {/* Imagen optimizada */}
        <Image
          src={category.category_image}
          alt={category.name}
          fill
          sizes="320px"
          className="object-cover object-top rounded-lg"
          priority
        />

        {/* Overlay oscuro */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Texto centrado */}
        <h2 className="text-3xl font-semibold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white z-10">
          {category.name.toUpperCase()}
        </h2>
      </div>
    </Link>
  );
};