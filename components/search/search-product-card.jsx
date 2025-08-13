import { useFormatPrice } from "@/utils/formatPrice";
import Link from "next/link";
import { useTranslations } from "next-intl";

export const SearchProductCard = ({ product, onClick }) => {
  const formatPrice = useFormatPrice();
  const tProductInfo = useTranslations("ProductInfo");
  const tAriaLabel = useTranslations("AriaLabel");
  return (
    <article className="max-w-60 text-xs">
      <Link
        href={`/productDetail/${product.slug}`}
        onClick={onClick}
        className="block focus:outline-none focus:ring-2 focus:ring-black rounded"
        aria-label={`${tAriaLabel("viewDetailsFor")} ${product.name}`}
      >
        <div>
          <img
            src={product.product_images[0].thumbnail_url}
            alt={`${tAriaLabel("thumbnail")} ${product.name}`}
            className="w-full object-cover"
          />
        </div>
        <p className="line-clamp-2 mt-1">{tProductInfo(`${product.i18n_key}.name`)}</p>
        <p className="text-[10px] text-gray-500">${formatPrice(product.price)}</p>
      </Link>
    </article>
  );
};