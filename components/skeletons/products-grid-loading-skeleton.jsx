export const ProductGridLoadingSkeleton = () => {
    return (
    <div className="mx-auto max-w-[1700px] xl:max-w-[2000px] px-4">
        <div className="flex justify-center items-center py-4 border border-gray-300 ">
            <span className="w-32 h-3 bg-gray-200 rounded"/>
        </div>
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 px-2 py-4 mx-auto gap-4">
            {Array.from({ length: 15 }).map((_, index) => (
            <li key={index} className="flex gap-3 lg:mx-auto animate-pulse">
                <div className="relative w-[300px] max-w-[300px] lg:w-[240px] lg:max-w-[240px] xl:w-[300px] xl:max-w-[300px] 2xl:w-[280px] 2xl:max-w-[280px] mxl:w-[320px] mxl:max-w-[320px] h-auto">
                {/* Imagen */}
                <div className="relative aspect-[4/5] w-full bg-gray-200 rounded-lg" />

                {/* Info producto */}
                <div className="flex flex-col text-xs gap-2 py-3">
                    <div className="h-4 bg-gray-300 rounded w-5/6" />
                    <div className="h-4 bg-gray-300 rounded w-1/3" />
                </div>

                {/* Botón add */}
                <div className="w-full border border-black text-center md:w-32 md:border-none md:absolute z-40 md:bottom-24 right-2 text-xs bg-gray-300 text-black px-4 py-2 rounded" />
                </div>
            </li>
            ))}
        </ul>
    </div>
    );
}