import { ProductsLayout } from "@/components/products/products-layout";
import { ProductCard } from "@/components/products/product-card";
import { OrderBy } from "@/components/order-by";
export const FilteredProducts = ({ products, filters}) => {
    return (
        <div className="overflow-hidden">
            <OrderBy price={filters?.price_lt}/>
            <ProductsLayout>
                {products?.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </ProductsLayout>
        </div>
    );
}
