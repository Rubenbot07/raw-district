import { getCategoryBySlug } from '@/actions/get-categories-slug';
import { getProductsByCategory } from '@/actions/get-products-category';
import { ProductCard } from '@/components/products/product-card';
import { ProductsLayout } from '@/components/products/products-layout';

export default async function Page({ params }) {
    const { slug } = await params;

    const category = await getCategoryBySlug(slug);

    if (!category) {
        return <h1>Category not found</h1>;
    }

    const products = await getProductsByCategory(category.id);

    return (
            <div className="flex flex-col">
                <ProductsLayout>
                    {products?.map(product => (
                            <ProductCard key={product.id} product={product} />
                    ))}
                </ProductsLayout>
            </div>
    );
}