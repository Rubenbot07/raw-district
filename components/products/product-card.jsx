'use client'
import { useState } from "react";
import Link from "next/link";
import { useCartUIStore } from "@/app/stores/cartUIStore";
import { useCartStore } from "@/app/stores/cartStore";
import { formatPrice } from "@/utils/formatPrice";
import { toast } from "react-toastify";
import Image from "next/image";
export const ProductCard = ({ product }) => {
    const image1 = product?.product_images.find((image) => image?.position === 1);
    const image2 = product?.product_images.find((image) => image?.position === 2);
    const [hovered, setHovered] = useState(false);
    const [onFocus, setOnFocus] = useState(false);
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
                toast.success('Product added to cart successfully')
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
  <li className="flex gap-3 lg:mx-auto">
    <div
      className="relative w-[300px] max-w-[300px] lg:w-[240px] lg:max-w-[240px] xl:w-[300px] xl:max-w-[300px] 2xl:w-[280px] 2xl:max-w-[280px] mxl:w-[320px] mxl:max-w-[320px] h-auto cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link href={`/productDetail/${product.slug}`}>
        <div className="relative aspect-[4/5] w-full overflow-hidden">

          {/* Imagen 1 (default) */}
          <Image
            src={image1?.thumbnail_url || "/placeholder.jpg"}
            alt={product?.name}
            fill
            sizes="(min-width: 768px) 400px, 300px"
            className={`object-cover rounded-lg transition-opacity duration-500 ${
              hovered && image2 ? "opacity-0" : "opacity-100"
            }`}
          />

          {/* Imagen 2 (hover) */}
          {image2 && (
            <Image
              src={image2?.thumbnail_url}
              alt={product?.name}
              fill
              sizes="(min-width: 768px) 400px, 300px"
              className={`object-cover rounded-lg absolute top-0 left-0 transition-opacity duration-500 ${
                hovered ? "opacity-100" : "opacity-0"
              }`}
            />
          )}
        </div>

        <div className="flex flex-col text-xs gap-1 py-3">
          <p className="leading-relaxed min-h-[calc(1em*1.625*2)] line-clamp-2 md:line-clamp-none md:min-h-0">
            {product?.name}
          </p>
          <p>{formatPrice(product?.price)}</p>
        </div>
      </Link>

      <button
        className={`w-full border-[1px] border-black text-center md:w-32 md:border-none md:absolute z-40 md:bottom-24 right-2 text-xs bg-white text-black px-4 py-2 transition-opacity duration-500 
        ${hovered ? "md:opacity-100" : "md:opacity-0"}
        ${onFocus ? "md:opacity-100 outline outline-2 outline-black" : ""}
        `}
        onClick={(e) => handleQuickAdd(e)}
        value={product?.id}
        onFocus={() => {
          setOnFocus(true)}
        }
        onBlur={() => setOnFocus(false)}
      >
        {product.categories.name === 'Caps' ? 'ADD TO CART' : 'ADD'}
      </button>
    </div>
  </li>
);
};