'use client'
import { useCartContext } from "@/app/context/addCartContext";
import { useState, useEffect } from "react";
import { getProductDetail } from "@/actions/get-product-detail";
import { SizesWrapper } from "./sizes-wrapper";
import { InfinitiveLoopSlider } from "./infinitive-loop-slider";
export const PreCartModal = () => {
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(false);
    const { openPreCart, setOpenPreCart, selectedProductSlug } = useCartContext();
    
    useEffect(()=> {
     const fetchProduct = async () => {
        setProduct([]);
        setLoading(true);
        if (!selectedProductSlug) return;
        const { product, error } = await getProductDetail(selectedProductSlug);
        if (error) {
            console.error("Error fetching product:", error);
            return;
        }
        setProduct(product);
        setLoading(false);
     }   
     fetchProduct();
    }, [selectedProductSlug])



    return (
        <>
            {openPreCart && (
            <div
                className="fixed inset-0 bg-black bg-opacity-40 z-40"
                onClick={() => setOpenPreCart(false)}
                aria-label="Close cart overlay"
            />
            )}
                <div
                    className={`
                        fixed top-0 right-0 z-50 h-full w-[350px] max-w-full bg-white shadow-lg transition-transform duration-300
                        flex flex-col items-center justify-start p-4
                        ${openPreCart ? 'translate-x-0' : 'translate-x-full'}
                    `}
                    style={{ willChange: 'transform' }}
                >
                <button onClick={() => setOpenPreCart(false)} className="mb-4 self-end">
                    Close
                </button>
            <h2 className="mb-4 text-lg font-bold">Shopping Cart</h2>
            {loading && <p>Loading...</p>}
            <div className="flex flex-col gap-4">
                {product && product.product_sizes && (
                    <div>
                        <InfinitiveLoopSlider productImages={product.product_images} />
                        <p>{product.name}</p>
                        <SizesWrapper product={product} />
                    </div>
                )}            
            </div>
            </div>
    </>
)
}