import { formatPrice } from "@/utils/formatPrice"
import Link from "next/link"
export const SearchProductCard = ({product}) => {
    return (
        <Link href={`/productDetail/${product.slug}`} className="max-w-60 text-xs">
            <div>
                <img src={product.product_images[0].thumbnail_url} alt={product.name} />
            </div>
            <p className="line-clamp-2">{product.name}</p>
            <p className="text-[10px]">{formatPrice(product.price)}</p>
        </Link>
    )
}