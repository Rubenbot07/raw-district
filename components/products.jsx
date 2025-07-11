import { ProductCard } from './product-card'
import { getProducts } from '@/actions/get-products'
export default async function ProductsPage() {
  const { products, error } = await getProducts()
  if (error) {
    console.error('Error fetching products:', error)
    return <div>Error loading products</div>
  }

  return (
    <div className='mx-auto max-w-[1700px]'>
      <h1>Productos</h1>
      <ul className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 px-2 mx-auto gap-4 '>
        {products?.map(product => (
          <div key={product.id} className='flex gap-3 lg:mx-auto'>
            <ProductCard product={product} />
          </div>
        ))}
      </ul>
    </div>
  )
}