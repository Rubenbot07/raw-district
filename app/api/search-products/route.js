import { supabase } from '@/lib/supabase/supabaseClient'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('query')

  if (!query || query.trim() === '') {
    return new Response(JSON.stringify({ results: [] }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  const { data, error } = await supabase
    .from('products')
    .select(`
        id, name, slug, price,
        product_images(
            thumbnail_url,
            position
        )
        `)
    .ilike('name', `%${query}%`)
    .limit(3)

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  return new Response(JSON.stringify({ results: data }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  })
}