'use client'
import { useState, useEffect } from "react";
import { InfinitiveLoopSlider, PreCartModalLoadingSkeleton, AddToCartButton } from "@/components/cart";
import { getProductDetail } from "@/actions/get-product-detail";
import { SizesWrapper } from "@/components/categories/sizes-wrapper";
import { useCartUIStore } from "@/app/stores/cartUIStore";
import { useProductSelectionStore } from "@/app/stores/productSelectionStore";
import { formatPrice } from "@/utils/formatPrice";
import { X } from "lucide-react";
export const PreCartModal = () => {
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(false);
    const selectedSize = useProductSelectionStore((state) => state.selectedSize);
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
                className="fixed inset-0 bg-black bg-opacity-40 z-50"
                onClick={() => setOpenPreCart(false)}
                aria-label="Close cart overlay"
            />
            )}
              <div
                  className={`w-full h-[350px] bottom-0 rounded-t-xl
                      fixed md:top-0 md:right-0 z-50 md:h-full md:w-[360px] max-w-full bg-white shadow-lg transition-all duration-500 ease-in-out
                      flex flex-col justify-start
                      ${openPreCart ? 'md:translate-x-0  translate-y-0 opacity-100' : 'md:translate-x-full translate-y-full md:translate-y-0 opacity-0'}
                  `}
                  style={{ willChange: 'transform' }}
              >
                <button onClick={() => setOpenPreCart(false)} className="absolute top-2 right-4 bg-white p-2 z-40">
                    <X />
                </button>
                {loading && <PreCartModalLoadingSkeleton />}
                <div className="flex flex-col gap-4">
                    {product && product.product_sizes && (
                        <div className="w-full">
                            <InfinitiveLoopSlider productImages={product.product_images} />
                            <div className="flex flex-col gap-6 p-4">
                              <p className="font-medium">{product.name}</p>
                              <p className="text-xs">{formatPrice(product.price)}</p>
                              <SizesWrapper product={product} />
                              <p className="text-xs">{product.description}</p>
                            </div>
                        </div>
                )}            
              </div>
              <div className="w-full p-4 fixed bottom-1">
                <AddToCartButton product={product} product_size_id={selectedSize?.id} productId={product.id} unit_price={product.price} />
              </div>
            </div>
    </>
)
}