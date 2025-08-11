'use client';

import { useState, useEffect } from "react";
import { getProductById } from "@/actions/get-product-by-id";
import { useFormatPrice } from "@/utils/formatPrice";
import { useTranslations } from "next-intl";

export const OrderSummaryItem = ({ productId, quantity, size, subtotal }) => {
  const formattedPrice = useFormatPrice();
  const [product, setProduct] = useState(null);
  const tCommon = useTranslations("Common");
  const tProductInfo = useTranslations("ProductInfo");
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

  if (!product) {
    return (
      <div className="py-3 text-sm text-gray-500">
        {tCommon("loading")}
      </div>
    );
  }

  const imageUrl = product?.product_images?.[0]?.thumbnail_url;

  return (
    <div
      className="flex justify-between items-center gap-4 py-3 flex-wrap border-b border-gray-300 last:border-b-0"
      role="listitem"
    >
      {/* Left: Image + Name */}
      <div className="flex gap-3 items-start w-full sm:w-auto">
        <div className="w-14 h-14 min-w-14">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={product.name}
              className="w-full h-full object-cover rounded-xl"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 rounded-xl" aria-hidden="true" />
          )}
        </div>
        <div className="flex flex-col justify-center">
          <span className="text-sm font-medium">{product ? `${tProductInfo(`${product.i18n_key}.name`)}` : ""}</span>
          <span className="text-xs text-gray-500">{tCommon("size")}: {size}</span>
        </div>
      </div>

      {/* Right: Price & Quantity */}
      <div className="text-sm text-right sm:text-left">
        <span>
          {tCommon("total")}: ${formattedPrice(subtotal)}{" "}
          <span className="text-gray-500">({quantity})</span>
        </span>
      </div>
    </div>
  );
};