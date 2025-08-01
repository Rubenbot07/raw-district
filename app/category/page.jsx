import { getCategoryBySlug } from '@/actions/get-categories-slug';
import { getProducts } from '@/actions/get-products';
import { FilteredProducts } from '@/components/products/filtered-products';

export default async function Page({ searchParams }) {
    const page = parseInt(searchParams?.page) || 1;
    const perPage = 15;
    const from = (page - 1) * perPage;
    const to = from + perPage - 1;
    const currentPage = Math.floor(from / 15) + 1;
    const { price_lt, category, sort } = await searchParams || {};
    const categoryInfo = await getCategoryBySlug(category);
    const filters = {
        price_lt: price_lt || null,
        category: categoryInfo.id || null,
        sort: sort || null,
    };

    const { products, error, total } = await getProducts(filters, { from, to });
    if (error) {
        return <div>Error loading products: {error.message}</div>;
    }

    return (
            <div className="flex flex-col gap-4 py-10">
                <div className='text-center border-[1px] border-gray-300 py-2'>
                    <h1 className="text-md font-medium">{categoryInfo.name}</h1>
                </div>
                <FilteredProducts products={products} filters={filters} currentPage={currentPage} total={total}/>
            </div>
    );
}