'use client'
import { useState, useEffect, useRef } from "react";
import { InfinitiveLoopSlider, PreCartModalLoadingSkeleton, AddToCartButton } from "@/components/cart";
import { getProductDetail } from "@/actions/get-product-detail";
import { SizesWrapper } from "@/components/categories/sizes-wrapper";
import { useCartUIStore } from "@/app/stores/cartUIStore";
import { useProductSelectionStore } from "@/app/stores/productSelectionStore";
import { formatPrice } from "@/utils/formatPrice";
import { X } from "lucide-react";
import {FocusTrap} from 'focus-trap-react';

export const PreCartModal = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const selectedSize = useProductSelectionStore((state) => state.selectedSize);
  const openPreCart = useCartUIStore((state) => state.openPreCart);
  const setOpenPreCart = useCartUIStore((state) => state.setOpenPreCart);
  const selectedProductSlug = useCartUIStore((state) => state.selectedProductSlug);
  const closeButtonRef = useRef(null);

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

  useEffect(() => {
    if (openPreCart && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, [openPreCart]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setOpenPreCart(false);
    };
    if (openPreCart) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [openPreCart]);

  return (
    <>
      {openPreCart && (
        <FocusTrap
        active={openPreCart}
        focusTrapOptions={{
          initialFocus: () => closeButtonRef.current,
          clickOutsideDeactivates: true,
          escapeDeactivates: false
        }}
        >
          <div>
            <div
              className="fixed inset-0 bg-black bg-opacity-40 z-50 pointer-events-auto"
              onClick={() => setOpenPreCart(false)}
              aria-label="Close pre-cart modal overlay"
            />
            <div
              role="dialog"
              aria-modal="true"
              aria-label="Product preview before adding to cart"
              className={`
                w-full h-[350px] bottom-0 rounded-t-xl
                fixed md:top-0 md:right-0 z-50 md:h-full md:w-[360px] max-w-full bg-white shadow-lg transition-all duration-500 ease-in-out
                flex flex-col justify-start
                ${openPreCart ? 'md:translate-x-0  translate-y-0 opacity-100' : 'md:translate-x-full translate-y-full md:translate-y-0 opacity-0'}
              `}
              style={{ willChange: 'transform' }}
            >
              <button
                ref={closeButtonRef}
                onClick={() => setOpenPreCart(false)}
                className="absolute top-2 right-4 bg-white p-2 z-40"
                aria-label="Close preview modal"
              >
                <X aria-hidden="true" />
              </button>

              {loading && <PreCartModalLoadingSkeleton />}


              <div className="flex flex-col gap-4">
                {product && product.product_sizes && (
                  <div className="w-full">
                    <InfinitiveLoopSlider productImages={product.product_images} />
                    <div className="flex flex-col gap-6 p-4">
                      <p className="font-medium" id="product-name">{product.name}</p>
                      <p className="text-xs">{formatPrice(product.price)}</p>
                      <SizesWrapper product={product} />
                      <p className="text-xs">{product.description}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="w-full p-4 mt-auto">
                <AddToCartButton
                  product={product}
                  product_size_id={selectedSize?.id}
                  productId={product.id}
                  unit_price={product.price}
                />
              </div>
            </div>
          </div>
        </FocusTrap>
      )}
    </>
  );
};