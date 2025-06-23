import { supabase } from '@/lib/supabase/supabaseClient'
import { createClient } from '@/lib/supabase/server'
export default async function ProductsPage() {
  const { data: products, error } = await supabase
    .from('products')
    .select(`*,
    categories(
      name
    )`)
  const supabases = await createClient()
  const { data: userInfo } = await supabases.auth.getUser()
  console.log(products)
  return (
    <div>
      <h1>Productos</h1>
      {
        userInfo ? (
          <p>Welcome {userInfo?.user?.email}!</p>
        ) : (
          <p>Please log in to see the products.</p>
        )
      }
      <ul>
        {products?.map(product => (
          <div key={product.id} className='flex gap-3'>
            <li>{product.name}</li>
            <li className='bg-white text-black'>{product.categories.name}</li>
          </div>
        ))}
      </ul>
    </div>
  )
}