import Image from "next/image";
import { SizesWrapper } from "@/components/categories/sizes-wrapper";
import { ProductImagesWrapper } from "@/components/products/product-images-wrapper";
import { ProductInfoWrapper } from "@/components/products/product-info-wrapper";
export const ProductDetailView = ({ product }) => {
  const image1 = product?.product_images.find((image) => image?.position === 1);
  const image2 = product?.product_images.find((image) => image?.position === 2);
  const image3 = product?.product_images.find((image) => image?.position === 3);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 py-8 gap-8 lg:gap-16">
      <ProductImagesWrapper product={product} />
      <div className="h-screen overflow-y-auto sticky top-0">
        <ProductInfoWrapper product={product}>
          <SizesWrapper product={product} />
        </ProductInfoWrapper>
      </div>
    </div>
  );
};