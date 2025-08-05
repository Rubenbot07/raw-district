import { getProducts } from '@/actions/get-products';
import { FilteredProducts } from '@/components/products/filtered-products';

export const Products = async ({ filters, from = 0, to = 14 }) => {
  const { products, error, total } = await getProducts(filters, { from, to });
  const currentPage = Math.floor(from / 15) + 1;

  if (error) {
    console.error('Error fetching products:', error);
    return <div role="alert" className="text-red-600">Error loading products</div>;
  }

  if (!products || products.length === 0) {
    return <div>No products found.</div>;
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