'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { SearchPageInput } from '@/components/search/search-page-input'
import { ProductCard } from '@/components/products/product-card'
import { ProductsLayout } from '@/components/products/products-layout'

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get('query') || ''
  const limit = searchParams.get('limit') || 10

  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchResults = async () => {
      if (!query.trim()) return

      setLoading(true)
      try {
        const res = await fetch(`/api/search-products?query=${query}&limit=${limit}`)
        if (!res.ok) throw new Error(`Error: ${res.status}`)
        const data = await res.json()
        setResults(data.results || [])
      } catch (error) {
        console.error('Error fetching search results:', error)
        setResults([])
      } finally {
        setLoading(false)
      }
    }

    fetchResults()
  }, [query, limit])

  return (
    <section className='flex flex-col gap-4'>
      <SearchPageInput query={query} />
      <div className='w-full border-[1px] border-gray-300 text-[10px] text-center p-4'>
        <p>{results.length} results have been found for "{query}"</p>
      </div>
      {loading ? (
        <div className='w-full text-center p-8'>
          <p className="text-gray-500">Cargando...</p>
        </div>
      ) : results.length > 0 ? (
        <ProductsLayout>
          {results.map((product) => (
              <ProductCard key={product.id} product={product} />
          ))}
        </ProductsLayout>
      ) : (
        <div className='w-full text-center p-8'>
          <p>Sorry, no results found for "{query}"</p>
        </div>
      )}
    </section>
  )
}