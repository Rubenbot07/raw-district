'use client';

import { formatPrice } from "@/utils/formatPrice";
import { AddToCartButton } from "@/components/cart/add-to-cart-button";
import { useProductSelectionStore } from "@/app/stores/productSelectionStore";
import { BuyNow } from "@/components/products/buy-now";
import { Truck, Medal, Shield, MessagesSquare, CircleAlert } from "lucide-react";

export const ProductInfoWrapper = ({ product, children }) => {
  const selectedSize = useProductSelectionStore((state) => state.selectedSize);
  const lowStock = selectedSize?.stock <= 5 || product.product_sizes[0].stock <= 5;

  return (
    <section className="flex flex-col gap-8 lg:w-3/4 xl:w-4/6 xl:mx-auto p-2" aria-labelledby="product-info-title">
      {/* Título y precio */}
      <header className="flex flex-col text-start gap-4">
        <h1 id="product-info-title" className="text-3xl font-medium">
          {product.name}
        </h1>
        <p className="text-md">{formatPrice(product.price)}</p>
      </header>

      {/* Tallas */}
      {product.categories.name !== "Caps" && (
        <section className="w-2/3" aria-labelledby="size-options">
          <h2 id="size-options" className="sr-only">Select size</h2>
          {children}
        </section>
      )}

      {/* Alerta de stock bajo */}
      {lowStock && (
        <div className="flex gap-2 items-center" role="alert" aria-live="polite">
          <CircleAlert size={20} color="#f79554" aria-hidden="true" />
          <p className="text-xs">
            Hurry, only {selectedSize?.stock || product.product_sizes[0].stock} left in stock
          </p>
        </div>
      )}

      {/* Botones de acción */}
      <section className="grid grid-cols-2 gap-3 py-4" aria-label="Purchase options">
        <AddToCartButton
          product={product}
          productId={product.id}
          product_size_id={selectedSize?.id || product.product_sizes[0].id}
          unit_price={product.price}
        />
        <BuyNow
          productId={product?.id}
          quantity={1}
          unit_price={product?.price}
          product_size_id={selectedSize?.id || product?.product_sizes[0].id}
        />
      </section>

      {/* Info de retiro y envío */}
      <section aria-labelledby="shipping-info" className="flex flex-col gap-2">
        <h2 id="shipping-info" className="sr-only">Shipping Information</h2>
        <p className="text-xs">
          Withdrawal available at <strong>Melonn Dosquebradas</strong>
        </p>
        <p className="text-[10px]">It is usually ready in 4 hours</p>
        <div className="flex gap-2 items-center text-[10px]">
          <Truck size={20} color="#0eb453" aria-hidden="true" />
          <span>FREE SHIPPING ON PURCHASES OVER $200,000</span>
        </div>
      </section>

      {/* Descripción */}
      <section aria-labelledby="product-description" className="flex flex-col gap-4 text-xs">
        <h2 id="product-description" className="underline text-sm">
          DESCRIPTION
        </h2>
        <p>{product.description}</p>
        <p>Composition: {product.composition}</p>
      </section>

      {/* Características extra */}
      <section className="flex flex-col gap-2 text-xs" aria-labelledby="product-benefits">
        <h2 id="product-benefits" className="sr-only">Product benefits</h2>
        <div className="flex gap-2">
          <Medal size={20} strokeWidth={1.5} aria-hidden="true" />
          <span>Premium Quality</span>
        </div>
        <div className="flex gap-2">
          <Truck size={20} strokeWidth={1.5} aria-hidden="true" />
          <span>Express Shipping</span>
        </div>
        <div className="flex gap-2">
          <Shield size={20} strokeWidth={1.5} aria-hidden="true" />
          <span>Secure Payment</span>
        </div>
        <div className="flex gap-2">
          <MessagesSquare size={20} strokeWidth={1.5} aria-hidden="true" />
          <span>Doubts? Write to us (+57) 3006870774</span>
        </div>
      </section>
    </section>
  );
};