import { getProducts } from "@/actions/get-products";
import { FilteredProducts } from "@/components/products/filtered-products";

export default async function GiftsFilterPage({ searchParams }) {
  const page = parseInt(searchParams?.page) || 1;
  const perPage = 15;
  const from = (page - 1) * perPage;
  const to = from + perPage - 1;
  const currentPage = Math.floor(from / 15) + 1;

  // No se debe hacer `await searchParams` (searchParams no es una promesa)
  const { price_lt, category, sort } = searchParams || {};

  const filters = {
    price_lt: price_lt || null,
    category: category || null,
    sort: sort || null,
  };

  const { products, error, total } = await getProducts(filters, { from, to });

  if (error) {
    return (
      <div
        role="alert"
        className="text-red-600 bg-red-100 border border-red-300 rounded-md p-4"
      >
        <p className="font-semibold">Error loading products:</p>
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <main
      className="py-8"
      aria-label="Filtered gift products"
    >
      <FilteredProducts
        products={products}
        filters={filters}
        currentPage={currentPage}
        total={total}
      />
    </main>
  );
}