import { getCategoryBySlug } from '@/actions/get-categories-slug';
import { getProductsByCategory } from '@/actions/get-products-category';
import { ProductCard } from '@/components/products/product-card';
import { ProductsLayout } from '@/components/products/products-layout';

export default async function Page({ params }) {
    const { slug } = await params;

    const category = await getCategoryBySlug(slug);
    console.log(category)

    if (!category) {
        return <h1>Category not found</h1>;
    }

    const products = await getProductsByCategory(category.id);

    return (
            <div className="flex flex-col gap-4 pt-10">
                <div className='text-center border-[1px] border-gray-300 py-2'>
                    <h1 className="text-md font-medium">{category.name}</h1>
                </div>
                <ProductsLayout>
                    {products?.map(product => (
                            <ProductCard key={product.id} product={product} />
                    ))}
                </ProductsLayout>
            </div>
    );
}