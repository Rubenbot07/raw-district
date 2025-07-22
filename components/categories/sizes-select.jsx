'use client';
export const SizesSelect = ({ sizes, selectedSize, onSelectSize }) => {


    return (
        <div className="flex justify-between max-w-xs">
            <div>
                <p className="text-xs font-semibold">Size</p>
                <p className="text-[10px] font-medium">{selectedSize.size}</p>
            </div>
            <div className="flex gap-2 px-4">
                {sizes.map((size) => (
                        <button
                            key={size.id}
                            disabled={size.stock <= 0}
                            type="button"
                            className={`w-10 border-[1px] border-black disabled:opacity-50 inline-block text-xs cursor-pointer
                                ${selectedSize?.id === size.id
                                    ? "bg-black text-white"
                                    : "bg-white text-black"}
                            `}
                            onClick={() => onSelectSize(size)}
                        >
                            {size.size}
                        </button>
                ))}
            </div>
        </div>
    )
};