'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

export const RotatingBanner = ({ contentMessages}) => {
  const t = useTranslations('RotatingBanner')
  const tAriaLabel = useTranslations('AriaLabel')
  const [index, setIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  const defaultMessages = [
    { id: 1, content: <><strong>{t('securePayment')}</strong></> },
    { id: 2, content: <><strong>{t('needHelp')}</strong></>, link: { href: "https://wa.me/3006870774", text: t('writeToUs') } },
    { id: 3, content: <><strong>{t('freeShipping')}</strong></> },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false)
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % (contentMessages?.length || defaultMessages.length))
        setIsVisible(true)
      }, 300)
    }, 4000)

    return () => clearInterval(interval)
  }, [contentMessages])

  const message = contentMessages ? contentMessages[index] : defaultMessages[index]

  return (
    <div
      role="region"
      aria-label={tAriaLabel('rotatingBanner')}
      className={`w-full text-black text-center py-2 text-[10px] xl:text-[12px] transition-opacity duration-500 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      {message?.link ? (
        <>
          {message?.content}
          {' | '}
          <Link
            href={message?.link?.href}
            target="_blank"
            rel="noopener noreferrer"
            className="underline ml-1 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            {message?.link?.text}
          </Link>
        </>
      ) : (
        message?.content
      )}
    </div>
  )
}