import { getProducts } from '@/actions/get-products'
import { FilteredProducts } from '@/components/filtered-products'
export default async function ProductsPage({ filters, from, to  }) {
  
  const { products, error } = await getProducts(filters, { from, to });
  const currentPage = Math.floor(from / 15) + 1;
  if (error) {
    console.error('Error fetching products:', error)
    return <div>Error loading products</div>
  }


  return (
    <>
      <FilteredProducts products={products} filters={filters} currentPage={currentPage}/>
    </>
  )
}