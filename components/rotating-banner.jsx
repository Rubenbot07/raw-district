'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

const messages = [
  { id: 1, content: "PAY SECURELY WITH MERCADO PAGO" },
  { id: 2, content: "NEED HELP? ", link: { href: "https://web.whatsapp.com/", text: "Escríbenos aquí" } },
  { id: 3, content: "FREE SHIPPING FOR PURCHASES OVER $200,000" },
]

export const RotatingBanner = () => {
  const [index, setIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false)

      setTimeout(() => {
        setIndex((prev) => (prev + 1) % messages.length)
        setIsVisible(true)
      }, 300) // Tiempo de fade-out antes de cambiar el mensaje
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  const message = messages[index]

  return (
    <div className={` w-full text-black  text text-center py-2 text-[12px] transition-opacity duration-500 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'} `}>
      {message.link ? (
        <>
          {message.content}
          |
          <Link href={message.link.href} target="_blank" className="underline ml-1 hover:text-gray-300 transition">
            {message.link.text}
          </Link>
        </>
      ) : (
        message.content
      )}
    </div>
  )
}