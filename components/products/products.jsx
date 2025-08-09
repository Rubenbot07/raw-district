import { getProducts } from '@/actions/get-products';
import { FilteredProducts } from '@/components/products/filtered-products';
import { getTranslations } from 'next-intl/server';

export const Products = async ({ filters, from = 0, to = 14 }) => {
  const { products, error, total } = await getProducts(filters, { from, to });
  const currentPage = Math.floor(from / 15) + 1;
  const t = await getTranslations('Product');

  if (error) {
    console.error('Error fetching products:', error);
    return <div role="alert" className="text-red-600">{t('Error')}</div>;
  }

  if (!products || products.length === 0) {
    return <div>{t('productsNotFound')}</div>;
  }

  return (
    <FilteredProducts
      products={products}
      filters={filters}
      currentPage={currentPage}
      total={total}
    />
  );
};