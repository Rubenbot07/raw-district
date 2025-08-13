'use client';

import { useFormatPrice } from "@/utils/formatPrice";
import { AddToCartButton } from "@/components/cart/add-to-cart-button";
import { useProductSelectionStore } from "@/app/stores/productSelectionStore";
import { BuyNow } from "@/components/products/buy-now";
import { Truck, Medal, Shield, MessagesSquare, CircleAlert } from "lucide-react";
import { useTranslations } from "next-intl";

export const ProductInfoWrapper = ({ product, children }) => {
  const selectedSize = useProductSelectionStore((state) => state.selectedSize);
  const lowStock = selectedSize?.stock <= 5 || product.product_sizes[0].stock <= 5;
  const formatPrice = useFormatPrice();
  const t = useTranslations('Product');
  const tProductInfo = useTranslations('ProductInfo');
  const tAriaLabel = useTranslations('AriaLabel');
  return (
    <section className="flex flex-col gap-8 lg:w-3/4 xl:w-4/6 xl:mx-auto p-2" aria-labelledby="product-info-title">
      {/* Título y precio */}
      <header className="flex flex-col text-start gap-4">
        <h1 id="product-info-title" className="text-3xl font-medium">
          {product ? tProductInfo(`${product.i18n_key}.name`) : ""}
        </h1>
        <p className="text-md">${formatPrice(product.price)}</p>
      </header>

      {/* Tallas */}
      {product.categories.name !== "Caps" && (
        <section className="w-2/3" aria-labelledby="size-options">
          <h2 id="size-options" className="sr-only">{t("selectSize")}</h2>
          {children}
        </section>
      )}

      {/* Alerta de stock bajo */}
      {lowStock && (
        <div className="flex gap-2 items-center" role="alert" aria-live="polite">
          <CircleAlert size={20} color="#f79554" aria-hidden="true" />
          <p className="text-xs">
            {t("hurry")} {selectedSize?.stock || product.product_sizes[0].stock} {t("leftInStock")}
          </p>
        </div>
      )}

      {/* Botones de acción */}
      <section className="grid grid-cols-2 gap-3 py-4" aria-label={tAriaLabel("purchaseOptions")}>
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
        <h2 id="shipping-info" className="sr-only">{t("shippingInfo")}</h2>
        <p className="text-xs">
          {t("withdrawal")} <strong>Melonn Dosquebradas</strong>
        </p>
        <p className="text-[10px]">{t("usually")}</p>
        <div className="flex gap-2 items-center text-[10px]">
          <Truck size={20} color="#0eb453" aria-hidden="true" />
          <span>{t("freeShipping")}</span>
        </div>
      </section>

      {/* Descripción */}
      <section aria-labelledby="product-description" className="flex flex-col gap-4 text-xs">
        <h2 id="product-description" className="underline text-sm">
          {t("description")}
        </h2>
        <p>{product ? tProductInfo(`${product.i18n_key}.description`) : ""}</p>
        <p>{t("composition")}: {product ? tProductInfo(`${product.i18n_key}.composition`) : ""}</p>
      </section>

      {/* Características extra */}
      <section className="flex flex-col gap-2 text-xs" aria-labelledby="product-benefits">
        <h2 id="product-benefits" className="sr-only">{t("productBenefits")}</h2>
        <div className="flex gap-2">
          <Medal size={20} strokeWidth={1.5} aria-hidden="true" />
          <span>{t("premiumQuality")}</span>
        </div>
        <div className="flex gap-2">
          <Truck size={20} strokeWidth={1.5} aria-hidden="true" />
          <span>{t("expressShipping")}</span>
        </div>
        <div className="flex gap-2">
          <Shield size={20} strokeWidth={1.5} aria-hidden="true" />
          <span>{t("securePayment")}</span>
        </div>
        <div className="flex gap-2">
          <MessagesSquare size={20} strokeWidth={1.5} aria-hidden="true" />
          <span>{t("customerSupport")}</span>
        </div>
      </section>
    </section>
  );
};