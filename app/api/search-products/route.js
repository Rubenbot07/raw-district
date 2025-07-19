import { supabase } from '@/lib/supabase/supabaseClient'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('query')
  const limit = parseInt(searchParams.get('limit')) || 3
  if (!query || query.trim() === '') {
    return new Response(JSON.stringify({ results: [] }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  const { data, error } = await supabase
    .from('products')
    .select(`
        *,
        categories(
            name
        ),
        product_images(
            thumbnail_url,
            position
        )
        `)
    .ilike('name', `%${query}%`)
    .limit(limit)

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