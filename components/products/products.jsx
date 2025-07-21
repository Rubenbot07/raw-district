import { ProductCard } from '@/components/products/product-card'
import { getProducts } from '@/actions/get-products'
import { ProductsLayout } from '@/components/products/products-layout'
export default async function ProductsPage() {
  const { products, error } = await getProducts()
  if (error) {
    console.error('Error fetching products:', error)
    return <div>Error loading products</div>
  }

  return (
      <ProductsLayout>
        {products?.map(product => (
            <ProductCard key={product.id} product={product} />
        ))}
      </ProductsLayout>
  )
}