'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { SearchPageInput } from '@/components/search/search-page-input'
import { ProductCard } from '@/components/products/product-card'

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
        <p className="text-gray-500">Cargando...</p>
      ) : results.length > 0 ? (
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 px-2 mx-auto gap-4">
          {results.map((product) => (
            <li key={product.id} className="flex gap-3 lg:mx-auto">
              <ProductCard product={product} />
              {/* Agrega más detalles si lo deseas */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No products found</p>
      )}
    </section>
  )
}