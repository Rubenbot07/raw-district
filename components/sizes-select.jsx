'use client';
export const SizesSelect = ({ sizes, selectedSize, onSelectSize }) => {
    if(sizes.length === 1) {
        selectedSize = sizes[0];
    }
    return (
        console.log("SizesSelect rendered with sizes:", sizes),
        <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
                <div key={size.id} className="flex items-center">
                    <p>{size.stock}</p>
                    <button
                        disabled={size.stock <= 0}
                        type="button"
                        className={`disabled:opacity-50 inline-block px-3 py-1 rounded-full mr-2 mb-2 cursor-pointer
                            ${selectedSize?.id === size.id
                                ? "bg-blue-600 text-white"
                                : "bg-gray-200 text-gray-800"}
                        `}
                        onClick={() => onSelectSize(size)}
                    >
                        {size.size}
                    </button>
                </div>
            ))}
        </div>
    )
};