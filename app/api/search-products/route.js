import { supabase } from '@/lib/supabase/supabaseClient'
import { getLocale } from 'next-intl/server'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('query') || ''
  const limit = parseInt(searchParams.get('limit')) || 3

  if (!query.trim()) {
    return new Response(JSON.stringify({ results: [] }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  // obtener locale (servidor)
  const localeFromQuery = searchParams.get('locale')
  const locale = localeFromQuery || (await getLocale(request)) || 'en'// fallback a 'en' si algo falla

  // 1) Intentamos buscar dentro de i18n_names->>locale
  const { data: localizedData, error: localizedError } = await supabase
    .from('products')
    .select(`
        *,
        categories(name),
        product_images(thumbnail_url, position),
        i18n_names
    `)
    .ilike(`i18n_names->>${locale}`, `%${query}%`)
    .limit(limit)

  // Si hay error serio, devolvemos 500
  if (localizedError) {
    return new Response(JSON.stringify({ error: localizedError.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  let results = localizedData ?? []

  // 2) Si no hay resultados localizados, fallback a 'name' (o buscar en otras claves).
  if (!results.length) {
    const { data: fallbackData, error: fallbackError } = await supabase
      .from('products')
      .select(`
        *,
        categories(name),
        product_images(thumbnail_url, position),
        i18n_names
      `)
      .ilike('name', `%${query}%`)
      .limit(limit)

    if (fallbackError) {
      return new Response(JSON.stringify({ error: fallbackError.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      })
    }
    results = fallbackData ?? []
  }

  // 3) Mapear para añadir una propiedad establecida que el cliente use siempre
  const mapped = (results || []).map(p => {
    const localized = p?.i18n_names?.[locale] || p?.name || null
    return {
      ...p,
      localized_name: localized
    }
  })

  return new Response(JSON.stringify({ results: mapped }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  })
}