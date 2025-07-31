'use server'
import { cache } from 'react';
import { supabase } from '../lib/supabase/supabaseClient';

export const getProducts = cache(async (filters = {}, { from = 0, to = 14 } = {}) => {
  let query = supabase
    .from('products')
    .select(`
      *,
      categories(name),
      product_images(image_url, thumbnail_url, position),
      product_sizes(id, size, stock, sku)
    `, { count: 'exact' })
    .range(from, to);

  // Filtros dinámicos
  if (filters.price_lt) {
    query = query.lt('price', filters.price_lt);
  }

  if (filters.category) {
    query = query.eq('category_id', filters.category);
  }

  if (filters.sort === 'price_asc') {
    query = query.order('price', { ascending: true });
  } else if (filters.sort === 'price_desc') {
    query = query.order('price', { ascending: false });
  }

  if (filters.sort === 'name_asc') {
    query = query.order('name', { ascending: true });
  } else if (filters.sort === 'name_desc') {
    query = query.order('name', { ascending: false });
  }

  const { data: products, error,  count } = await query;
  return { products, error, total: count };
});