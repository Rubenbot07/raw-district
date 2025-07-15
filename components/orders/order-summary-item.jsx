'use client';
import { useState, useEffect } from "react";
import { getProductById } from "@/actions/get-product-by-id";
import { formatPrice } from "@/utils/formatPrice";
export const OrderSummaryItem = ({productId, quantity, size, unit_price, subtotal}) => {
    
    const [product, setProduct] = useState(null);
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { product } = await getProductById(productId);
                setProduct(product);
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };
        fetchProduct();
    }, [productId]);

    
    return (
        <div className="flex justify-between items-center gap-4 py-3 flex-wrap border-b-[1px] border-gray-300 last:border-b-0">
            <div className="flex gap-3">
                <div className="w-14 h-14 min-w-14">
                    <img className="w-full h-full object-cover rounded-xl" src={product?.product_images[0].thumbnail_url} alt={product?.name} />
                </div>
                <div className="flex flex-col justify-center">
                    <span className="text-sm">
                        {product?.name}
                    </span>
                    <span className="text-xs">
                        {size}
                    </span>
                </div>
            </div>
            <div>
                <span>Total: {formatPrice(subtotal)} ({quantity})</span>
            </div>
        </div>
    )
}