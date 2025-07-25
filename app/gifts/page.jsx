import { getProducts } from "@/actions/get-products";
import { FilteredProducts } from "@/components/filtered-products";
import Link from "next/link";
export default async function GiftsFilterPage({ searchParams }) {
    const { price_lt, category, sort } = await searchParams || {};
    const filters = {
        price_lt: price_lt || null,
        category: category || null,
        sort: sort || null,
    };
    const { products, error } = await getProducts(filters);
    if (error) {
        return <div>Error loading products: {error.message}</div>;
    }
    return (
        <div>
            <FilteredProducts products={products} filters={filters} />
        </div>
    )

}