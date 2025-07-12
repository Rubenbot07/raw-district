import { getCategoryBySlug } from '@/actions/get-categories-slug';
import { getProductsByCategory } from '@/actions/get-products-category';
import { ProductCard } from '@/components/products/product-card';

export default async function Page({ params }) {
    const { slug } = await params;

    const category = await getCategoryBySlug(slug);

    if (!category) {
        return <h1>Category not found</h1>;
    }

    const products = await getProductsByCategory(category.id);

    return (
        <div className="">
            <div className="w-full max-w-sm">
                <h1>Category</h1>
                <p>{slug}</p>
                <ul>
                    {products?.map(product => (
                        <li key={product?.id}>
                            <ProductCard product={product} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}