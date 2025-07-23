import { SizesWrapper } from "@/components/categories/sizes-wrapper";
import { ProductImagesWrapper } from "@/components/products/product-images-wrapper";
import { ProductInfoWrapper } from "@/components/products/product-info-wrapper";
import { ProductImageSlider } from "@/components/products/product-image-slider";
import { ProductShippingInfo } from "@/components/products/product-shipping-info";
import { ProductFAQsInfo } from "@/components/products/product-faqs-info";
export const ProductDetailView = ({ product }) => {

  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-2 py-4 md:py-8 gap-8 lg:gap-16">
        <ProductImageSlider productImages={product.product_images} productName={product.name}/>
        <ProductImagesWrapper product={product} />
        <div className="h-auto md:h-screen overflow-y-auto sticky top-0 px-4 md:px-1">
          <ProductInfoWrapper product={product}>
            <SizesWrapper product={product} />
          </ProductInfoWrapper>
        </div>
      </div>
      <div className="flex flex-col p-4">
        <ProductShippingInfo />
        <ProductFAQsInfo />
      </div>
    </section>
  );
};