export const PreCartModalLoadingSkeleton = () => {
    return (
        <div className="flex flex-col gap-4 animate-pulse p-4">
            <div className="w-full h-[350px] hidden md:block bg-gray-200 rounded-lg" />

            <div className="flex flex-col gap-6">
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-3 bg-gray-200 rounded w-1/2" />

            <div className="flex gap-2">
                <div className="w-10 h-10 bg-gray-200 rounded border border-gray-300" />
                <div className="w-10 h-10 bg-gray-200 rounded border border-gray-300" />
                <div className="w-10 h-10 bg-gray-200 rounded border border-gray-300" />
            </div>

            <div className="h-3 bg-gray-200 rounded w-full" />
            <div className="h-3 bg-gray-200 rounded w-4/5" />
            <div className="h-3 bg-gray-200 rounded w-2/3" />
            </div>
        </div>
    );
};