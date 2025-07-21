'use client'
import { useCartUIStore } from '@/app/stores/cartUIStore'
import { useEffect } from 'react'

export const BodyScrollLock = () => {
  const isOpen = useCartUIStore((state) => state.openCart)
  const isOpenPreCart = useCartUIStore((state) => state.openPreCart)

  const shouldLock = isOpen || isOpenPreCart

  useEffect(() => {
    document.body.classList.toggle('overflow-hidden', shouldLock)
    return () => {
      document.body.classList.remove('overflow-hidden')
    }
  }, [shouldLock])

  return null
}