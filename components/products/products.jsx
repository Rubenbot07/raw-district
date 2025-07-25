import { ProductCard } from '@/components/products/product-card'
import { getProducts } from '@/actions/get-products'
import { ProductsLayout } from '@/components/products/products-layout'
import { FilteredProducts } from '@/components/filtered-products'
export default async function ProductsPage({ filters }) {

  const { products, error } = await getProducts(filters)
  if (error) {
    console.error('Error fetching products:', error)
    return <div>Error loading products</div>
  }

  return (
      <FilteredProducts products={products} filters={filters}/>
  )
}