import { ProductsLayout } from "@/components/products/products-layout";
import { ProductCard } from "@/components/products/product-card";
import { OrderBy } from "@/components/features/order-by";
import { ProductsPagination } from "@/components/products/products-pagination";
import { useTranslations } from "next-intl";

export const FilteredProducts = ({ products, filters, currentPage, total }) => {
  const shouldHidePagination = products.length < 15 && currentPage === 1;
  const totalPages = Math.ceil(total / 15);
  const t = useTranslations('Product');

  return (
    <section className="overflow-hidden">
      {/* Ordenamiento */}
      <OrderBy price={filters?.price_lt} />

      {/* Lista de productos */}
      {products?.length === 0 ? (
        <div className="py-12 text-center text-gray-500 text-sm">
          {t('productsNotFound')}
        </div>
      ) : (
        <ProductsLayout>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ProductsLayout>
      )}

      {/* Paginación */}
      {!shouldHidePagination && (
        <ProductsPagination currentPage={currentPage} totalPages={totalPages} />
      )}
    </section>
  );
};