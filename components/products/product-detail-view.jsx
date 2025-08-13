import { SizesWrapper } from "@/components/categories/sizes-wrapper";
import { ProductImagesWrapper, ProductInfoWrapper, ProductImageSlider, ProductShippingInfo, ProductFAQsInfo } from "@/components/products"
import { useTranslations } from "next-intl";

export const ProductDetailView = ({ product }) => {
  const tAriaLabel = useTranslations("AriaLabel");

  return (
    <main className="px-4 md:px-0">
      <article>
        <div className="grid grid-cols-1 md:grid-cols-2 py-4 md:py-8 gap-8 lg:gap-16">
          {/* Carrusel de imágenes principal */}
          <ProductImageSlider
            productImages={product.product_images}
            productKey={product.i18n_key}
          />
          {/* Miniaturas o imágenes secundarias */}
          <ProductImagesWrapper product={product} />

          {/* Información del producto con scroll */}
          <div
            className="h-auto md:h-screen overflow-y-auto sticky top-0 px-4 md:px-1"
            role="region"
            aria-label={tAriaLabel("productDetails")}
          >
            <ProductInfoWrapper product={product}>
              <SizesWrapper product={product} />
            </ProductInfoWrapper>
          </div>
        </div>

        {/* Información adicional */}
        <section aria-labelledby="shipping-faqs" className="flex flex-col p-4">
          <h2 id="shipping-faqs" className="sr-only">
            {tAriaLabel("shippingAndFaqs")}
          </h2>
          <ProductShippingInfo />
          <ProductFAQsInfo />
        </section>
      </article>
    </main>
  );
};