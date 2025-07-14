'use client'

import { useState } from "react";
import Link from "next/link";
import { useCartUIStore } from "@/app/stores/cartUIStore";
import { useCartStore } from "@/app/stores/cartStore";
export const ProductCard = ({ product }) => {
    const image1 = product?.product_images.find((image) => image?.position === 1);
    const image2 = product?.product_images.find((image) => image?.position === 2);
    const [hovered, setHovered] = useState(false);
    const setOpenCart = useCartUIStore((state) => state.setOpenCart);
    const setOpenPreCart = useCartUIStore((state) => state.setOpenPreCart);
    const setSelectedProductSlug = useCartUIStore((state) => state.setSelectedProductSlug);
    const addToCart = useCartStore((state) => state.addToCart);
    const setCartUpdated = useCartStore((state) => state.setCartUpdated);
    const addToCartLocal = useCartStore((state) => state.addToCartLocal);
    const handleQuickAdd = async (e) => {
        e.stopPropagation();
        if(product?.categories.name === 'Caps') {
            addToCartLocal({ 
                product,
                productId: product.id,
                product_size_id: product.product_sizes[0].id,
            });
            setOpenCart(true)
            try {
                await addToCart({
                    productId: product?.id,
                    unit_price: product?.price,
                    product_size_id: product?.product_sizes[0]?.id
                })
                setCartUpdated(true)
            } catch(error) {
                console.log(error)
            }

        } else {
            console.log('not caps')
            setSelectedProductSlug(product.slug);
            setOpenPreCart(true);
            console.log(product)
        }
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
            className={`absolute flex z-40 bottom-14 right-2 text-xs bg-white text-black px-4 py-2 rounded transition-opacity duration-500 ${hovered ? "opacity-100" : "opacity-0"} `} 
            onClick={(e) => handleQuickAdd(e)}
            value={product?.id}
            >
             {product.categories.name === 'Caps' ? 'ADD TO CART' : 'ADD'}
        </button>
    </div>
);
};