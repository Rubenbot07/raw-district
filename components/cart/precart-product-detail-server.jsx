'use server'
import { getProductDetail } from "@/actions/get-product-detail";
import { SizesWrapper } from "@/components/categories/sizes-wrapper";
import { InfinitiveLoopSlider } from "@/components/cart/infinitive-loop-slider";

export async function ProductDetailServer({ slug }) {
  const { product, error } = await getProductDetail(slug);

  if (error || !product) {
    return <p>Error loading product</p>;
  }

  return (
    <div>
      <InfinitiveLoopSlider productImages={product.product_images} />
      <p>{product.name}</p>
      <SizesWrapper product={product} />
    </div>
  );
}