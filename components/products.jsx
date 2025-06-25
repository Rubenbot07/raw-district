import { supabase } from '@/lib/supabase/supabaseClient'
import { ProductCard } from './product-card'
export default async function ProductsPage() {
  const { data: products, error } = await supabase
    .from('products')
    .select(`*,
    categories(
      name
    ),
    product_images(
      image_url,
      thumbnail_url,
      position
    )
`)

  return (
    <div>
      <h1>Productos</h1>
      <ul className='grid grid-cols-2 md:grid-cols-3'>
        {products?.map(product => (
          <div key={product.id} className='flex gap-3'>
            <ProductCard product={product} />
          </div>
        ))}
      </ul>
    </div>
  )
}