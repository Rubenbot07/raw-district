'use client'

import { useState } from "react";
import Link from "next/link";

export const ProductCard = ({ product }) => {
    const image1 = product?.product_images.find((image) => image?.position === 1);
    const image2 = product?.product_images.find((image) => image?.position === 2);
    const [hovered, setHovered] = useState(false);

    return (
        <div
            className="border border-gray-200 p-4 rounded-lg max-w-[300px] cursor-pointer"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <Link href={`/productDetail/${product.slug}`}>
                <img
                    src={hovered && image2 ? image2?.thumbnail_url : image1?.thumbnail_url}
                    alt={product?.name}
                />
                <h2 className="text-lg font-semibold text-wrap text-center">{product.name}</h2>
            </Link>
        </div>
    );
};