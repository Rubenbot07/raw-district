import { ProductsLayout } from "@/components/products/products-layout";
import { ProductCard } from "@/components/products/product-card";
import { OrderBy } from "@/components/order-by";
import { ProductsPagination } from '@/components/products/products-pagination'

export const FilteredProducts = ({ products, filters, currentPage, total}) => {

    const shouldHide = products.length < 15 && currentPage === 1;
    const totalPages = Math.ceil(total / 15);

    return (
        <div className="overflow-hidden">
            <OrderBy price={filters?.price_lt}/>
            <ProductsLayout>
                {products?.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </ProductsLayout>
            {
                !shouldHide && (
                    <ProductsPagination currentPage={currentPage} totalPages={totalPages}/>
                )
            }
        </div>
    );
}
