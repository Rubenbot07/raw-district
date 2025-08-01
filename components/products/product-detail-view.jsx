import { SizesWrapper } from "@/components/categories/sizes-wrapper";
import { ProductImagesWrapper, ProductInfoWrapper, ProductImageSlider, ProductShippingInfo, ProductFAQsInfo } from "@/components/products"
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