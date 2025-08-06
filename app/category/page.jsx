import { getCategoryBySlug } from '@/actions/get-categories-slug';
import { getProducts } from '@/actions/get-products';
import { FilteredProducts } from '@/components/products/filtered-products';

export default async function Page({ searchParams }) {
    const page = parseInt(searchParams?.page) || 1;
    const perPage = 15;
    const from = (page - 1) * perPage;
    const to = from + perPage - 1;
    const currentPage = Math.floor(from / 15) + 1;

    const { price_lt, category, sort } = searchParams || {};
    const categoryInfo = await getCategoryBySlug(category);

    const filters = {
        price_lt: price_lt || null,
        category: categoryInfo?.id || null,
        sort: sort || null,
    };

    const { products, error, total } = await getProducts(filters, { from, to });

    if (error) {
        return (
            <div
                role="alert"
                className="text-red-600 bg-red-50 border border-red-200 p-4 rounded-md"
            >
                <p className="font-semibold">Error loading products:</p>
                <p>{error.message}</p>
            </div>
        );
    }

    return (
        <main
            className="flex flex-col gap-4 py-10"
            aria-label={`Products in category ${categoryInfo?.name || 'All'}`}
        >
            <header
                className="text-center border border-gray-300 py-2"
                role="region"
                aria-labelledby="category-title"
            >
                <h1 id="category-title" className="text-lg font-semibold">
                    {categoryInfo?.name || 'All Products'}
                </h1>
            </header>

            <FilteredProducts
                products={products}
                filters={filters}
                currentPage={currentPage}
                total={total}
            />
        </main>
    );
}