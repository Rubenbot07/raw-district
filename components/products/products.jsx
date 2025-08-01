import { getProducts } from '@/actions/get-products'
import { FilteredProducts } from '@/components/products/filtered-products'
export const Products = async ({ filters, from = 0, to = 14 }) => {
  const { products, error, total } = await getProducts(filters, { from, to });
  const currentPage = Math.floor(from / 15) + 1;
  if (error) {
    console.error('Error fetching products:', error)
    return <div>Error loading products</div>
  }


  return (
      <FilteredProducts products={products} filters={filters} currentPage={currentPage} total={total}/>
  )
}