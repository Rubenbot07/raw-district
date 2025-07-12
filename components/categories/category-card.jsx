import Link from "next/link";
export const CategoryCard = ({ category }) => {
    return (
        <Link href={`/category/${category.slug}`}>
            <div className="border border-gray-200 p-4 rounded-lg h-52 w-80 overflow-hidden relative">
                <img
                    className="w-full h-full object-cover object-top absolute inset-0"
                    src={category.category_image}
                    alt={category.name}
                />
                {/* Overlay oscuro */}
                <div className="absolute inset-0 bg-black/40"></div>
                <h2 className="text-3xl font-semibold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white z-10">
                    {category.name.toUpperCase()}
                </h2>
            </div>
        </Link>
    );
};