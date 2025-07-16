'use client'
import { useState, useEffect } from "react";
import { getProductDetail } from "@/actions/get-product-detail";
import { SizesWrapper } from "@/components/categories/sizes-wrapper";
import { InfinitiveLoopSlider } from "@/components/cart/infinitive-loop-slider";
import { useCartUIStore } from "@/app/stores/cartUIStore";
import { X } from "lucide-react";
export const PreCartModal = () => {
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(false);
    const openPreCart = useCartUIStore((state) => state.openPreCart);
    const setOpenPreCart = useCartUIStore((state) => state.setOpenPreCart);
    const selectedProductSlug = useCartUIStore((state) => state.selectedProductSlug);
    
useEffect(() => {
  if (!selectedProductSlug) return;

  const fetchProduct = async () => {
    setProduct([]);
    setLoading(true);

    const { product, error } = await getProductDetail(selectedProductSlug);

    if (error) {
      console.error("Error fetching product:", error);
    } else {
      setProduct(product);
    }

    setLoading(false);
  };

  fetchProduct();
}, [selectedProductSlug]);



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
                      fixed top-0 right-0 z-50 h-full w-[360px] max-w-full bg-white shadow-lg transition-transform duration-300
                      flex flex-col justify-start
                      ${openPreCart ? 'translate-x-0' : 'translate-x-full'}
                  `}
                  style={{ willChange: 'transform' }}
              >
                <button onClick={() => setOpenPreCart(false)} className="absolute top-4 right-4 bg-white p-2 z-40">
                    <X />
                </button>
                {loading && <p>Loading...</p>}
                <div className="flex flex-col gap-4">
                    {product && product.product_sizes && (
                        <div className="w-full">
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