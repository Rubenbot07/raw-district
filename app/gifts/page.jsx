import { getProducts } from "@/actions/get-products";
import { FilteredProducts } from "@/components/filtered-products";
export default async function GiftsFilterPage({ searchParams }) {
    const page = parseInt(searchParams?.page) || 1;
    const perPage = 15;
    const from = (page - 1) * perPage;
    const to = from + perPage - 1;
    const currentPage = Math.floor(from / 15) + 1;
    const { price_lt, category, sort } = await searchParams || {};
    const filters = {
        price_lt: price_lt || null,
        category: category || null,
        sort: sort || null,
    };
    const { products, error } = await getProducts(filters, { from, to });
    if (error) {
        return <div>Error loading products: {error.message}</div>;
    }
    return (
        <div>
            <FilteredProducts products={products} filters={filters} currentPage={currentPage}/>
        </div>
    )

}