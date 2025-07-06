'use client'

import { useState } from "react";
import Link from "next/link";

export const ProductCard = ({ product }) => {
    const image1 = product?.product_images.find((image) => image?.position === 1);
    const image2 = product?.product_images.find((image) => image?.position === 2);
    const [hovered, setHovered] = useState(false);

    const handleQuickAdd = (e) => {
        e.stopPropagation();
        alert("Quick add clicked for product:");
    };

return (
    <div 
        className="relative border border-gray-200 rounded-lg w-[300px] max-w-[300px] md:w-[400px] h-auto cursor-pointer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
    >
        <Link 
            href={`/productDetail/${product.slug}`} 
        >
            <div className="relative overflow-hidden rounded-lg">
                
                {/* Placeholder invisible que define el tamaño */}
                <img
                    src={image1?.thumbnail_url}
                    alt={product?.name}
                    className="w-full h-auto invisible"
                />

                {/* Imagen principal */}
                <img
                    src={image1?.thumbnail_url}
                    alt={product?.name}
                    className={`absolute inset-0 w-full h-full object-cover rounded-lg transition-opacity duration-500 ${
                        hovered && image2 ? "opacity-0" : "opacity-100"
                    }`}
                />

                {/* Imagen secundaria (hover) */}
                {image2 && (
                    <img
                        src={image2.thumbnail_url}
                        alt={product?.name}
                        className={`absolute inset-0 w-full h-full object-cover rounded-lg transition-opacity duration-500 ${
                            hovered ? "opacity-100" : "opacity-0"
                        }`}
                    />
                )}
            </div>
            <h2>{product?.name}</h2>
        </Link>
        <button 
            className={`absolute z-50 bottom-14 right-2 bg-white text-black px-4 py-2 rounded transition-opacity duration-500 ${hovered ? "opacity-100" : "opacity-0"} `} 
            onClick={(e) => handleQuickAdd(e)}
            >
                Add 🛒
        </button>
    </div>
);
};